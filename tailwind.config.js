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
        },
        animation:{
            'slide-in':'slideIn 0.2s ease-in-out forwards',
        },
        keyframes:{
            slideIn:{
                '0%':{transform: ' translateX(-10%)', opacity:'0'},
                '100%':{transform: ' translateX(0%)', opacity:'1'}
            },
        }
    },
  },
  plugins: [
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/forms'),
  ],
}

