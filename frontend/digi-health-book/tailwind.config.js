/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/SplashPage.js",
    "./src/components/Button.js",
    "./src/components/ModalComponents/",
    " ./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        bayleaf: "#4caf50",
        carrot: "#EB9B1C",
        tumbleweed: "#DFA282",
        rum: "#7A5E7D",
        plumish: "#8e4d96",
        salmon: "#FFA384",
        fresia: "#EFE7BC",
        aquamarine: "#74BDCB",
        babyblue: "#E7F2F8",
        blueberry: "#4d5896",
      },
    },
  },
  plugins: [],
};
