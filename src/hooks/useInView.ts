/**
 * useInView
 * - 监听元素是否进入视口
 * - 主要用于"滚到这里才触发"的入场动画（CTAScene / ManifestoScene 等）
 *
 * Usage:
 *   const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
 *   return <div ref={ref}>{inView && <AnimatedContent />}</div>;
 *
 * Options:
 *   - threshold: 元素可见比例阈值（0~1），默认 0.2
 *   - rootMargin: 提前/延后触发的边距，默认 "0px"
 *   - once: 是否只触发一次（适合入场动画），默认 true
 */

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {},
): [RefObject<T>, boolean] {
  const { threshold = 0.2, rootMargin = "0px", once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // SSR / 老浏览器降级：直接判定为可见，避免动画永远不触发
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
