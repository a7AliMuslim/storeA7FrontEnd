/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors:{
            'custom-white':'#F3F3E0',
            'dark-blue':'#133E87',
            'ligh-blue':'#608BC1',
            'white-blue':'#CBDCEB',
            'light-dark':'#43414a',
            'dark':'#2C2A34',
            'dark-purple-black':'#1F1B24',
            'light-text':'#F0F0F0',
            'light-gray':'#b2aebc',
            'nvidia-green':'#76B900'
        },
        animation:{
            'slide-in':'slideIn 0.2s ease-in-out forwards',
            'slide-down':'slideDown 0.2s ease-in-out forwards',
            'slide-out':'slideOut 0.2s ease-in-out forwards',
            'spin-fast':'spinFast 0.5s ease-out forwards',
        },
        keyframes:{
            slideIn:{
                '0%':{transform: ' translateX(-10%)', opacity:'0'},
                '100%':{transform: ' translateX(0%)', opacity:'1'}
            },
            slideOut:{
                '0%':{transform: ' translateX(0%)', opacity:'1'},
                '95%':{transform: ' translateX(-50%)', opacity:'0'},
                '100%':{transform: ' translateX(-500%)', opacity:'0'}
            },
            slideDown:{
                '0%':{transform: ' translateY(-10%)', opacity:'0'},
                '80%':{transform: ' translateY(2%)', opacity:'0.8'},
                '100%':{transform: ' translateY(0%)', opacity:'1'}
            },
            spinFast:{
                '0%':{transform: ' rotate(0deg)', opacity:'0.5'},
                '30%':{transform: ' rotate(140deg)', opacity:'0.8'},
                '60%':{transform: ' translateY(170deg)', opacity:'1'},
                '100%':{transform: ' translateY(180deg)', opacity:'1'}
            }
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

