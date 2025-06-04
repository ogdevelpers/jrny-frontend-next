'use client';
import { useSyncExternalStore } from "react"

type MediaQueryStore = {
  /** Latest match result (true / false) */
  isMatch: boolean
  /** The native MediaQueryList object */
  mediaQueryList: MediaQueryList | null
  /** React subscribers that need re-rendering on change */
  subscribers: Set<() => void>
  /** Cleanup function to remove listeners */
  cleanup: (() => void) | null
}

/** Map of breakpoint numbers -> singleton store objects */
const mediaQueryStores: Record<number, MediaQueryStore> = {}

/** Check if we're in a browser environment */
const isBrowser = typeof window !== "undefined"

/**
 * Creates or returns existing MediaQueryStore for a given breakpoint
 * u/param breakpoint - The breakpoint in pixels (e.g., 768)
 * u/returns MediaQueryStore singleton for that breakpoint
 */
export function getMediaQueryStore(breakpoint: number): MediaQueryStore {
  // Return existing store if already created
  if (mediaQueryStores[breakpoint]) {
    return mediaQueryStores[breakpoint]
  }

  // --- First-time setup ---
  const queryString = `(max-width: ${breakpoint}px)`
  let mqList: MediaQueryList | null = null
  let cleanup: (() => void) | null = null

  if (isBrowser) {
    mqList = window.matchMedia(queryString)
  }

  const store: MediaQueryStore = {
    isMatch: mqList?.matches ?? false,
    mediaQueryList: mqList,
    subscribers: new Set(),
    cleanup: null
  }

  // Only set up listeners in browser environment
  if (mqList) {
    const updateHandler = (event: MediaQueryListEvent) => {
      // Only update if the match state actually changed
      if (store.isMatch !== event.matches) {
        store.isMatch = event.matches
        // Batch notifications for better performance
        if (store.subscribers.size > 0) {
          // Use requestAnimationFrame to batch updates
          requestAnimationFrame(() => {
            store.subscribers.forEach((callback) => {
              try {
                callback()
              } catch (error) {
                console.error('Error in media query callback:', error)
              }
            })
          })
        }
      }
    }

    // Modern browsers
    if (mqList.addEventListener) {
      mqList.addEventListener("change", updateHandler)
      cleanup = () => mqList!.removeEventListener("change", updateHandler)
    } 
    // Legacy Safari support (< 14)
    else if (mqList.addListener) {
      mqList.addListener(updateHandler)
      cleanup = () => mqList!.removeListener(updateHandler)
    }

    store.cleanup = cleanup
  }

  mediaQueryStores[breakpoint] = store
  return store
}

/**
 * Cleanup function to remove all media query listeners
 * Useful for testing or when you need to reset the stores
 */
export function cleanupMediaQueryStores(): void {
  Object.values(mediaQueryStores).forEach(store => {
    store.cleanup?.()
    store.subscribers.clear()
  })
  // Clear the stores object
  Object.keys(mediaQueryStores).forEach(key => {
    delete mediaQueryStores[Number(key)]
  })
}

/**
 * Hook to check if the screen width is below the specified breakpoint
 * u/param breakpoint - The breakpoint in pixels (default: 768)
 * u/returns true if screen width <= breakpoint, false otherwise
 */
export default function useIsMobile(breakpoint: number = 768): boolean {
  // Validate breakpoint
  if (typeof breakpoint !== 'number' || breakpoint <= 0) {
    console.warn(`useIsMobile: Invalid breakpoint ${breakpoint}. Using default 768px.`)
    breakpoint = 768
  }

  const store = getMediaQueryStore(breakpoint)

  return useSyncExternalStore(
    // Subscribe function
    (callback) => {
      store.subscribers.add(callback)
      
      // Return unsubscribe function
      return () => {
        store.subscribers.delete(callback)
        
        // Optional: Clean up store if no more subscribers
        // Uncomment if you want aggressive cleanup
        /*
        if (store.subscribers.size === 0) {
          store.cleanup?.()
          delete mediaQueryStores[breakpoint]
        }
        */
      }
    },
    // Get snapshot (client)
    () => store.isMatch,
    // Get server snapshot
    () => false // Always false during SSR to prevent hydration mismatches
  )
}

/**
 * Utility hook for common breakpoints
 */
export const useBreakpoints = () => ({
  isMobile: useIsMobile(768),
  isTablet: useIsMobile(1024),
  isSmallDesktop: useIsMobile(1200),
})

/**
 * Hook that returns an object with multiple breakpoint states
 * More efficient than calling useIsMobile multiple times
 */
export function useResponsive() {
  const mobile = useIsMobile(768)
  const tablet = useIsMobile(1024)
  const desktop = useIsMobile(1200)
  
  return {
    isMobile: mobile,
    isTablet: tablet && !mobile,
    isDesktop: !tablet,
    isLargeDesktop: !desktop,
    // Convenience flags
    isMobileOrTablet: tablet,
    isDesktopOrLarger: !tablet,
  }
}