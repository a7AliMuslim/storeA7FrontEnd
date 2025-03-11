import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useUserContext} from '../components/userContext.jsx';
import {useNavigate} from 'react-router-dom';
import { TextField, Button, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, indigo } from '@mui/material/colors';

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
            const response=await axios.post('http://localhost:3002/api/v1/auth/login',{password,email});
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
        if(email==''||password.length<9){
            setButtonDisabled(true);
        }else{
            setButtonDisabled(false);
        }
    })
    
    return <div id='loginContainer' className='w-full h-full flex  items-center justify-center'>
        <div className='bg-white rounded-3xl w-[45%] aspect-video drop-shadow-2xl flex  items-center justify-center'>
            <div className='bg-white w-[90%] aspect-video flex flex-col justify-center items-center'>
                <ThemeProvider theme={themeTextfield}>
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