import {useEffect, useRef} from 'react';
import {useUserContext} from '../components/userContext.jsx';
import StarrySky from '../components/animations/meteorShower.jsx';
import DeliveryDetails from '../components/checkoutSubComponents/deliveryDetails.jsx';
import OrderSummery from '../components/checkoutSubComponents/orderSummery.jsx';




const parseBorderRadius = (radius) => {
    return radius.split(" ").map((val) => parseFloat(val) || 0);
};
let lastCanvasBlobCall=1;


function Checkout(){
    
    console.log('re-render checkout');
    
    const userObj=useUserContext();
    const canvasRef = useRef(null);
    const deliveryTextRef=useRef(null);
    const productsListDiv=useRef(null);
    const checkoutContainerRef=useRef(null);
    const maskRef=useRef(null);
    

    const drawDivOnCanvas=(Div,Canvas)=>{
        if (!Div) return;
        if (!Canvas) return;
        
        const ctx = Canvas.getContext("2d");
    
    
        
        const borderRadius = window.getComputedStyle(Div).borderRadius;


        const rect = Div.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;
        const yScroll=window.scrollY;
        const xScroll=window.scrollX;
        const top = rect.top +yScroll;
        const left = rect.left+xScroll;
    
    
        // Parse border radius
        const radiusValues = parseBorderRadius(borderRadius, width, height);
        

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.roundRect(left, top, width, height, radiusValues);
        ctx.fill();
    
    }
    const drawMask=()=>{
        if(productsListDiv && deliveryTextRef&& canvasRef && checkoutContainerRef){
            const containerComputedStyles=window.getComputedStyle(checkoutContainerRef.current);
            const Ctx = canvasRef.current.getContext("2d");
            const checkoutContainerWidth=parseFloat(containerComputedStyles.width);
            const checkoutContainerHeight=parseFloat(containerComputedStyles.height);

            canvasRef.current.width=checkoutContainerWidth;
            canvasRef.current.height=checkoutContainerHeight;
            Ctx.clearRect(0, 0, checkoutContainerWidth, checkoutContainerHeight);

            
            drawDivOnCanvas(productsListDiv.current, canvasRef.current);
            drawDivOnCanvas(deliveryTextRef.current, canvasRef.current);

            
            const position=`0px 0px, 0px 0px`;
            const size=`100% 100%, ${checkoutContainerWidth}px ${checkoutContainerHeight}px`;


            const currentCanvasBlobCall=lastCanvasBlobCall;
            lastCanvasBlobCall=lastCanvasBlobCall+1
            
            canvasRef.current.toBlob((blob) => {
                if (blob && currentCanvasBlobCall===(lastCanvasBlobCall-1)) {
                    const compAppStyle=window.getComputedStyle(document.getElementById('app'));
                    maskRef.current.style.height=compAppStyle.height;
                    maskRef.current.style.width=compAppStyle.width;
                    lastCanvasBlobCall=1
                    const objectURL = URL.createObjectURL(blob);
                    maskRef.current.style.maskImage= `linear-gradient(black, black) ,url(${objectURL})`;
                    maskRef.current.style.maskPosition=position
                    maskRef.current.style.maskSize=size;
              }
            }, "image/png");


        }

    }
    useEffect(() => {
        drawMask()
        window.addEventListener("resize", drawMask);
        return ()=>{
            window.removeEventListener("resize", drawMask);
        }
        
    },[]);
    return (
    <div ref={checkoutContainerRef} className='w-full flex green-gradient-y flex-grow'>
        <StarrySky/>
        <canvas ref={canvasRef} className="hidden" />
        <div ref={maskRef}  className="w-full h-full grid-lines absolute inset-0 z-0 mask">
        </div>
        <div id='deliveryDetails' className='basis-1/2 p-4 z-10'>
            <DeliveryDetails deliveryTextRef={deliveryTextRef}/>
        </div>
        <div id='orderSummery' className='basis-1/2 h-full p-4 z-10 text-light-text'>
            <OrderSummery productsListDiv={productsListDiv}/>
        </div>
    </div>
    )
}
export default Checkout;