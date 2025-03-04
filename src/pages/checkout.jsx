import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useUserContext} from '../components/userContext.jsx';
import {Navigate, useLocation} from 'react-router-dom';
import {cartStore} from '../features/cart/cartStore.jsx';
import { TextField, Button, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, lime, purple } from '@mui/material/colors';
import CartCard from '../components/cartCard';
axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('key')}`;

const theme = createTheme({
  palette: {
    primary: {
        main:grey[200],
        light:grey[100],
        dark:grey[400],
        contrastText: grey[800],
    },
    info:{
        main:grey[200],
    },
    
  },
});
function Checkout(){
    //const products=useSelector((state)=>state.Checkout.products);
    //const Checkout=useSelector((state)=>state.Checkout);
    
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
    useEffect(()=>{
        document.getElementById('orderSummery').style.height=getComputedStyle(document.getElementById('deliveryDetails')).height;
    });
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

    return <div className='w-full flex'>
        <div id='deliveryDetails' className='basis-1/2 h-full p-4'>
            <div name='contactInfo' className='w-full py-4'>
                <p className='text-2xl my-2'>Contact Information</p>
                <ThemeProvider theme={theme}>
                    <TextField autoComplete='on' label="Email" variant="filled" name='email' value={email} onChange={emailChangeHandler} color='primary' className='w-1/2' ></TextField>
                    <TextField autoComplete='on' label="Ph. number" variant="filled" name='tel' value={telephone} onChange={telephoneChangeHandler} inputProps={{'type':'tel'}} className='w-1/2'></TextField>
                </ThemeProvider>
            </div>
            <div name='paymentDetails' className='w-full py-4'>
                <p className='text-2xl my-2'>Payment details</p>
                <ThemeProvider theme={theme}>
                    <TextField autoComplete='on' label="Card No." variant="filled" name='paymentCard' value={cardNumber} onChange={cardNumberChangeHandler} inputProps={{'placeholder':'XXXX-XXXX-XXXX-XXXX'}} fullWidth={true}></TextField>
                </ThemeProvider>
                <div className='flex'>
                    <ThemeProvider theme={theme}>
                        <TextField autoComplete='on' label="Expiration date" variant="filled" name='cardExpiration' value={cardExpiration} onChange={cardExpirationChangeHandler} inputProps={{'placeholder':'MM/YY'}} fullWidth={true} className='basis-2/3'></TextField>
                        <TextField autoComplete='on' label="CVC" variant="filled" name='CVC' value={cvc} onChange={cvcChangeHandler} inputProps={{'placeholder':'CVC'}} fullWidth={true} className='basis-1/3'></TextField>
                    </ThemeProvider>
                </div>
            </div>
            <div name='address' className='w-full py-4'>
                 <p className='text-2xl my-2'>Shipping address</p>
                <ThemeProvider theme={theme}>
                    <TextField autoComplete='on' label="Address" variant="filled" name='address' value={address} onChange={addressChangeHandler} fullWidth={true}></TextField>
                </ThemeProvider>
                <div className='flex'>
                    <ThemeProvider theme={theme}>
                        <TextField autoComplete='on' label="City" variant="filled" name='city' value={city} onChange={cityChangeHandler} fullWidth={true} className='basis-1/3'></TextField>
                        <TextField autoComplete='on' label="Country/State" variant="filled" name='country/state' value={country} onChange={countryChangeHandler} fullWidth={true} className='basis-1/3'></TextField>
                        <TextField autoComplete='on' label="Postal code" variant="filled" name='postalCode' value={postalCode} onChange={postalChangeHandler} fullWidth={true} className='basis-1/3'></TextField>
                    </ThemeProvider>
                </div>
            </div>
            <div className='flex justify-between w-full py-4'>
               <div></div>
                <ThemeProvider theme={theme}>
                    <Button onClick={submitOrderHandler} variant="contained" >Submit Order</Button>
                </ThemeProvider>
            </div>
        </div>
        <div id='orderSummery' className='basis-1/2 bg-black/10 rounded-tr-[8em] h-full p-4'>
           <p className='text-2xl my-4'>Order summery</p>
            <div className='h-2/3 overflow-auto my-4'>
               
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