/**
 * Hero 主图场景组件
 * - 11 张拆分素材，每个元素 = 外层 wrapper（一次性入场动画） + 内层 img（无限循环动画）
 * - 入场动画错峰登场（0ms → 1300ms），让用户刚进入页面就被"画面长出来"的过程吸引
 * - 入场结束后无缝接管到循环呼吸/旋转/浮动/闪烁
 *
 * 素材来自 public/imgs/site/
 *   hero-base / hero-bulb / hero-gear / hero-leaf
 *   hero-pot-left / hero-pot-right / hero-book-bl / hero-book-br
 *   hero-code-tr / hero-code-mr / hero-sparkles
 *
 * 如需调整：
 *   - 位置 / 尺寸：改 Layer 的 pos prop
 *   - 入场方式：改 enter.anim (enter-pop / enter-up / enter-down / enter-spin / enter-fade)
 *   - 入场早晚：改 enter.delay (毫秒)
 *   - 循环动画：改 loop (animate-pulse-bulb / animate-spin-slow / animate-float-y ...)
 */

import React from "react";

/**
 * ⚠️ 必须用完整的 className 字符串字面量
 * Tailwind 静态扫描不识别 `animate-${var}` 这种动态拼接
 * 所有 animate-* 类必须在源码中以完整形式出现，才会被生成进 CSS
 */
const ENTER_CLASS = {
  pop: "animate-enter-pop",
  up: "animate-enter-up",
  down: "animate-enter-down",
  spin: "animate-enter-spin",
  fade: "animate-enter-fade",
} as const;

type EnterKind = keyof typeof ENTER_CLASS;

interface LayerProps {
  src: string;
  alt?: string;
  /** 位置 + 尺寸 className，例如 "top-[2%] left-[20%] w-[18%]" */
  pos: string;
  /** 入场动画：anim 和延迟（ms） */
  enter: {
    anim: EnterKind;
    delay?: number;
  };
  /** 循环动画 className（如 "animate-pulse-bulb"，必须是完整字面量） */
  loop?: string;
  /** 循环动画延迟（ms） */
  loopDelay?: number;
  /** transform-origin (摆动/呼吸元素需要) */
  origin?: string;
  /** z-index */
  z?: number;
}

const Layer: React.FC<LayerProps> = ({
  src,
  alt = "",
  pos,
  enter,
  loop,
  loopDelay,
  origin,
  z,
}) => (
  <div
    className={`absolute ${pos} ${ENTER_CLASS[enter.anim]}`}
    style={{
      animationDelay: enter.delay ? `${enter.delay}ms` : undefined,
      zIndex: z,
    }}
  >
    <img
      src={src}
      alt={alt}
      aria-hidden={!alt}
      draggable={false}
      className={`w-full h-full object-contain select-none pointer-events-none ${loop || ""}`}
      style={{
        transformOrigin: origin,
        willChange: "transform",
        animationDelay: loopDelay ? `${loopDelay}ms` : undefined,
      }}
    />
  </div>
);

const HeroScene: React.FC = () => {
  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square">
      {/* ── 主角先入场（从底部弹起）── */}
      <Layer
        src="/imgs/site/hero-base.png"
        alt="一个戴草帽戴眼镜的小读者，正捧着一本写着 AI 的书认真阅读"
        pos="top-[18%] left-[18%] w-[64%]"
        enter={{ anim: "up", delay: 0 }}
        loop="animate-breath"
        origin="50% 95%"
        z={10}
      />

      {/* ── 灯泡从上方掉下（带 spring 回弹）+ 持续 pulse 发光 ── */}
      <Layer
        src="/imgs/site/hero-bulb.png"
        pos="top-[1%] left-[22%] w-[19%]"
        enter={{ anim: "down", delay: 250 }}
        loop="animate-pulse-bulb"
        loopDelay={1100}
        origin="50% 70%"
      />

      {/* ── 齿轮旋转飞入 + 持续 spin ── */}
      <Layer
        src="/imgs/site/hero-gear.png"
        pos="top-[3%] right-[6%] w-[17%]"
        enter={{ anim: "spin", delay: 400 }}
        loop="animate-spin-slow"
        loopDelay={1300}
      />

      {/* ── 飘叶 pop in + sway ── */}
      <Layer
        src="/imgs/site/hero-leaf.png"
        pos="top-[3%] left-[46%] w-[8%]"
        enter={{ anim: "pop", delay: 550 }}
        loop="animate-sway-leaf"
        loopDelay={1100}
        origin="50% 100%"
      />

      {/* ── 左侧 {} 盆栽 pop in + 漂浮 ── */}
      <Layer
        src="/imgs/site/hero-pot-left.png"
        pos="top-[32%] left-[0%] w-[23%]"
        enter={{ anim: "pop", delay: 600 }}
        loop="animate-float-y"
        loopDelay={1300}
      />

      {/* ── 右上 </> 植物 pop in + 漂浮 ── */}
      <Layer
        src="/imgs/site/hero-code-tr.png"
        pos="top-[16%] right-[0%] w-[19%]"
        enter={{ anim: "pop", delay: 700 }}
        loop="animate-float-y-md"
        loopDelay={1500}
      />

      {/* ── 右中圆形 </> 植物 pop in + 漂浮 ── */}
      <Layer
        src="/imgs/site/hero-code-mr.png"
        pos="top-[42%] right-[1%] w-[20%]"
        enter={{ anim: "pop", delay: 800 }}
        loop="animate-float-y-sm"
        loopDelay={1600}
      />

      {/* ── 左下 </> 小书本 pop in + 轻漂 ── */}
      <Layer
        src="/imgs/site/hero-book-bl.png"
        pos="bottom-[2%] left-[4%] w-[23%]"
        enter={{ anim: "pop", delay: 900 }}
        loop="animate-float-y-sm"
        loopDelay={1500}
      />

      {/* ── 右下双书 pop in + 漂浮 ── */}
      <Layer
        src="/imgs/site/hero-book-br.png"
        pos="bottom-[2%] right-[2%] w-[27%]"
        enter={{ anim: "pop", delay: 1000 }}
        loop="animate-float-y-md"
        loopDelay={1800}
      />

      {/* ── 底部中央小苗 pop in + 轻漂 ── */}
      <Layer
        src="/imgs/site/hero-pot-right.png"
        pos="bottom-[1%] left-[46%] w-[14%]"
        enter={{ anim: "pop", delay: 1100 }}
        loop="animate-float-y-sm"
        loopDelay={1700}
      />

      {/* ── sparkles 最后渐显 + 持续闪烁 ── */}
      <Layer
        src="/imgs/site/hero-sparkles.png"
        pos="top-[10%] left-0 w-full"
        enter={{ anim: "fade", delay: 1300 }}
        loop="animate-twinkle"
        loopDelay={1800}
      />
    </div>
  );
};

export default HeroScene;
