/**
 * IllustrationImage
 *
 * 真实插画图片占位组件 —— 用于替换 IllustrationSlot 的占位卡。
 * 滚到可视区才触发入场动画（避免页面打开瞬间所有插画一起播）。
 *
 * Usage:
 *   <IllustrationImage
 *     src="/imgs/site/Illustration-AIK-01.png"
 *     alt="拿放大镜的角色在书架前找概念"
 *     animation="up"
 *   />
 */

import React from "react";
import { useInView } from "../hooks/useInView";

type AnimationKind = "up" | "pop" | "fade" | "down" | "spin";

interface IllustrationImageProps {
  src: string;
  alt: string;
  /** 默认 "up"（向上浮起） */
  animation?: AnimationKind;
  /** 动画延迟（ms） */
  delay?: number;
  /** 触发阈值 0~1，默认 0.25 */
  threshold?: number;
  /** 额外 className（用于尺寸/aspect 等容器约束） */
  className?: string;
  /** img 标签的额外 className */
  imgClassName?: string;
}

const animClassMap: Record<AnimationKind, string> = {
  up: "animate-enter-up",
  pop: "animate-enter-pop",
  fade: "animate-enter-fade",
  down: "animate-enter-down",
  spin: "animate-enter-spin",
};

export const IllustrationImage: React.FC<IllustrationImageProps> = ({
  src,
  alt,
  animation = "up",
  delay = 0,
  threshold = 0.25,
  className = "",
  imgClassName = "",
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold });

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`block w-full h-auto select-none ${
          inView ? animClassMap[animation] : "opacity-0"
        } ${imgClassName}`}
        style={delay ? { animationDelay: `${delay}ms` } : undefined}
      />
    </div>
  );
};
