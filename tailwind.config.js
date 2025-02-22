/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors:{
            'cblank':'#F3F3E0',
            'cdarkBlue':'#133E87',
            'clightBlue':'#608BC1',
            'cwhiteBlue':'#CBDCEB',
            'light':'#FFFFFF',
            'dark':'#000000',
        }
    },
  },
  plugins: [
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/forms'),
  ],
}

