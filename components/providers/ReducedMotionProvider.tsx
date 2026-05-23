"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const ReducedMotionCtx = createContext(false);

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return <ReducedMotionCtx.Provider value={reduce}>{children}</ReducedMotionCtx.Provider>;
}

export function useReducedMotion() {
  return useContext(ReducedMotionCtx);
}
