import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useUserContext} from '../components/userContext.jsx';
import {useNavigate} from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const themeTextfield = createTheme({
  palette: {
    primary: {
        main:grey[700],
        light:grey[200],
        dark:grey[900],
        contrastText: grey[100],
    },
  },
});

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
    const [password,setPassword]=useState('');
    const [buttonDisabled,setButtonDisabled]=useState(true);
    const userObj=useUserContext();
    const navigate=useNavigate();
    
    const emailHandler=(event)=>{
        setEmail(event.target.value);
    };
    const passwordHandler=(event)=>{
        setPassword(event.target.value);
    };
    const loginHandler=async ()=>{
        try{
            const response=await axios.post(`${process.env.REACT_APP_backHost}api/v1/auth/login`,{password,email});
            localStorage.setItem('key',response.data.token);
            console.log(response.data)
            userObj.login(response.data.user);
            navigate('/');
        }catch(err){
            console.log(err);
        }
        
    }
    const signupHandler=()=>{
        navigate('/signup');
    }
    useEffect(()=>{
        const appContainerHeight=parseInt(getComputedStyle(document.getElementById('app')).height);
        const header1Height=parseInt(getComputedStyle(document.getElementById('header1')).height);
        const header2Height=parseInt(getComputedStyle(document.getElementById('header2')).height);
        document.getElementById('loginContainer').style.height=appContainerHeight-header1Height-header2Height+'px'
        if(email===''||password.length<9){
            setButtonDisabled(true);
        }else{
            setButtonDisabled(false);
        }
    },[email,password])
    
    return <div id='loginContainer' className='w-full h-full flex  items-center justify-center'>
        <div className='bg-white rounded-3xl w-[45%] aspect-video drop-shadow-2xl flex  items-center justify-center touch:w-[95%] grid-lines-dark-gradient'>
            <div className='w-[90%] aspect-video flex flex-col justify-center items-center'>
                <ThemeProvider theme={window.matchMedia('(hover:none) and (pointer:coarse)')?themeTextfieldTouch:themeTextfield}>
                        <div className='w-[80%] my-8'>
                            <TextField autoComplete='on' label="Email" name='email' value={email} onChange={emailHandler} inputProps={{'type':'email', 'className':'focus:ring-[0px]'}} className='w-full'></TextField>
                        </div>
                        <div className='w-[80%] mb-8'>
                            <TextField autoComplete='on' label="Password" name='password' value={password} onChange={passwordHandler} inputProps={{'type':'password', 'className':'focus:ring-[0px]'}} className='w-full'></TextField>
                        </div>
                </ThemeProvider>
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