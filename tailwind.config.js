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
            'slide-down':'slideDown 0.2s ease-in-out forwards',
        },
        keyframes:{
            slideIn:{
                '0%':{transform: ' translateX(-10%)', opacity:'0'},
                '100%':{transform: ' translateX(0%)', opacity:'1'}
            },
            slideDown:{
                '0%':{transform: ' translateY(-10%)', opacity:'0'},
                '80%':{transform: ' translateY(2%)', opacity:'0.8'},
                '100%':{transform: ' translateY(0%)', opacity:'1'}
            },
        },
        screens:{
            'touch':{'raw':'(hover:none) and (pointer:coarse)'},
        }
    },
  },
  plugins: [
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/forms'),
  ],
}

