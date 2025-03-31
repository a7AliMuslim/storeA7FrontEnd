import React from 'react';
import {useState, memo, useCallback} from 'react';
import { TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import axios from 'axios';
import {cartStore} from '../../features/cart/cartStore';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isCreditCard from 'validator/lib/isCreditCard';
import FloatingLabelInput from '../customInput';


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
        const [email,setEmail]=useState('');
        const [emailError,setEmailError]=useState(false);
        const [telephone,setTelephone]=useState('');
        const [telephoneError,setTelephoneError]=useState(false);
        const [cardNumber,setCardNumber]=useState('');
        const [cardNumberError,setCardNumberError]=useState(false);
        const [cardExpiration,setCardExpiration]=useState('');
        const [cardExpirationError,setCardExpirationError]=useState(false);
        const [cardExpirationMonth,setCardExpirationMonth]=useState(null);
        const [cardExpirationYear,setCardExpirationYear]=useState(null);
        const [cvc, setCvc]=useState(null);
        const [address, setAddress]=useState(null);
        const [city, setCity]=useState(null);
        const [country, setCountry]=useState(null);
        const [postalCode, setPostalCode]=useState(null);
        

        const validateEmailLocal=useCallback((val=null)=>{
            const tempEmail=val?val:email;
            if(isEmail(tempEmail) ||tempEmail===''){
                setEmailError(false);
                return true;
            }
            setEmailError(true);
            return false;
        },[email]);

        const emailHandler=useCallback((event)=>{
            setEmail(event.target.value);
            if(event.target.value===''){
                setEmailError(false);
                return;
            }
            if(emailError){
                validateEmailLocal(event.target.value);
            }
        },[emailError,validateEmailLocal]);

        const validateTelephoneLocal=useCallback((val=null)=>{
            const tempTelephone=val?val:telephone;
            if(isMobilePhone(tempTelephone) ||tempTelephone===''){
                setTelephoneError(false);
                return true;
            }
            setTelephoneError(true);
            return false;
          },[telephone]);
      
        const telephoneHandler=useCallback((event)=>{
            setTelephone(event.target.value);
            if(event.target.value===''){
                setTelephoneError(false);
                return;
            }
            if(telephoneError){
                validateTelephoneLocal(event.target.value);
            }
        },[telephoneError,validateTelephoneLocal]);

        const validateCardNumberLocal=useCallback((val=null)=>{
            const tempCardNumber=val?val:cardNumber;
            if(isCreditCard(tempCardNumber) ||tempCardNumber===''){
                setCardNumberError(false);
                return true;
            }
            setCardNumberError(true);
            return false;
          },[cardNumber]);
      
        const cardNumberHandler=useCallback((event)=>{
            const value = event.target.value
            setCardNumber(value);
            if(value===''){
                setCardNumberError(false);
                return;
            }
            if(cardNumberError){
                validateCardNumberLocal(value);
            }
        },[cardNumberError,validateCardNumberLocal]);


        const validateCardExpirationLocal=useCallback((val=null)=>{
            console.log(val==='');
            const tempCardExpiration=val?val:cardExpiration;
            console.log(tempCardExpiration);
            if(tempCardExpiration===''){
                setCardExpirationError(false);
                return true;
            }
            const [month,year] = tempCardExpiration.split('/').map(part=>parseFloat(part));
            if(!month || !year) return;
            const currentYear = new Date().getFullYear() % 100; 
            const currentMonth = new Date().getMonth() + 1;
            console.log('month',month,'year',year,'currentMonth',currentMonth,'currentYear',currentYear);
            if(month>12){
                console.log('month>12');
                setCardExpirationError(true);
                return false;
            } 
            if(year<currentYear){
                console.log('year<currentYear');
                setCardExpirationError(true);
                return false;
            }
            if(year===currentYear&&month<currentMonth){
                console.log('year===currentYear&&month<currentMonth');
                setCardExpirationError(true);
                return false; 
            }
            
            setCardExpirationError(false);
            return true;
          },[cardExpiration]);
      
        const cardExpirationHandler=useCallback((event)=>{
            let value = event.target.value.replace(/\D/g, ""); 
            if (value.length > 4) return; 
            if (value.length > 2) {
                value = value.slice(0, 2) + "/" + value.slice(2);
            }
    
            setCardExpiration(value);
            if(value===''){
                setCardExpirationError(false);
                return;
            }
            if(cardExpirationError){
                validateCardExpirationLocal(value);
            }
        },[cardExpirationError,validateCardExpirationLocal]);
        
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

                    <FloatingLabelInput autoComplete='on' status={emailError?'error':'primary'} label='Email' name='email' value={email} onChange={emailHandler} onBlur={validateEmailLocal} type='email' className='!w-1/2'/>
    
                    <FloatingLabelInput autoComplete='on' status={telephoneError?'error':'primary'} label='Ph. number' name='telephone' value={telephone} onChange={telephoneHandler} onBlur={validateTelephoneLocal} type='tel' className='!w-1/2'/>

                </div>
                <div name='paymentDetails' className='w-full text-light-text px-2 flex flex-col gap-2'>
                    <p className='text-2xl'>Payment details</p>
                    <ThemeProvider theme={themeTextfield}>
                        <FloatingLabelInput autoComplete='on' status={cardNumberError?'error':'primary'} label='Card No.' name='cardnumber' value={cardNumber} onChange={cardNumberHandler} onBlur={validateCardNumberLocal} placeholder='12345...' className='!w-full'/>

                    </ThemeProvider>
                    <div className='flex'>
                        <ThemeProvider theme={themeTextfield}>
                            <FloatingLabelInput autoComplete='on' status={cardExpirationError?'error':'primary'} label='Expiration date' name='cardExpiration' value={cardExpiration} onChange={cardExpirationHandler} onBlur={validateCardExpirationLocal} placeholder='MM/YY' className='!w-2/3'/>


                            
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