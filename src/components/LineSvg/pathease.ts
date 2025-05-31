import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export interface PathEaseConfig {
  axis?: "x" | "y";
  precision?: number;
}

export function pathEase(
  path: string | SVGPathElement,
  config: Partial<PathEaseConfig> = {}
): (scrollProgress: number) => number {
  const axis = config.axis || "y";
  const precision = config.precision || 100;

  // const useX = axis === "x";

  const pathElement = typeof path === "string"
    ? document.querySelector(path) as SVGPathElement
    : path;

  if (!pathElement) {
    console.warn("pathEase: couldn't find path", path);
    return (p) => p;
  }

  const rawPath = MotionPathPlugin.cacheRawPathMeasurements(
    MotionPathPlugin.getRawPath(pathElement),
    Math.round(precision * 24)
  );

  const totalSamples = Math.round(precision * 200);
  const lookup: { progress: number; value: number }[] = [];

  // Build lookup table: progress → axis value
  for (let i = 0; i <= totalSamples; i++) {
    const progress = i / totalSamples;
    const pos = MotionPathPlugin.getPositionOnPath(rawPath, progress);
    lookup.push({ progress, value: pos[axis] });
  }

  // Binary search helper to find progress where path value == viewport center
  const findClosestProgress = (targetValue: number) => {
    let low = 0;
    let high = lookup.length - 1;
    let best = lookup[0];

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const entry = lookup[mid];
      const diff = entry.value - targetValue;

      if (Math.abs(diff) < Math.abs(best.value - targetValue)) {
        best = entry;
      }

      if (diff < 0) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return best.progress;
  };

  return () => {
    const center = window.scrollY + window.innerHeight / 2;
    return findClosestProgress(center);
  };
}
