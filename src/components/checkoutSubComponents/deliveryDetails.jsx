import React from 'react';
import {useState, memo} from 'react';
import { TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import axios from 'axios';
import {cartStore} from '../../features/cart/cartStore';


axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('key')}`;
const themeTextfield = createTheme({
    palette: {
      primary: {
          main:'#F2F2F2',
          light:'#F2F2F2',
          dark:'#F2F2F2',
          contrastText: grey[100],
      },
      warning:{
          main:red[800],
          light:grey[200],
          dark:grey[900],
          contrastText: grey[900],
      }
    },
    components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
                "& fieldset": { borderColor: '#FFFFFF38' }, // Idle border color
                "&:hover fieldset": { borderColor: '#F2F2F2 !important' }, // Hover border color
                "& input:-webkit-autofill": {
                    boxShadow: "0 0 0px 1000px transparent inset", // Transparent background
                    "-webkit-text-fill-color": "#F2F2F2", // White text color
                    backgroundColor: "transparent !important",
                    transition: "background-color 5000s ease-in-out 0s !important"
                },
                "& input:-webkit-autofill:focus": {
                    boxShadow: "0 0 0px 1000px transparent inset !important",
                    backgroundColor: "transparent !important",
                    "-webkit-text-fill-color": "#F2F2F2 !important",
                    transition: "background-color 5000s ease-in-out 0s !important"
                },
                "& input:-webkit-autofill:hover": {
                    boxShadow: "0 0 0px 1000px transparent inset !important",
                    backgroundColor: "transparent !important",
                    "-webkit-text-fill-color": "#F2F2F2 !important",
                    transition: "background-color 5000s ease-in-out 0s !important"
                },
                "& input":{
                    color: '#F2F2F2',
                },
                "& input::selection":{
                    color: '#F2F2F2',
                    backgroundColor:'#76B900',
                }
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: "#F2F2F2", // Idle label color
              "&:hover": { color: '#F2F2F2' }, // Hover label color
              //"&.Mui-focused": { color: "green" }, // Focus label color
            },
          },
        },
      },
});

const themeButton=createTheme({
    palette: {
      primary: {
          main:'#76B900',
          light:grey[300],
          dark:'#598D00',
          contrastText: grey[200],
      }
      
    },
});

const DeliveryDetails = ({deliveryTextRef}) => {
        const [email,setEmail]=useState(null);
        const [telephone,setTelephone]=useState(null);
        const [cardNumber,setCardNumber]=useState(null);
        const [cardExpiration,setCardExpiration]=useState(null);
        const [cardExpirationMonth,setCardExpirationMonth]=useState(null);
        const [cardExpirationYear,setCardExpirationYear]=useState(null);
        const [cvc, setCvc]=useState(null);
        const [address, setAddress]=useState(null);
        const [city, setCity]=useState(null);
        const [country, setCountry]=useState(null);
        const [postalCode, setPostalCode]=useState(null);
        console.log('re-render ddetails')

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
            if(val===0){
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
                    const products=cartStore.getState().cart.products;
                    const response=await axios.post('http://localhost:3002/api/v1/orders/post',{products});
                    console.log(response.data);
                }catch(err){
                    console.log(err);
                }
            }
            submit();
        }
  return (
        <>
            <div ref={deliveryTextRef} className='w-full flex flex-col gap-4 rounded-3xl bg-black/5 backdrop-blur-sm'>
                <div name='contactInfo' className='w-full text-light-text pt-4 px-2'>
                    <p className='text-2xl my-2'>CONTACT INFORMATION</p>
                    <ThemeProvider theme={themeTextfield}>
                        <TextField autoComplete='on' label="Email" name='email' value={email} onChange={emailChangeHandler} color='primary' className='w-1/2' inputProps={{'type':'email', 'className':'focus:ring-[0px]'}}/>

                        <TextField autoComplete='on' label="Ph. number" name='tel' value={telephone} onChange={telephoneChangeHandler} inputProps={{'type':'tel', 'className':'focus:ring-[0px]'}} className='w-1/2' />
                    </ThemeProvider>
                </div>
                <div name='paymentDetails' className='w-full text-light-text px-2 flex flex-col gap-2'>
                    <p className='text-2xl'>Payment details</p>
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
                <div name='address' className='w-full text-light-text rounded-3xl pb-4 px-2 flex flex-col gap-2'>
                    <p className='text-2xl'>Shipping address</p>
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
        </>
  )
}

export default memo(DeliveryDetails);