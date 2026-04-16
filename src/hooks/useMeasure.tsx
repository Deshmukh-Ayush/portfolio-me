import { useCallback, useEffect, useState } from "react";

export function useMeasure() {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const rect = entry.target.getBoundingClientRect();

      setBounds({
        width: rect.width,
        height: rect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, bounds] as const;
}
