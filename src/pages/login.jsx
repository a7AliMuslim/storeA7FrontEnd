import React from 'react';
import axios from 'axios';
import {useState, useEffect, useCallback} from 'react';
import {useUserContext} from '../components/userContext.jsx';
import {useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import FloatingLabelInput from '../components/customInput.jsx';
import isEmail from 'validator/lib/isEmail';
import Dust from '../components/animations/dust.jsx';

const themeTextfieldTouch = createTheme({
  palette: {
    primary: {
        main:'#F3F3E0',
        light:grey[200],
        dark:grey[900],
        contrastText: grey[100],
    },
  },
 components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0)', // transparent background for input
          borderRadius: '8px',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: grey[500], // Border color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: grey[300], // Border color when focused
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#F3F3E0', // Border color
          },
        },
        input: {
          color: '#F0F0F0', // Dark text inside input
        },
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: grey[500], // Change placeholder (label) text color
        },
      },
    },
 }
});

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

function Login(){
    const [email,setEmail]=useState('');
    const [emailError,setEmailError]=useState(false);
    const [password,setPassword]=useState('');
    const [passwordError,setPasswordError]=useState(false);
    const [buttonDisabled,setButtonDisabled]=useState(true);
    const userObj=useUserContext();
    const navigate=useNavigate();

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
        if(emailError){
          validateEmailLocal(event.target.value);
        }
    },[emailError,validateEmailLocal]);

    const validatePasswordLocal=useCallback((val=null)=>{
      const pass=val?val:password;
      if(pass.length>8 ||pass===''){
          setPasswordError(false);
          return true;
      }
      setPasswordError(true);
      return false;
    },[password]);
    const passwordHandler=useCallback((event)=>{
        setPassword(event.target.value);
        if(passwordError){
          validatePasswordLocal(event.target.value);
        }
    },[passwordError,validatePasswordLocal])

    const submitRequest=async ()=>{
      try{
        const response=await axios.post(`${process.env.REACT_APP_backHost}api/v1/auth/login`,{password,email});
        localStorage.setItem('key',response.data.token);
        
        userObj.login(response.data.user);
        navigate('/');
      }catch(err){
        console.log(err);
      }
    }
    const loginHandler=()=>{
      if(!isEmail(email)){
        setEmailError(true);
        return;
      }
      if(password.length<9){
        setPasswordError(true);
        return;
      }
      submitRequest();
    };
    const signupHandler=useCallback(()=>{
        navigate('/signup');
    },[navigate]);
    useEffect(()=>{
        if(emailError || passwordError){
            setButtonDisabled(true);
        }else{
            setButtonDisabled(false);
        }
    },[emailError,passwordError]);
    
    return <div id='loginContainer' className='w-full flex items-center justify-center flex-grow'>
        <div className='relative rounded-tl-[4rem] rounded-br-[4rem] w-[45%] aspect-video flex  items-center justify-center touch:w-[95%] grid-lines-dark-gradient overflow-hidden'>
            <Dust dustCount={20}/>
            <div className='w-[90%] aspect-video flex flex-col justify-center items-center'>  
              <div className='w-[80%] my-8'>
                <FloatingLabelInput autoComplete='on' status={emailError?'error':'primary'} label="Email" name='email' value={email} onChange={emailHandler} onBlur={validateEmailLocal} type='email' className='!w-full'/>
              </div>
              <div className='w-[80%] mb-8'>
                <FloatingLabelInput status={passwordError?'error':'primary'} label="Password" name='password' value={password} onChange={passwordHandler} onBlur={validatePasswordLocal} type='password' className='!w-full'/>
              </div>  
                <ThemeProvider theme={themeButton}>
                        <div className='w-[80%] mb-8 flex justify-between'>
                            <div></div>
                            <div>
                                <Button className='!mr-2' disabled={buttonDisabled} onClick={loginHandler} variant="contained" >Login</Button>
                                <Button onClick={signupHandler} variant="outlined" >Sign up</Button>
                            </div>
                            
                        </div>
                </ThemeProvider>
            </div>
        </div>
    </div>
}
export default Login;