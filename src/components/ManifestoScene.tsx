/**
 * Manifesto 区"成长剧场"动画组件
 *
 * 8 秒循环讲一个故事：种子 → 浇水 → 发芽 → 长大 → 长成知识之树
 *
 * 滚到这里才启动：用 IntersectionObserver 监听，进入视口后才挂载 Layer
 * 这样保证用户每次看到的都是从「种子」开始的完整剧场，而不是中间某一帧
 *
 * 素材：
 *   x1 = 种子   x2 = 小苗   x3 = 长苗   x6 = 大树
 *   x4 = 浇水壶  x5 = 水滴   x7 = sparkle 装饰板
 *
 * 所有植物 stage 共用 transform-origin: 50% 100%（底部锚点）
 * 这样缩放时根部固定，看起来真的是"从土里长起来"
 */

import React from "react";
import { useInView } from "../hooks/useInView";

interface LayerProps {
  src: string;
  alt?: string;
  pos: string;
  /** 完整 animation className（必须是字面量，Tailwind 才能扫到） */
  anim: string;
  /** transform-origin */
  origin?: string;
  /** z-index */
  z?: number;
  /** 额外样式 */
  style?: React.CSSProperties;
}

const Layer: React.FC<LayerProps> = ({
  src,
  alt = "",
  pos,
  anim,
  origin,
  z,
  style,
}) => (
  <img
    src={src}
    alt={alt}
    aria-hidden={!alt}
    draggable={false}
    className={`absolute ${pos} ${anim} object-contain select-none pointer-events-none`}
    style={{
      transformOrigin: origin,
      willChange: "transform, opacity",
      zIndex: z,
      ...style,
    }}
  />
);

const ManifestoScene: React.FC = () => {
  // 滚入视口才启动剧场，保证从种子开始演
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[500px] mx-auto aspect-square"
    >
      {inView && (
        <>
          {/* ── sparkle 装饰板（大树成长完成时爆发） ── */}
          <Layer
            src="/imgs/site/x7.png"
            pos="inset-0 w-full h-full"
            anim="animate-m-spark"
            z={1}
          />

          {/* ── 种子（开场） ── */}
          <Layer
            src="/imgs/site/x1.png"
            pos="bottom-[5%] left-[25%] w-[50%]"
            anim="animate-m-seed"
            origin="50% 100%"
            z={5}
          />

          {/* ── 小苗（破土） ── */}
          <Layer
            src="/imgs/site/x2.png"
            pos="bottom-[5%] left-[28%] w-[44%]"
            anim="animate-m-sprout"
            origin="50% 100%"
            z={5}
          />

          {/* ── 长苗（长高） ── */}
          <Layer
            src="/imgs/site/x3.png"
            pos="bottom-[5%] left-[28%] w-[44%]"
            anim="animate-m-young"
            origin="50% 100%"
            z={5}
          />

          {/* ── 大树（终态） ── */}
          <Layer
            src="/imgs/site/x6.png"
            pos="bottom-[2%] left-[14%] w-[72%]"
            anim="animate-m-tree"
            origin="50% 100%"
            z={5}
          />

          {/* ── 浇水壶（从右上飞入倾斜倒水） ── */}
          <Layer
            src="/imgs/site/x4.png"
            pos="top-[6%] right-[2%] w-[44%]"
            anim="animate-m-can"
            origin="60% 50%"
            z={10}
          />

          {/* ── 水滴（从壶嘴落下，对齐镜像后的壶嘴位置 ~left:50%, top:38%） ── */}
          <Layer
            src="/imgs/site/x5.png"
            pos="top-[34%] left-[42%] w-[28%]"
            anim="animate-m-drops"
            z={8}
          />
        </>
      )}
    </div>
  );
};

export default ManifestoScene;
