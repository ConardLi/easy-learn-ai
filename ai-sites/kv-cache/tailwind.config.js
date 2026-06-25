/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        butter: {
          DEFAULT: "#F4D35E",
          deep: "#E5BD3A",
          soft: "#FBE891",
          tint: "#FEF6D3",
        },
        cream: "#FBEFE3",
        ink: {
          DEFAULT: "#241C15",
          secondary: "#5A5147",
          tertiary: "#88837C",
        },
        coral: "#E07A5F",
        teal: "#1B4B5A",
        pop: "#FF4D74",
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          '"Noto Sans SC"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"PingFang SC"',
          "system-ui",
          "sans-serif",
        ],
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
        mono: ['"Geist Mono"', '"SF Mono"', "Menlo", "Consolas", "monospace"],
      },
      fontSize: {
        "display-2xl": [
          "clamp(3.25rem, 8vw, 7.25rem)",
          { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        "display-xl": [
          "clamp(2.5rem, 5.5vw, 4.5rem)",
          { lineHeight: "1.06", letterSpacing: "-0.015em", fontWeight: "800" },
        ],
        "display-lg": [
          "clamp(2rem, 3.8vw, 3rem)",
          { lineHeight: "1.12", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        eyebrow: [
          "0.75rem",
          { lineHeight: "1.2", letterSpacing: "0.18em", fontWeight: "600" },
        ],
      },
      spacing: { 18: "4.5rem", 22: "5.5rem", 30: "7.5rem" },
      borderRadius: { "4xl": "2rem", "5xl": "2.5rem" },
      boxShadow: {
        stamp: "4px 4px 0 0 #241C15",
        "stamp-lg": "6px 6px 0 0 #241C15",
        "stamp-xl": "8px 8px 0 0 #241C15",
        "stamp-hover": "10px 10px 0 0 #241C15",
        soft: "0 4px 12px rgba(36, 28, 21, 0.08)",
        "soft-lg": "0 12px 32px rgba(36, 28, 21, 0.12)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: { 250: "250ms", 400: "400ms", 600: "600ms" },
      animation: {
        wiggle: "wiggle 4s ease-in-out infinite",
        "float-y": "floatY 6s ease-in-out infinite",
        "float-y-sm": "floatYSm 4.5s ease-in-out infinite",
        "enter-pop": "enterPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "enter-up": "enterUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) both",
        "enter-fade": "enterFade 1.2s ease-out both",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "dash-flow": "dashFlow 1.2s linear infinite",
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
        enterPop: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "60%": { opacity: "1", transform: "scale(1.12)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        enterUp: {
          "0%": { opacity: "0", transform: "translateY(50px) scale(0.7)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        enterFade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "0.6", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        dashFlow: {
          "0%": { strokeDashoffset: "20" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};
