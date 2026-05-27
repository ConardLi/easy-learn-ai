/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 主色系：奶油黄 (品牌 hero 色) + 暖白 + 暖近黑
        butter: {
          DEFAULT: "#F4D35E", // 主奶油黄
          deep: "#E5BD3A", // 略深，用于 hover
          soft: "#FBE891", // 略浅，用于次表面
          tint: "#FEF6D3", // 极浅，几乎是 cream，用于区块过渡
        },
        cream: "#FBEFE3", // 暖奶油 surface
        ink: {
          DEFAULT: "#241C15", // 暖近黑 (永远不用纯黑)
          secondary: "#5A5147",
          tertiary: "#88837C",
        },
        // 装饰强调色 (Memphis pop palette, 极少量使用)
        coral: "#E07A5F", // 珊瑚红 — 主装饰
        teal: "#1B4B5A", // 深 teal — 偶尔对比
        pop: "#FF4D74", // 玫粉 — 警示/强调
      },
      fontFamily: {
        // 正文：西文 Plus Jakarta + 中文 Noto Sans SC
        sans: [
          '"Plus Jakarta Sans"',
          '"Noto Sans SC"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"PingFang SC"',
          "system-ui",
          "sans-serif",
        ],
        // Display 标题：中文优先 Smiley Sans (unicode-range 限定 CJK)，西文 Plus Jakarta
        // 浏览器会自动按字符 unicode 选字体：中文 → Smiley Sans，英文/数字 → Plus Jakarta
        display: [
          '"Smiley Sans"',
          '"Plus Jakarta Sans"',
          '"Noto Sans SC"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"PingFang SC"',
          "system-ui",
          "sans-serif",
        ],
        serif: ["Newsreader", "Georgia", '"Times New Roman"', "serif"],
        mono: [
          '"Geist Mono"',
          '"SF Mono"',
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        // 中文标题: line-height 不能太小 (中文字符可视高度近 1em)
        // letter-spacing 收紧但不夸张 (中文负 spacing 会挤字)
        "display-2xl": [
          "clamp(3.25rem, 8vw, 7.25rem)",
          {
            lineHeight: "1.02",
            letterSpacing: "-0.02em",
            fontWeight: "800",
          },
        ],
        "display-xl": [
          "clamp(2.5rem, 5.5vw, 4.5rem)",
          {
            lineHeight: "1.06",
            letterSpacing: "-0.015em",
            fontWeight: "800",
          },
        ],
        "display-lg": [
          "clamp(2rem, 3.8vw, 3rem)",
          {
            lineHeight: "1.12",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        eyebrow: [
          "0.75rem",
          {
            lineHeight: "1.2",
            letterSpacing: "0.18em",
            fontWeight: "600",
          },
        ],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        // Mailchimp 签名 "stamp" 阴影 —— offset，无 blur，黑色
        stamp: "4px 4px 0 0 #241C15",
        "stamp-lg": "6px 6px 0 0 #241C15",
        "stamp-xl": "8px 8px 0 0 #241C15",
        "stamp-hover": "10px 10px 0 0 #241C15",
        // 软阴影 (悬浮态、温暖)
        soft: "0 4px 12px rgba(36, 28, 21, 0.08)",
        "soft-lg": "0 12px 32px rgba(36, 28, 21, 0.12)",
      },
      transitionTimingFunction: {
        // 弹簧曲线，hover 微弹起感
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
        600: "600ms",
      },
      animation: {
        "spin-slow": "spinSlow 16s linear infinite",
        "spin-rev": "spinRev 22s linear infinite",
        wiggle: "wiggle 4s ease-in-out infinite",
        "float-y": "floatY 6s ease-in-out infinite",
        "float-y-sm": "floatYSm 4.5s ease-in-out infinite",
        "float-y-md": "floatYMd 5.5s ease-in-out infinite",
        "sway-leaf": "sway 3.6s ease-in-out infinite",
        "pulse-bulb": "pulseBulb 2.6s ease-in-out infinite",
        twinkle: "twinkle 2.2s ease-in-out infinite",
        breath: "breath 4.5s ease-in-out infinite",
        // 入场动画
        "enter-pop": "enterPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "enter-up": "enterUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) both",
        "enter-down": "enterDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "enter-spin":
          "enterSpin 1s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "enter-fade": "enterFade 1.2s ease-out both",
        // Manifesto 成长剧场 (8s 循环)
        "m-seed": "mSeed 8s ease-in-out infinite",
        "m-sprout": "mSprout 8s ease-in-out infinite",
        "m-young": "mYoung 8s ease-in-out infinite",
        "m-tree": "mTree 8s ease-in-out infinite",
        "m-can": "mCan 8s ease-in-out infinite",
        "m-drops": "mDrops 8s linear infinite",
        "m-spark": "mSpark 8s ease-out infinite",
        // CTA 庆祝场景
        wave: "wave 6s ease-in-out infinite",
        "star-pulse": "starPulse 5s ease-in-out infinite",
        "dot-pulse": "dotPulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        floatYSm: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        floatYMd: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-9deg)" },
          "50%": { transform: "rotate(9deg)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        spinRev: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        pulseBulb: {
          "0%, 100%": {
            transform: "scale(1)",
            filter: "brightness(1) drop-shadow(0 0 0 rgba(244,211,94,0))",
          },
          "50%": {
            transform: "scale(1.07)",
            filter:
              "brightness(1.15) drop-shadow(0 0 16px rgba(244,211,94,0.55))",
          },
        },
        twinkle: {
          "0%, 100%": {
            opacity: "0.45",
            transform: "scale(0.82) rotate(0deg)",
          },
          "50%": { opacity: "1", transform: "scale(1.15) rotate(35deg)" },
        },
        breath: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        // ─── 入场 keyframes ───
        enterPop: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "60%": { opacity: "1", transform: "scale(1.12)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        enterUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(50px) scale(0.7)",
          },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        enterDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-50px) scale(0.6)",
          },
          "70%": {
            opacity: "1",
            transform: "translateY(8px) scale(1.05)",
          },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        enterSpin: {
          "0%": {
            opacity: "0",
            transform: "scale(0) rotate(-180deg)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) rotate(0deg)",
          },
        },
        enterFade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // ─── Manifesto 成长剧场 keyframes (12s 周期) ───
        mSeed: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "26%, 30%": {
            opacity: "1",
            transform: "scale(1.04) translateY(-2px)",
          },
          "33%": { opacity: "0", transform: "scale(1.06)" },
          "92%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        mSprout: {
          "0%, 30%": { opacity: "0", transform: "scale(0.4)" },
          "34%": { opacity: "1", transform: "scale(1.15)" },
          "38%, 46%": { opacity: "1", transform: "scale(1)" },
          "50%, 100%": { opacity: "0", transform: "scale(1)" },
        },
        mYoung: {
          "0%, 47%": { opacity: "0", transform: "scale(0.6)" },
          "51%": { opacity: "1", transform: "scale(1.12)" },
          "54%, 60%": { opacity: "1", transform: "scale(1)" },
          "63%, 100%": { opacity: "0", transform: "scale(1)" },
        },
        mTree: {
          "0%, 62%": { opacity: "0", transform: "scale(0.6)" },
          "66%": { opacity: "1", transform: "scale(1.1)" },
          "70%, 88%": { opacity: "1", transform: "scale(1)" },
          "92%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "0", transform: "scale(0.6)" },
        },
        mCan: {
          "0%, 8%": {
            opacity: "0",
            transform:
              "translateX(85%) translateY(-25%) rotate(35deg) scaleX(-1)",
          },
          "14%": {
            opacity: "1",
            transform:
              "translateX(15%) translateY(-8%) rotate(5deg) scaleX(-1)",
          },
          "20%, 28%": {
            opacity: "1",
            transform:
              "translateX(0%) translateY(0%) rotate(-18deg) scaleX(-1)",
          },
          "32%": {
            opacity: "1",
            transform:
              "translateX(15%) translateY(-8%) rotate(5deg) scaleX(-1)",
          },
          "38%, 100%": {
            opacity: "0",
            transform:
              "translateX(85%) translateY(-25%) rotate(35deg) scaleX(-1)",
          },
        },
        mDrops: {
          "0%, 18%": {
            opacity: "0",
            transform: "translateY(-15px) scale(0.6)",
          },
          "22%": { opacity: "1", transform: "translateY(0px) scale(1.05)" },
          "26%": { opacity: "1", transform: "translateY(30px) scale(1)" },
          "30%": { opacity: "1", transform: "translateY(60px) scale(0.95)" },
          "34%, 100%": {
            opacity: "0",
            transform: "translateY(90px) scale(0.75)",
          },
        },
        mSpark: {
          "0%, 62%": { opacity: "0", transform: "scale(0.4)" },
          "66%": { opacity: "1", transform: "scale(1.3)" },
          "72%": { opacity: "0.85", transform: "scale(1.05)" },
          "85%": { opacity: "0.55", transform: "scale(1)" },
          "92%, 100%": { opacity: "0", transform: "scale(0.5)" },
        },
        // ─── CTA 庆祝场景 keyframes ───
        // 主角偶尔挥手 (90% 静止，10% 抖动几下)
        wave: {
          "0%, 70%, 100%": { transform: "rotate(0deg)" },
          "74%": { transform: "rotate(-5deg)" },
          "78%": { transform: "rotate(6deg)" },
          "82%": { transform: "rotate(-4deg)" },
          "86%": { transform: "rotate(3deg)" },
          "92%": { transform: "rotate(0deg)" },
        },
        // 大星星呼吸 + 摇摆旋转
        starPulse: {
          "0%, 100%": { transform: "rotate(-6deg) scale(1)" },
          "25%": { transform: "rotate(4deg) scale(1.06)" },
          "50%": { transform: "rotate(8deg) scale(1)" },
          "75%": { transform: "rotate(-2deg) scale(1.04)" },
        },
        // 绿色圆点 scale + opacity pulse
        dotPulse: {
          "0%, 100%": { opacity: "0.7", transform: "scale(0.88)" },
          "50%": { opacity: "1", transform: "scale(1.18)" },
        },
      },
    },
  },
  plugins: [],
};
