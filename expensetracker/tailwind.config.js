/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/main/resources/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {

        lightbg: '#eaeaea',
        lightNav: '#d6d6d4',
        lightbtn: 'rgb(234 88 12)',
        lightbtnhover: 'rgb(218 65 0)',
        lightborder: '#a3a3a2',
        lightextra: '#229799',
        emtext: '#2db84c',
        lightptext: 'rgb(100 116 139)',
        danger : '#D32F2F'

      },
      fontFamily: {
        parks: ['Parkinsans', 'sans-serif'],
      },
      boxShadow: {
        'inset-red': 'inset 0px 0px 20px 6px rgb(254 202 202)',
        'inset-green': 'inset 0px 0px 20px 6px rgb(187 247 208)',
      },
    },
  },
  plugins: [],
  darkMode: "class",
}

  