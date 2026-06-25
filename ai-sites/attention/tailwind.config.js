/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        butter: { DEFAULT: "#F4D35E", deep: "#E5BD3A", soft: "#FBE891", tint: "#FEF6D3" },
        cream: "#FBEFE3",
        ink: { DEFAULT: "#241C15", secondary: "#5A5147", tertiary: "#88837C" },
        coral: "#E07A5F",
        teal: "#1B4B5A",
        pop: "#FF4D74",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans SC"', "system-ui", "sans-serif"],
        display: ['"Smiley Sans"', '"Plus Jakarta Sans"', '"Noto Sans SC"', "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', '"SF Mono"', "Menlo", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.25rem, 8vw, 7.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-xl": ["clamp(2.5rem, 5.5vw, 4.5rem)", { lineHeight: "1.06", letterSpacing: "-0.015em", fontWeight: "800" }],
        "display-lg": ["clamp(2rem, 3.8vw, 3rem)", { lineHeight: "1.12", letterSpacing: "-0.01em", fontWeight: "700" }],
      },
      borderRadius: { "4xl": "2rem" },
      boxShadow: {
        stamp: "4px 4px 0 0 #241C15",
        "stamp-lg": "6px 6px 0 0 #241C15",
        "stamp-xl": "8px 8px 0 0 #241C15",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        editorial: "cubic-bezier(0.22, 1,0.36,1)",
      },
      transitionDuration: { 250: "250ms", 400: "400ms" },
      animation: {
        "enter-pop": "enterPop .6s cubic-bezier(.34,1.56,.64,1) both",
        "enter-up": "enterUp .7s cubic-bezier(.22,1,.36,1) both",
        "enter-fade": "enterFade .7s ease-out both",
        "float-y": "floatY 5s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "dash-flow": "dashFlow 1.2s linear infinite",
      },
      keyframes: {
        enterPop: { "0%": { opacity: "0", transform: "scale(.7)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        enterUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        enterFade: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        floatY: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pulseDot: { "0%,100%": { opacity: ".55", transform: "scale(.9)" }, "50%": { opacity: "1", transform: "scale(1.15)" } },
        dashFlow: { "0%": { strokeDashoffset: "20" }, "100%": { strokeDashoffset: "0" } },
      },
    },
  },
  plugins: [],
};
