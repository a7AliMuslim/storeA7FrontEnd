/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  safelist: [
    "border-2",
    "border-white/80",
    "selection:bg-nvidia-green",
    "selection:text-white",
    "text-white",
    "border-white",
    'group-hover:border-nvidia-green',
    'text-white/80',
    'group-hover:text-nvidia-green',
    'border-red-300',
    'border-red-600',
    'border-red-400',
    'text-red-300',
    'text-red-600',
    'group-hover:text-red-400',
    'group-hover:border-red-400',
    'border-transparent',
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
            'nvidia-green':'#76B900',
            'nvidia-green-dark':'#598D00'
        },
        animation:{
            'slide-in':'slideIn 0.2s ease-in-out forwards',
            'slide-down':'slideDown 0.2s ease-in-out forwards',
            'slide-out':'slideOut 0.2s ease-in-out forwards',
            'spin-fast':'spinFast 0.5s ease-out forwards',
            'bg-pan-left':'bgPanLeft 3s cubic-bezier(0.175, 0.885, 0.320, 1.275) 2s alternate-reverse both',
            'slide-in-appear':'slideInAppear 3s ease-in-out forwards',
            'bg-breath-right-left':'bgBreathRightLeft 40s ease-in-out infinite',
        },
        keyframes:{
            slideIn:{
                '0%':{transform: ' translateX(-1%)', opacity:'0'},
                '100%':{transform: ' translateX(0%)', opacity:'1'}
            },
            slideOut:{
                '0%':{transform: ' translateX(0%)', opacity:'1'},
                '95%':{transform: ' translateX(-50%)', opacity:'0'},
                '100%':{transform: ' translateX(-500%)', opacity:'0'}
            },
            slideDown:{
                '0%':{transform: ' translateY(-1%)', opacity:'0'},
                '80%':{transform: ' translateY(2%)', opacity:'0.8'},
                '100%':{transform: ' translateY(0%)', opacity:'1'}
            },
            spinFast:{
                '0%':{transform: ' rotate(0deg)', opacity:'0.5'},
                '30%':{transform: ' rotate(140deg)', opacity:'0.8'},
                '60%':{transform: ' translateY(170deg)', opacity:'1'},
                '100%':{transform: ' translateY(180deg)', opacity:'1'}
            },
            bgPanLeft:{
                '0%':{backgroundPosition: '120% 50%'},
                '100%':{backgroundPosition: '0% 50%'}
            },
            slideInAppear:{
                '0%':{transform: ' translateX(-4%)', opacity:'0'},
                '40%':{transform: ' translateX(-4%)', opacity:'0'},
                '95':{transform: ' translateX(-1%)', opacity:'0.9'},
                '100%':{transform: ' translateX(0%)', opacity:'1'}
            },
            bgBreathRightLeft:{
                '0%':{backgroundPosition: '120% 50%'},
                '10%':{backgroundPosition: '100% 50%'},
                '90%':{backgroundPosition: '100% 50%'},
                '100%':{backgroundPosition: '120% 50%'}
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

