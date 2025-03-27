import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

let lastCanvasBlobCall=1;
function getTextWidth(text, rem, font = "Arial") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Convert rem to pixels based on the root font size
    const fontSizePx = rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    ctx.font = `${fontSizePx}px ${font}`;
    return ctx.measureText(text).width;
}








const FloatingLabelInput = () => {
    const [focused, setFocused] = useState(false);
    const contentRef=useRef(null);
    const textFieldRef=useRef(null);
    const inputRef=useRef(null);
    const animatedBorderRef=useRef(null);



    const focusHandler=()=>{
        setFocused(true);
        
        if(inputRef && animatedBorderRef){
            inputRef.current.style.maskImage='linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)), linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))';

            animatedBorderRef.current.style.maskImage='linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)), linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))';
        }
        
        
    }
    const blurHandle=(e)=>{
        !e.target.value && setFocused(false);
        inputRef.current.style.maskImage='';
        animatedBorderRef.current.style.maskImage='';
        
    }

    const setTextCutoffDimensions=()=>{
        if(inputRef && textFieldRef && contentRef && animatedBorderRef){
            const textFieldRect=textFieldRef.current.getBoundingClientRect();
            const contentRect = contentRef.current.getBoundingClientRect();
            const input=inputRef.current;
            const animatedBorder=animatedBorderRef.current;
            const left = contentRect.left -textFieldRect.left;
            const width=getTextWidth(contentRef.current.innerText,0.75)+6+'px';
            const height='1rem';
    
            
            input.style.maskPosition=`100% 100%, ${left-3}px 0px`;
            input.style.maskSize=`100% 100%, ${width} ${height}`;
            input.style.maskRepeat = 'no-repeat, no-repeat'
            input.style.maskComposite='exclude';


            
            animatedBorder.style.maskPosition=`100% 100%, ${left-3}px 0px`;
            animatedBorder.style.maskSize=`100% 100%, ${width} ${height}`;
            animatedBorder.style.maskRepeat = 'no-repeat, no-repeat'
            animatedBorder.style.maskComposite='exclude';
        }
    }

    useEffect(()=>{
        setTextCutoffDimensions()
        window.addEventListener('resize', setTextCutoffDimensions);

        return ()=>{
            window.removeEventListener('resize', setTextCutoffDimensions);
        }
    },[])

  return (
    <div ref={textFieldRef} className="relative w-full">
        <motion.div ref={animatedBorderRef} className="absolute inset-0 border-[0.1rem] border-black rounded-lg z-0"
            initial={{ clipPath: "polygon(0% 0%, 40% 50%, 60% 50%, 0% 0%, 0% 0%)" }}
            animate={{
                clipPath: [
                    "polygon(0% 0%, 40% 50%, 60% 50%, 100% 0%, 100% 0%)", // Start from center
                    "polygon(0% 0%, 40% 50%, 60% 50%, 100% 100%, 100% 0%)", // Horizontal reveal
                    "polygon(0% 0%, 0% 100%, 0% 100%, 100% 100%, 100% 0%)"  // Full reveal
                ],
            transition: {
                duration: 1,
                ease: "easeInOut",
                times: [0.3, 0.5, 1],
                delay:1
            }
        }}/>
      {/* Input Field */}
        <input
            ref={inputRef}
            id="input"
            type="text"
            className="w-full h-14 relative border-2 border-transparent focus:ring-[0px] rounded-lg focus:border-white bg-transparent  z-10"
            onFocus={focusHandler}
            onBlur={blurHandle}
        />

      {/* Floating Label */}
        <motion.label
            ref={contentRef}
            htmlFor="input"
            initial={{ y: "25%", fontSize: "1rem", padding: "0" }}
            animate={focused ? { y: "-100%", fontSize: "0.75rem" } : {}}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-3 top-2 px-1 text-light-text z-10"
        >
            Enter text
        </motion.label>

      {/* Pseudo-element to "cut" the border under label */}
        <motion.div
            className="absolute left-2 right-2 top-[14px] h-[6px]"
            initial={{ scaleX: 0 }}
            animate={focused ? { scaleX: 1 } : {}}
            transition={{ duration: 0.3, ease: "easeOut" }}
        />
    </div>
  );
};

export default FloatingLabelInput;
