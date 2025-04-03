import React from 'react';
import {useState, memo, useCallback, useEffect} from 'react';
import { Modal, Box, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {cartStore} from '../../features/cart/cartStore';
import {removeAll} from '../../features/cart/cartSlice';
import {useDispatch} from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isCreditCard from 'validator/lib/isCreditCard';
import FloatingLabelInput from '../customInput';
// import {useUserContext} from '../userContext';
import { motion, AnimatePresence } from "framer-motion";
import {shootingStarsAnimation,starryNightAnimation} from '../animations/meteorShower';



const themeButton=createTheme({
    palette: {
      primary: {
          main:'#76B900',
          light:'#F0F0F0',
          dark:'#2C2A34',
          contrastText: '#F0F0F0',
      },
      
    },
});

const DeliveryDetails = ({deliveryTextRef, renderToggle, setRenderToggle}) => {
        const [email,setEmail]=useState('');
        const [emailError,setEmailError]=useState(false);
        const [telephone,setTelephone]=useState('');
        const [telephoneError,setTelephoneError]=useState(false);
        const [cardNumber,setCardNumber]=useState('');
        const [cardNumberError,setCardNumberError]=useState(false);
        const [cardExpiration,setCardExpiration]=useState('');
        const [cardExpirationError,setCardExpirationError]=useState(false);
        const [cvc, setCvc]=useState('');
        const [cvcError, setCvcError]=useState(false);
        const [address, setAddress]=useState('');
        const [addressError, setAddressError]=useState(false);
        const [city, setCity]=useState('');
        const [cityError, setCityError]=useState(false);
        const [country, setCountry]=useState('');
        const [countryError, setCountryError]=useState(false);
        const [postalCode, setPostalCode]=useState('');
        const [postalCodeError, setPostalCodeError]=useState(false);
        const [submitButtonDisabled, setSubmitButtonDisabled]=useState(false);
        const [requestError,setRequestError]=useState(null);
        // const userObj=useUserContext();
        const dispatch=useDispatch();
        const [resetInputs, setResetInputs]=useState(false);
        

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
            if(month>12){
                setCardExpirationError(true);
                return false;
            } 
            if(year<currentYear){
                setCardExpirationError(true);
                return false;
            }
            if(year===currentYear&&month<currentMonth){
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
        
        const cvcHandler=(event)=>{
            const value = event.target.value.replace(/\D/g, "");
            if(value.length>4) return;
            setCvc(value);
            setCvcError(false);
        }

        const addressHandler=(event)=>{
            setAddress(event.target.value);
            setAddressError(false);
        }

        const cityHandler=(event)=>{
            setCity(event.target.value);
            setCityError(false);
        }

        const countryHandler=(event)=>{
            setCountry(event.target.value);
            setCountryError(false);
        }

        const postalCodeHandler=(event)=>{
            setPostalCode(event.target.value);
            setPostalCodeError(false);
        }
        const submitOrderHandler=()=>{
            let anyEmpty=false;
            if(email===''){
                setEmailError(true);
                anyEmpty=true;
            }
            if(telephone===''){
                setTelephoneError(true);
                anyEmpty=true;
            }
            if(cardNumber===''){
                setCardNumberError(true);
                anyEmpty=true;
            }
            if(cardExpiration===''){
                setCardExpirationError(true);
                anyEmpty=true;
            }
            if(cvc===''){
                setCvcError(true);
                anyEmpty=true;
            }
            if(address===''){
                setAddressError(true);
                anyEmpty=true;
            }
            if(city===''){
                setCityError(true);
                anyEmpty=true;
            }
            if(country===''){
                setCountryError(true);
                anyEmpty=true;
            }
            if(postalCode===''){
                setPostalCodeError(true);
                anyEmpty=true;
            }
            if(anyEmpty){
                return;
            }
            const customerInfo={
                email,
                telephone,
                cardNumber,
                cardExpiration,
                cvc,
                address,
                city,
                country,
                postalCode
            }
            const submit=async ()=>{
                try{
                    const products=cartStore.getState().cart.products;
                    const response=await axios.post(`${process.env.REACT_APP_backHost}api/v1/orders/post`,{products,customerInfo},{
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem('key')||null}`
                        }
                      });
                    if(response.data.token){
                        localStorage.setItem('key',response.data.token);
                        // userObj.login(response.data.user);
                    }
                    if(shootingStarsAnimation){
                        shootingStarsAnimation.pause();
                    }
                    if(starryNightAnimation){
                        starryNightAnimation.pause();
                    }
                    setRequestError({err:false});
                    setEmail('');
                    setTelephone('');
                    setCardNumber('');
                    setCardExpiration('');
                    setCvc('');
                    setAddress('');
                    setCity('');
                    setCountry('');
                    setPostalCode('');
                    setResetInputs(true);
                    products.forEach(prod=>dispatch(removeAll(prod)));
                    setRenderToggle(!renderToggle);
                }catch(err){
                    if(shootingStarsAnimation){
                        shootingStarsAnimation.pause();
                    }
                    if(starryNightAnimation){
                        starryNightAnimation.pause();
                    }
                    setRequestError({err});
                }
            }
            submit();
        }

        const handleModalClose = () =>{
            setRequestError(null);
            if(shootingStarsAnimation){
                shootingStarsAnimation.play();
            }
            if(starryNightAnimation){
                starryNightAnimation.play();
            }
        }
             

        useEffect(()=>{
            if(emailError||telephoneError||cardNumberError||cardExpirationError||cvcError||addressError||cityError||countryError||postalCodeError){
                setSubmitButtonDisabled(true);
                return;
            }
            setSubmitButtonDisabled(false);
        },[emailError,telephoneError,cardNumberError,cardExpirationError,cvcError,addressError,cityError,countryError,postalCodeError]);

        useEffect(()=>{
            if(resetInputs){
                setResetInputs(false);
            } 
        },[resetInputs]);
  return (
        <>
            <div ref={deliveryTextRef} className='w-full flex flex-col gap-4 rounded-3xl bg-black/5 backdrop-blur-sm'>
                <div name='contactInfo' className='w-full text-light-text pt-4 px-2'>
                    <p className='text-2xl my-2'>CONTACT INFORMATION</p>

                    <FloatingLabelInput endFocus={resetInputs} autoComplete='on' status={emailError?'error':'primary'} label='Email' name='email' value={email} onChange={emailHandler} onBlur={validateEmailLocal} type='email' className='!w-1/2'/>
    
                    <FloatingLabelInput endFocus={resetInputs} autoComplete='on' status={telephoneError?'error':'primary'} label='Ph. number' name='telephone' value={telephone} onChange={telephoneHandler} onBlur={validateTelephoneLocal} type='tel' className='!w-1/2'/>

                </div>
                <div name='paymentDetails' className='w-full text-light-text px-2 flex flex-col gap-2'>
                    <p className='text-2xl'>Payment details</p>
                    <FloatingLabelInput endFocus={resetInputs} autoComplete='on' status={cardNumberError?'error':'primary'} label='Card No.' name='cardnumber' value={cardNumber} onChange={cardNumberHandler} onBlur={validateCardNumberLocal} placeholder='12345...' className='!w-full'/>                    
                    <div className='flex'>
                        <FloatingLabelInput endFocus={resetInputs} autoComplete='on' status={cardExpirationError?'error':'primary'} label='Expiration date' name='cardExpiration' value={cardExpiration} onChange={cardExpirationHandler} onBlur={validateCardExpirationLocal} placeholder='MM/YY' className='!w-2/3'/>
                        <FloatingLabelInput endFocus={resetInputs} autoComplete='on' status={cvcError?'error':'primary'} label='CVC' name='cvc' value={cvc} onChange={cvcHandler} placeholder='123...' className='!w-1/3'/>
                    </div>   
                </div>
                <div name='address' className='w-full text-light-text rounded-3xl pb-4 px-2 flex flex-col gap-2'>
                    <p className='text-2xl'>Shipping address</p>
                    <FloatingLabelInput endFocus={resetInputs} autoComplete='on' status={addressError?'error':'primary'} label='Address' name='address' value={address} onChange={addressHandler} className='!w-full'/>
                    <div className='flex'>
                        <FloatingLabelInput endFocus={resetInputs} autoComplete='on' status={cityError?'error':'primary'} label='City' name='city' value={city} onChange={cityHandler} className='!w-1/3'/>
                        <FloatingLabelInput endFocus={resetInputs} autoComplete='on' status={countryError?'error':'primary'} label='Country/State' name='country' value={country} onChange={countryHandler} className='!w-1/3'/>
                        <FloatingLabelInput endFocus={resetInputs} autoComplete='on' status={postalCodeError?'error':'primary'} label='Postal code' name='postalCode' value={postalCode} onChange={postalCodeHandler} className='!w-1/3'/>
                    </div>    
                </div>
            </div>
            <div className='flex justify-between w-full py-4'>
               <div></div>
                <ThemeProvider theme={themeButton}>
                    <Button onClick={submitOrderHandler} variant="contained" disabled={submitButtonDisabled}>Submit Order</Button>
                </ThemeProvider>
            </div>
            {<AnimatePresence>
                {
                    Boolean(requestError)&&
                    <Modal open={Boolean(requestError)} onClose={handleModalClose}>
                        <Box
                            component={motion.div}
                            initial={{x:"-50%", y:"-50%", opacity: 0, scale: 0.8 }}
                            animate={{x:"-50%", y:"-50%", opacity: 1, scale: 1 }}
                            exit={{x:"-40%", y:"-40%", opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed top-1/2 left-1/2 black-diamond-gradient shadow-lg p-8 rounded-tr-[3rem] rounded-bl-[3rem] w-72 text-center"
                            
                        >
                            <Typography className={requestError.err?'text-red-400':'text-nvidia-green'} variant="h6" gutterBottom>
                                {
                                    requestError.err?'Order Failed':'Order Placed'
                                }
                            </Typography>
                            
                            <ThemeProvider theme={themeButton}>
                                <Button onClick={handleModalClose} variant="contained" sx={{ mt: 2 }}>
                                    OK
                                </Button>
                            </ThemeProvider>
                        </Box>
                    </Modal>
                }
                
            </AnimatePresence>}
        </>
  )
}

export default memo(DeliveryDetails);