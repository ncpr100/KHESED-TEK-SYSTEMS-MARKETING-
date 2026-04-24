"use client";
import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

const SECTIONS = ["features", "about", "faq"];

export function ScrollTracker() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) analytics.sectionViewed(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
