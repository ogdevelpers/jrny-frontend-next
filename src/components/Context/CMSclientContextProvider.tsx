"use client";

import { createContext, useContext } from "react";

type CMSClientProps = {
  content: any;
};

// create context
const CMSClientContext = createContext<CMSClientProps | null>(null);

// create the context provider component
export function CMSclientContextProvider({
  content,
  children,
}: {
  content: any;
  children: React.ReactNode;
}) {
  return (
    <CMSClientContext.Provider value={{ content }}>
      {children}
    </CMSClientContext.Provider>
  );
}

// create the hook
export function useCMSclientContext() {
  const context = useContext(CMSClientContext);
  if (!context) {
    throw new Error(
      "useCMSclientContext must be used within a CMSclientContextProvider",
    );
  }
  return context;
}
