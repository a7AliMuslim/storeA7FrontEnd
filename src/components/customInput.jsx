import { useState, useRef, useEffect , useCallback, memo} from "react";
import { motion } from "framer-motion";


function getTextWidth(text, rem, font = "Arial") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Convert rem to pixels based on the root font size
    const fontSizePx = rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    ctx.font = `${fontSizePx}px ${font}`;
    return ctx.measureText(text).width;
}


function getAppliedStyle(status, ...colors){
    return colors.find(color=>{
        return color.status===status?true:false;
    })
}





const FloatingLabelInput = ({label='Enter Text', status='primary', adornament=null, className='', primaryUpdate={}, errorUpdate={}, animationDelay=1}) => {
    const [focused, setFocused] = useState(false);
    const contentRef=useRef(null);
    const textFieldRef=useRef(null);
    const inputRef=useRef(null);
    const animatedBorderRef=useRef(null);
    const [primaryColors]=useState({
        status:'primary',
        border:'border-2',
        borderColor:'border-white/80',
        selectionColor:'bg-nvidia-green',
        textColor:'text-white',
        borderFocus:'border-white',
        borderHover:'border-nvidia-green',
        labelColor:'text-white/80',
        labelFocus:'text-white',
        labelHover:'text-nvidia-green',
        ...primaryUpdate
    });
    const [errorColors]=useState({
        status:'error',
        border:'border-2',
        borderColor:'border-red-300',
        selectionColor:'bg-nvidia-green',
        textColor:'text-white',
        borderFocus:'border-red-600',
        borderHover:'border-red-400',
        labelColor:'text-red-300',
        labelFocus:'text-red-600',
        labelHover:'text-red-400',
        ...errorUpdate
    });
    const appliedStyle=getAppliedStyle(status, primaryColors, errorColors);
    

    const focusHandler=()=>{
        setFocused(true);
        
        if(inputRef && animatedBorderRef){
            inputRef.current.style.maskImage='linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)), linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))';

            animatedBorderRef.current.style.maskImage='linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)), linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))';
        }
        
        
    }
    const blurHandle=(e)=>{
        if(!e.target.value){
            setFocused(false);
            inputRef.current.style.maskImage='';
            animatedBorderRef.current.style.maskImage='';
        }
    }

    const setTextCutoffDimensions=useCallback(()=>{
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
    },[label, className, primaryUpdate,errorUpdate])
    console.log(focused);
    useEffect(()=>{
        setTextCutoffDimensions()
        window.addEventListener('resize', setTextCutoffDimensions);

        return ()=>{
            window.removeEventListener('resize', setTextCutoffDimensions);
        }
    },[setTextCutoffDimensions])

  return (
    <div ref={textFieldRef} className={`relative w-full group ${className}`}>
        <motion.div ref={animatedBorderRef} className={`absolute inset-0 rounded-lg z-0 group-hover:border-transparent ${appliedStyle.border} ${appliedStyle.borderColor}`+(focused?' border-transparent':'')}
            initial={{ clipPath: "polygon(0% 0%, 40% 50%, 60% 50%, 0% 0%, 0% 0%)" , opacity:0}}
            animate={{
                opacity:1,
                clipPath: [
                    "polygon(0% 0%, 40% 50%, 60% 50%, 100% 0%, 100% 0%)", // Start from center
                    "polygon(0% 0%, 40% 50%, 60% 50%, 100% 100%, 100% 0%)", // Horizontal reveal
                    "polygon(0% 0%, 0% 100%, 0% 100%, 100% 100%, 100% 0%)"  // Full reveal
                ],
            transition: {
                opacity: { duration: 0, delay: animationDelay }, // Instantly make opacity 1 when animation starts
                clipPath: { duration: 1, ease: "easeInOut", times: [0.3, 0.5, 1], delay: animationDelay }
            }
        }}/>
        <div ref={inputRef} className={`flex flex-row relative rounded-lg border-transparent z-10 ${appliedStyle.border} group-hover:${appliedStyle.borderHover}`+ (focused?` ${appliedStyle.borderFocus}`:'')}>
            <input
                
                id="input"
                type="text"
                className={`flex-grow h-12 relative border-transparent focus:border-transparent focus:ring-[0px] bg-transparent ${appliedStyle.textColor} selection:${appliedStyle.selectionColor} selection:${appliedStyle.textColor}`}
                onFocus={focusHandler}
                onBlur={blurHandle}
            />
            <div className="max-h-12 aspect-square">
                {
                    adornament
                }
            </div>

        
            
        </div>
        <motion.label
                ref={contentRef}
                htmlFor="input"
                initial={{ y: "20%", fontSize: "1rem", padding: "0" , opacity:0}}
                animate={focused ? { y: "-100%", fontSize: "0.75rem" ,opacity:1} : {opacity:1}}
                transition={{
                    y:{duration: 0.1, ease: "easeIn"},
                    fontSize:{duration: 0.1, ease: "easeIn"},
                    opacity:{duration: 1, ease: "easeIn", delay: animationDelay}
                }}
                className={`absolute left-3 top-2 px-1 group-hover:${appliedStyle.labelHover} ${appliedStyle.labelColor} `+(focused?` ${appliedStyle.labelFocus} `:'')}
            >
                {
                    label
                }
        </motion.label>
        

    </div>
  );
};

export default memo(FloatingLabelInput);
