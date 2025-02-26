"use client";

import { useEffect } from "react";
import eruda from "eruda";

export default function ErudaScript() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      eruda.init();
    }
  }, []);

  return null;
}
