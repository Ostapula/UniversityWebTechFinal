/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-20": "#E8F4FB",
        "gray-50": "#D6E4EC",
        "gray-100": "#B0C4D8",
        "gray-500": "#3A4757",
        "primary-100": "#E0F2FF",
        "primary-300": "#A3D1FF",
        "primary-500": "#6690FF",
        "secondary-400": "#5BCDFF",
        "secondary-500": "#32A6FF",
      },
      backgroundImage: (theme) => ({
        //"gradient-yellowred": "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
        "mobile-home": "url('./assets/HomePageGraphic.png')"
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
      content: {
        computerstext: "url('./assets/ComputersText.png')",
        processors: "url('./assets/processors.png')",
        gpu: "url('./assets/gpu.png')",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
}