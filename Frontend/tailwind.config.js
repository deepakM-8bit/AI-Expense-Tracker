/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },

      boxShadow: {
        soft: "0 6px 30px -10px rgba(2,6,23,0.12)",
        glass: "0 8px 40px rgba(2,6,23,0.15)",
      },

      keyframes: {
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        slideIn: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },

      animation: {
        float: "float 8s ease-in-out infinite",
        slideIn: "slideIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
