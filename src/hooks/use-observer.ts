import { useCallback, useEffect, useRef, useState } from "react";

export default function useObserver(
  callback: () => void,
  options?: IntersectionObserverInit
) {
  const [element, setElement] = useState<HTMLDivElement>();

  const prevY = useRef(0);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const y = entry.boundingClientRect.y;

      if (prevY.current > y) callback();

      prevY.current = y;
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  });

  const ref = useCallback((element: HTMLDivElement) => {
    setElement(element);
  }, []);

  return ref;
}
