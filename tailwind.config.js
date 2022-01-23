module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'main': 'Montserrat'
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': 'calc(100% / 3)',
        '1/4': '25%',
        '3/4': '75%'
      },
      minWidth: {
        '1/2': '50%',
        '1/3': 'calc(100% / 3)',
        '1/4': '25%',
        '3/4': '75%'
      },
      colors: {
        'success': '#b4edd2',
        'secondary-dark': '#3f3f46'
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['focus']
    },
  },
  plugins: [],
}
