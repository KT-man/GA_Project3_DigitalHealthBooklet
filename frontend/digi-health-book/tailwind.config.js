/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/SplashPage.js",
    "./src/components/SplashText.js",
    "./src/components/Register.js",
    "./src/components/Login.js",
    "./src/components/Button.js",
    "./src/components/ChildRow.js",
    "./src/components/ModalComponents/ChildData.js",
    "./src/components/ModalComponents/ChildDataLogRows.js",
    "./src/components/ModalComponents/ChildDataApptRows.js",
    "./src/components/ModalComponents/ButtonE.js",
    "./src/components/ModalComponents/ButtonDelete.js",
    "./src/components/ModalComponents/Button.js",
    "./src/components/ModalComponents/Appointment.js",
    "./src/components/ModalComponents/AddChild.js",
    "./src/components/ModalComponents/EditAppt.js",
    "./src/components/ModalComponents/EditLog.js",
    "./src/components/ModalComponents/HeadCircDisplay.js",
    "./src/components/ModalComponents/HeightDisplay.js",
    "./src/components/ModalComponents/Log.js",
    "./src/components/ModalComponents/WeightDisplay.js",

    "./src/components/ModalComponents/*",
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
