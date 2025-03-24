import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {useUserContext} from '../components/userContext.jsx';
import {useLocation} from 'react-router-dom';
import {cartStore} from '../features/cart/cartStore.jsx';
import { TextField, Button, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import CartCard from '../components/cartCard';
axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('key')}`;

const themeTextfield = createTheme({
    palette: {
      primary: {
          main:grey[700],
          light:grey[200],
          dark:grey[900],
          contrastText: grey[100],
      },
      warning:{
          main:red[800],
          light:grey[200],
          dark:grey[900],
          contrastText: grey[900],
      }
    },
});

const themeButton=createTheme({
    palette: {
      primary: {
          main:'#76B900',
          light:grey[300],
          dark:'#598D00',
          contrastText: grey[900],
      }
      
    },
});

const parseBorderRadius = (radius) => {
    return radius.split(" ").map((val) => parseFloat(val) || 0);
};
let lastCanvasBlobCall=1;
function Checkout(){
    const [change, setChange]=useState(1);
    const [email,setEmail]=useState(null);
    const [telephone,setTelephone]=useState(null);
    const [cardNumber,setCardNumber]=useState(null);
    const [cardExpirationMonth,setCardExpirationMonth]=useState(null);
    const [cardExpirationYear,setCardExpirationYear]=useState(null);
    const [cardExpiration,setCardExpiration]=useState(null);
    const [cvc, setCvc]=useState(null);
    const [address, setAddress]=useState(null);
    const [city, setCity]=useState(null);
    const [country, setCountry]=useState(null);
    const [postalCode, setPostalCode]=useState(null);
    const [shippingCost, setShippingCost]=useState(2000);
    const [taxes, setTaxes]=useState(200);
    const products=cartStore.getState().cart.products;
    let subTotalAll=0;
    const userObj=useUserContext();
    const location=useLocation();
    const canvasRef = useRef(null);
    const contactInfoDivRef=useRef(null);
    const paymentDetailsDivRef=useRef(null);
    const addressDviRef=useRef(null);
    const deliveryTextRef=useRef(null);
    const productsListDiv=useRef(null);
    const checkoutContainerRef=useRef(null);
    const maskRef=useRef(null);
    
    const emailChangeHandler=(event)=>{
        setEmail(event.currentTarget.value);
    }
    const telephoneChangeHandler=(event)=>{
        setTelephone(event.currentTarget.value);
    }
    const cardNumberChangeHandler=(event)=>{
        setCardNumber(event.currentTarget.value);
    }
    const cardExpirationChangeHandler=(event)=>{
        const elemValue=event.target.value;
        if(elemValue.length<2){
            setCardExpirationMonth(elemValue);
            setCardExpiration(elemValue);
        }else if(elemValue.length==2){
            if(elemValue.length<cardExpiration.length){
                setCardExpiration(elemValue.slice(0,1));
                console.log(elemValue);
                return;
            }
            setCardExpiration(elemValue+'/');
            setCardExpirationMonth(elemValue);
        }else if(elemValue.length>2){
            setCardExpiration(elemValue.slice(0,5));
            setCardExpirationYear(elemValue.slice(3,5));
        }
        console.log(elemValue); 
    }
    const cvcChangeHandler=(event)=>{
        if(isNaN(event.currentTarget.value)){
            return;
        }
        let val=Math.round(event.currentTarget.value);
        if(val==0){
            val=''
        }else{
           val=''+val; 
        }
        setCvc(val.slice(0,3));
    }
    const addressChangeHandler=(event)=>{
        setAddress(event.currentTarget.value);
        console.log(event.currentTarget.value);
    }
    const cityChangeHandler=(event)=>{
        setCity(event.currentTarget.value);
    }
    const countryChangeHandler=(event)=>{
        setCountry(event.currentTarget.value);
    }
    const postalChangeHandler=(event)=>{
        setPostalCode(event.currentTarget.value);
    }
    const submitOrderHandler=()=>{
        const submit=async ()=>{
            try{
                const response=await axios.post('http://localhost:3002/api/v1/orders/post',{products});
                console.log(response.data);
            }catch(err){
                console.log(err);
            }
        }
        submit();
    }
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
    return <div ref={checkoutContainerRef} className='w-full flex green-gradient-y flex-grow'>
        <canvas ref={canvasRef} className="hidden" />
        <div ref={maskRef}  className="w-full h-full grid-lines absolute inset-0 z-0 mask">
        </div>
        <div id='deliveryDetails' className='basis-1/2 p-4 z-10'>
            <div ref={deliveryTextRef} className='w-full flex flex-col gap-4 rounded-3xl bg-black/5 backdrop-blur-sm'>
                <div name='contactInfo' className='w-full text-light-text py-4 px-2'>
                    <p className='text-2xl my-2'>Contact Information</p>
                    <ThemeProvider theme={themeTextfield}>
                        <TextField autoComplete='on' label="Email" name='email' value={email} onChange={emailChangeHandler} color='primary' className='w-1/2' inputProps={{'type':'email', 'className':'focus:ring-[0px]'}}/>

                        <TextField autoComplete='on' label="Ph. number" name='tel' value={telephone} onChange={telephoneChangeHandler} inputProps={{'type':'tel', 'className':'focus:ring-[0px]'}} className='w-1/2' />
                    </ThemeProvider>
                </div>
                <div name='paymentDetails' className='w-full text-light-text py-4 px-2'>
                    <p className='text-2xl my-2'>Payment details</p>
                    <ThemeProvider theme={themeTextfield}>
                        <TextField autoComplete='on' label="Card No." name='paymentCard' value={cardNumber} onChange={cardNumberChangeHandler} inputProps={{'placeholder':'XXXX-XXXX-XXXX-XXXX', 'className':'focus:ring-[0px]'}} fullWidth={true}/>
                    </ThemeProvider>
                    <div className='flex'>
                        <ThemeProvider theme={themeTextfield}>
                            <TextField autoComplete='on' label="Expiration date" name='cardExpiration' value={cardExpiration} onChange={cardExpirationChangeHandler} inputProps={{'placeholder':'MM/YY','className':'focus:ring-[0px]'}} fullWidth={true} className='basis-2/3'/>
                            <TextField autoComplete='on' label="CVC" name='CVC' value={cvc} onChange={cvcChangeHandler} inputProps={{'placeholder':'CVC', 'className':'focus:ring-[0px]'}} fullWidth={true} className='basis-1/3'/>
                        </ThemeProvider>
                    </div>
                    
                </div>
                <div name='address' className='w-full text-light-text rounded-3xl py-4 px-2'>
                    <p className='text-2xl my-2'>Shipping address</p>
                    <ThemeProvider theme={themeTextfield}>
                        <TextField autoComplete='on' label="Address" name='address' value={address} onChange={addressChangeHandler} fullWidth={true} inputProps={{'className':'focus:ring-[0px]'}}/>
                    </ThemeProvider>
                    <div className='flex'>
                        <ThemeProvider theme={themeTextfield}>                                
                            <TextField autoComplete='on' label="City" name='city' value={city} onChange={cityChangeHandler} fullWidth={true} className='basis-1/3' inputProps={{'className':'focus:ring-[0px]'}}/>
                            <TextField autoComplete='on' label="Country/State" name='country/state' value={country} onChange={countryChangeHandler} fullWidth={true} className='basis-1/3' inputProps={{'className':'focus:ring-[0px]'}}/>
                            <TextField autoComplete='on' label="Postal code" name='postalCode' value={postalCode} onChange={postalChangeHandler} fullWidth={true} className='basis-1/3' inputProps={{'className':'focus:ring-[0px]'}}/>
                        </ThemeProvider>
                    </div>    
                </div>
            </div>
            <div className='flex justify-between w-full py-4'>
               <div></div>
                <ThemeProvider theme={themeButton}>
                    <Button onClick={submitOrderHandler} variant="contained" >Submit Order</Button>
                </ThemeProvider>
            </div>
        </div>
        <div id='orderSummery' className='basis-1/2 h-full p-4 z-10'>
           <p className='text-2xl my-4'>Order summery</p>
            <div ref={productsListDiv} className='max-h-80 overflow-auto my-4 custom-scrollbar rounded-3xl bg-black/5 backdrop-blur-sm'>
               
                {
                    products?products.map(product=>{
                        subTotalAll=subTotalAll+product.subTotal;
                        console.log(subTotalAll);
                        return<><CartCard product={product} setChange={setChange} change={change}/><Divider/></>
                    }):null
                }
            </div>
            <div className='my-4'>
                <div name='subTotal' className='flex justify-between'>
                    <p>SubTotal</p>
                    <p>Rs.{subTotalAll}</p>
                </div>
                <div name='shipping/deliveryCost' className='flex justify-between'>
                    <p>Shipping</p>
                    <p>Rs.{shippingCost}</p>
                </div>
                <div name='taxes' className='flex justify-between'>
                    <p>Taxes</p>
                    <p>Rs.{taxes}</p>
                </div>
            </div>
            <Divider/>
            <div name='total' className='flex justify-between my-4'>
                    <p>Total</p>
                    <p>Rs.{shippingCost+subTotalAll+taxes}</p>
            </div>
        </div>
    </div>
}
export default Checkout;