import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, indigo, red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import {useUserContext} from '../components/userContext.jsx';



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
        main:'#608BC1',
        light:grey[300],
        dark:indigo[500],
        contrastText: grey[100],
    }
    
  },
});
function BecomeSeller(){
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [registerDialogOpen, setRegisterDialogOpen]=useState(false);
    const [userKey, setUserKey]=useState(localStorage.getItem('key')||null);
    const [emailError, setEmailError]=useState(false);
    const [passwordError, setPasswordError]=useState(false);
    const userObj=useUserContext();
    
    
    const emailChangeHandler=(event)=>{
        setEmailError(false);
        setEmail(event.currentTarget.value);
    }
    const passwordChangeHandler=(event)=>{
        setPasswordError(false);
        setPassword(event.currentTarget.value);
    }
    const registerDialogHandler=()=>{
        setRegisterDialogOpen(!registerDialogOpen);
    }
    const validateEmailLocal=()=>{
        const emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log('email valid: ',emailRegex.test(email));
        if(emailRegex.test(email)){
            setEmailError(false);
            return;
        }
        setEmailError(true);
    }
    const validatePasswordLocal=()=>{
        if(password.length>8){
            setPasswordError(false);
            return;
        }
        setPasswordError(true);
    }
    
    const navigate=useNavigate();
    
    
    const registerHandler=async ()=>{
        try{
            const response =await axios.post(`${process.env.REACT_APP_backHost}api/v1/seller/register`, null,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('key')||null}`
                      }
                }
            );
            userObj.login(response.data.seller);
            localStorage.setItem('key',response.data.sellerToken);
            navigate('/seller');
        }catch(err){
            console.log(err);
        }
        
    }
    const loginHandler=async ()=>{
        if(!userKey||email===''||password===''||emailError||passwordError){
            return;
        }
        try{
            const response=await axios.post(`${process.env.REACT_APP_backHost}api/v1/seller/login`,{email,password},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('key')||null}`
                      }
                }
            )
            userObj.login(response.data.seller);
            localStorage.setItem('key',response.data.sellerToken);
            navigate('/seller');
        }catch(err){
            console.log(err);
        }
        
    }
    useEffect(()=>{
        const appContainerHeight=parseInt(getComputedStyle(document.getElementById('app')).height);
        const header1Height=parseInt(getComputedStyle(document.getElementById('header1')).height);
        const header2Height=parseInt(getComputedStyle(document.getElementById('header2')).height);
        document.getElementById('becomeSellerContainer').style.height=appContainerHeight-header1Height-header2Height+'px'
    });
    
    return <>
           <div id='becomeSellerContainer' className='w-full h-full flex items-center justify-center'>
               <div className='bg-white rounded-3xl w-[45%] aspect-video drop-shadow-2xl flex  items-center justify-center'>
                    <div className='bg-white w-[90%] aspect-video flex flex-col justify-center items-center'>
                       <ThemeProvider theme={themeTextfield}>
                            <div className='w-[80%] my-8'>
                                <TextField autoComplete='on' label="Email" name='email' color={emailError?'warning':'primary'} value={email} onChange={emailChangeHandler} onBlur={validateEmailLocal} fullWidth={true} inputProps={{type:'text', className:'focus:ring-[0px]'}} focused={emailError?true:false}></TextField>
                            </div>
                            <div className='w-[80%] mb-8'>
                                <TextField autoComplete='on' label="password" name='password' color={passwordError?'warning':'primary'} value={password} onChange={passwordChangeHandler} onBlur={validatePasswordLocal}  fullWidth={true} inputProps={{type:'password', className:'focus:ring-[0px]'}} focused={passwordError?true:false}></TextField>
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={themeButton}>
                            <div className='w-[80%] mb-8 flex justify-between'>
                                <div></div>
                                <div>
                                    <Button onClick={loginHandler} variant="contained" className='!mr-2'>login</Button>
                                    <Button onClick={registerDialogHandler} variant="outlined" className='' >Register</Button>
                                </div>
                            </div>
                        </ThemeProvider>
                   </div>
               </div>
           </div>
           <Dialog
            open={registerDialogOpen}
            onClose={registerDialogHandler}
          >
            <DialogTitle id="alert-dialog-title">
              {"Notice:"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               {
                      userKey?'Your password and login for seller account is same as your regular account. You can change that later':'You must first signup with regular account. Would you like to signup?'
                  }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
             {
                    userKey?<><Button onClick={registerHandler}>Register</Button><Button onClick={registerDialogHandler}>Dismiss</Button></>:<><Button onClick={()=>navigate('/signup')}>Yes</Button><Button onClick={registerDialogHandler}>Dismiss</Button></>
                }
            </DialogActions>
          </Dialog>
        </>
}
export default BecomeSeller;

//price:type.number(),
//    category:type.string(),
//    type:type.string(),
//    quantity:type.number(),
//    imageID:type.array().default([]),
//    description:type.string(),
//    miniDescription:type.string(),
//    description:type.string(),
//    colors:type.array().default([]),
//    quality:type.string(),
//    rating:type.number().max(5),
//    reviews:type.string(),
//    title:type.string().required().min(3).max(50),
//    id:type.string(),
//    numOfSales:type.number(),
//    sizes:type.array().default([]),