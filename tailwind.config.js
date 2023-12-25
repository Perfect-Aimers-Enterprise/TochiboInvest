//  @type {import('tailwindcss').Config}
// module.exports = {
//   content: ["./public/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    screens: {
      // sml: '350px',
      sm: '480px',
      md: '750px',
      lg: '900px',
      xl: '1200px'
    },
    extend: {
      colors: {
        sweetBlue: 'rgb(212, 227, 255)',
        gold1: '#FFD700',
        goldenrod: '#DAA520',
        dimGold: "#b38720",
        rough: "#fff",
        dimGoldb: "#a58842",
        whity: "rgb(255, 255, 255);",
        bluewy: "rgb(180, 192, 238);",
        whit: "#FFF;",
      },
      width: {
        '37-50': '74%',
      },
    },
  },
  plugins: [],
}

