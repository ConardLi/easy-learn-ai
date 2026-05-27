/**
 * CTA-01 庆祝场景组件
 * - 主角 = 戴草帽眼镜的小读者，抱着会笑的大星星 + 比赞 + 眨右眼
 * - 6 个装饰围绕主角散布，组成「拿到星星的庆祝时刻」
 * - 滚到这里才触发：用 IntersectionObserver 监听，进入视口后才挂载 Layer
 *   主角先 pop → 装饰元素错峰 burst → 总入场 ~1.5s
 * - 入场后无缝接管到循环动画（主角偶尔挥手，星星呼吸闪烁，亮线浮动，绿叶摆动）
 *
 * 素材来自 public/imgs/site/
 *   cat-main         主图（人物 + 星星 + 比赞）
 *   cat-star-lg      大黄星
 *   cat-star-sm      小黄星
 *   cat-rays-yellow  3 条黄色亮线
 *   cat-rays-orange  3 条橙色亮线
 *   cat-leaf         一对绿叶
 *   cat-dot-green    绿色圆点
 *
 * 与 HeroScene 的差异：
 *   - 入场惰性触发（HeroScene 在首屏直接播）
 *   - 主角入场用 enter-pop（中心放大）而非 up（CTA 区视觉中心更稳）
 *   - 大星星入场用 enter-spin（更有"庆祝感"）
 *   - 主角的 loop 用 wave（90% 静止，偶尔挥手），不是持续 wiggle
 */

import React from "react";
import { useInView } from "../hooks/useInView";

/**
 * ⚠️ 必须用完整的 className 字符串字面量
 * Tailwind 静态扫描不识别动态拼接的 animate-* 类名
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
  pos: string;
  enter: {
    anim: EnterKind;
    delay?: number;
  };
  loop?: string;
  loopDelay?: number;
  origin?: string;
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

const CTAScene: React.FC = () => {
  // 进入视口才触发入场动画（threshold 0.25 = 25% 可见即播放）
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[520px] mx-auto aspect-square"
    >
      {inView && (
        <>
          {/* ── 主角先入场，中心 pop + 偶尔挥手 ── */}
          <Layer
            src="/imgs/site/cat-main.png"
            alt="一个戴草帽戴眼镜的小读者，抱着一颗会笑的大星星，单手比赞，眨着右眼"
            pos="top-[6%] left-[10%] w-[82%]"
            enter={{ anim: "pop", delay: 0 }}
            loop="animate-wave"
            origin="60% 70%"
            z={10}
          />

          {/* ── 大星星：旋转飞入 + 呼吸摇摆（庆祝核心） ── */}
          <Layer
            src="/imgs/site/cat-star-lg.png"
            pos="top-[2%] right-[2%] w-[19%]"
            enter={{ anim: "spin", delay: 350 }}
            loop="animate-star-pulse"
            loopDelay={1100}
            origin="50% 50%"
            z={6}
          />

          {/* ── 黄色亮线：左上 pop + 上下浮动 ── */}
          <Layer
            src="/imgs/site/cat-rays-yellow.png"
            pos="top-[8%] left-[20%] w-[14%]"
            enter={{ anim: "pop", delay: 450 }}
            loop="animate-float-y"
            loopDelay={1200}
            z={5}
          />

          {/* ── 橙色亮线：右中 pop + 浮动（错峰） ── */}
          <Layer
            src="/imgs/site/cat-rays-orange.png"
            pos="top-[44%] right-[1%] w-[16%]"
            enter={{ anim: "pop", delay: 550 }}
            loop="animate-float-y-md"
            loopDelay={1500}
            z={5}
          />

          {/* ── 小星星：左中 pop + 闪烁 ── */}
          <Layer
            src="/imgs/site/cat-star-sm.png"
            pos="top-[22%] left-[2%] w-[11%]"
            enter={{ anim: "pop", delay: 650 }}
            loop="animate-twinkle"
            loopDelay={1300}
            origin="50% 50%"
            z={5}
          />

          {/* ── 小叶子：左下 pop + 摆动 ── */}
          <Layer
            src="/imgs/site/cat-leaf.png"
            pos="bottom-[4%] left-[26%] w-[12%]"
            enter={{ anim: "pop", delay: 750 }}
            loop="animate-sway-leaf"
            loopDelay={1400}
            origin="50% 100%"
            z={4}
          />

          {/* ── 绿色圆点：左下角 pop + pulse（"点击我"的小提示） ── */}
          <Layer
            src="/imgs/site/cat-dot-green.png"
            pos="bottom-[20%] left-[4%] w-[7%]"
            enter={{ anim: "pop", delay: 850 }}
            loop="animate-dot-pulse"
            loopDelay={1500}
            origin="50% 50%"
            z={5}
          />
        </>
      )}
    </div>
  );
};

export default CTAScene;
