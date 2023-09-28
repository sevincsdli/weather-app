/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", ],
  theme: {
     extend: {
    screens: {
      'xxs': {'max':'400px'},
      'xs': {'max':'500px'},
      'xl':{'max':'1115px'}
    },
  },
  },
  plugins: [],
}

