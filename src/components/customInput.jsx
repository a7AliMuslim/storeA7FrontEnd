import { useState, useRef, useEffect , useCallback, memo, useId} from "react";
import { motion } from "framer-motion";


function getAppliedStyle(status, ...colors){
    return colors.find(color=>{
        return color.status===status?true:false;
    })
}


const FloatingLabelInput = ({label='Enter Text', status='primary', adornament=null, className='', primaryUpdate={}, errorUpdate={}, animationDelay=1, value='', onChange=()=>{}, type='text', autoComplete='off', name='input', onBlur=()=>{}, placeholder='', endFocus=false}) => {
    const [focused, setFocused] = useState(false);
    const [autoFill, setAutoFill] = useState(false);
    const focusRef=useRef(focused);
    const contentRef=useRef(null);
    const textFieldRef=useRef(null);
    const inputRef=useRef(null);
    const animatedBorderRef=useRef(null);
    const uniqueId=useId();
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
        
        if(!(e.target.value)){
            setFocused(false);
            inputRef.current.style.maskImage='';
            animatedBorderRef.current.style.maskImage='';
        }
        onBlur();
    }
    
    
    
    const setTextCutoffDimensions=useCallback(()=>{
        if(inputRef && textFieldRef && contentRef && animatedBorderRef){
            const textFieldRect=textFieldRef.current.getBoundingClientRect();
            const contentRect = contentRef.current.getBoundingClientRect();
            const input=inputRef.current;
            const animatedBorder=animatedBorderRef.current;
            const left = contentRect.left -textFieldRect.left;
            let width;
            if(focused){
                width=(contentRef.current.getBoundingClientRect().width)+6+'px'
            }else{
                width=(contentRef.current.getBoundingClientRect().width*0.75)+6+'px'
            }
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
    },[label, className, JSON.stringify(primaryUpdate),JSON.stringify(errorUpdate)]);
    useEffect(()=>{
        setTextCutoffDimensions()
        window.addEventListener('resize', setTextCutoffDimensions);

        return ()=>{
            window.removeEventListener('resize', setTextCutoffDimensions);
        }
    },[setTextCutoffDimensions]);

    const autoFillHandle=(event)=>{
        if (event.animationName === "onAutoFillStart" && event.target.id===uniqueId) {
            
            setAutoFill(true);
            if(inputRef && animatedBorderRef){
                inputRef.current.style.maskImage='linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)), linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))';

                animatedBorderRef.current.style.maskImage='linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)), linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))';
            }
        }

        if (event.animationName === "onAutoFillEndStart" && event.target.id===uniqueId && event.target.getAttribute("autocomplete")==='on') {
            setAutoFill(false);
            if(!focusRef.current){
                inputRef.current.style.maskImage='';
                animatedBorderRef.current.style.maskImage='';
            } 
        }
    }
    useEffect(() => {
        focusRef.current = focused;
    }, [focused]);
    useEffect(() => {
        const handleAnimationStart = (event) => {
            autoFillHandle(event);
        };
    
        document.addEventListener("animationstart", handleAnimationStart);
        document.addEventListener("MSAnimationStart", handleAnimationStart, false);

    
        return () => {
          document.removeEventListener("animationstart", handleAnimationStart);
          document.removeEventListener("MSAnimationStart", handleAnimationStart);
          
        };
      }, []);
    useEffect(()=>{
        if(endFocus){
            setFocused(false);
            setAutoFill(false);
            inputRef.current.style.maskImage='';
            animatedBorderRef.current.style.maskImage='';
        }
    },[endFocus]);
    

   
    

  return (
    <div ref={textFieldRef} className={`relative w-80 h-fit group inline-block backdrop-blur-xs ${className}`}>
        <motion.div ref={animatedBorderRef} className={`absolute inset-0 rounded-tr-lg rounded-bl-lg z-0 group-hover:border-transparent ${appliedStyle.border} ${appliedStyle.borderColor}`+(focused?' !border-transparent':'')}
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
        <div ref={inputRef} className={`flex flex-row relative rounded-tr-lg rounded-bl-lg border-transparent z-10 ${appliedStyle.border} group-hover:!${appliedStyle.borderHover}`+ ((focused||autoFill)?` !${appliedStyle.borderFocus}`:'')}>
            <input
                name={name}
                id={uniqueId}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={(focused||autoFill)?placeholder:''}
                autoComplete={autoComplete}
                className={`flex-grow h-12 relative border-transparent focus:border-transparent focus:ring-[0px] bg-transparent ${appliedStyle.textColor} selection:${appliedStyle.selectionColor} selection:${appliedStyle.textColor}`}
                onFocus={focusHandler}
                onBlur={blurHandle}
            />
            <div className={`aspect-square flex items-center justify-center group-hover:!${appliedStyle.labelHover} ${appliedStyle.labelColor} `+((focused||autoFill)?` !${appliedStyle.labelFocus} `:'')+(adornament?' w-12':'')}>
                {
                    adornament
                }
            </div>

        
            
        </div>
        <motion.label
                ref={contentRef}
                htmlFor={uniqueId}
                initial={{ y: "20%", fontSize: "1rem", padding: "0" , opacity:0}}
                animate={(focused||autoFill) ? { y: "-100%", fontSize: "0.75rem" ,opacity:1} : {opacity:1}}
                transition={{
                    y:{duration: 0.1, ease: "easeIn"},
                    fontSize:{duration: 0.1, ease: "easeIn"},
                    opacity:{duration: 0.2, ease: "easeIn", delay: animationDelay+1}
                }}
                className={`absolute left-3 top-2 px-1 z-0 group-hover:!${appliedStyle.labelHover} ${appliedStyle.labelColor} `+((focused||autoFill)?` !${appliedStyle.labelFocus} `:'')}
            >
                {
                    label
                }
        </motion.label>
        

    </div>
  );
};

export default memo(FloatingLabelInput);
