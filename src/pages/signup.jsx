import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { TextField, Button, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, indigo, red } from '@mui/material/colors';
import LoadingIcon from '../components/arrowPath.jsx';
import PasswordValidator from "password-validator";
import FloatingLabelInput from '../components/customInput.jsx';

const errorIcon=<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='size-4'>
  <path strokeLinecap="round" strokeLineJoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
</svg>

const schema = new PasswordValidator();
schema
  .is().min(9)    // Minimum length 8
  .is().max(20)   // Maximum length 20
  .has().uppercase()  // Must have uppercase letters
  .has().lowercase()  // Must have lowercase letters
  .has().digits(1)    // Must have at least 1 digit
  .has().symbols()    // Must have at least 1 symbol
  .has().not().spaces()  // No spaces allowed
  .is().not().oneOf(["123456789", "password"]); // Blacklist common passwords


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


function Signup(){
    const [userName,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [buttonDisabled,setButtonDisabled]=useState(true);
    const [userValidated,setUserValidated]=useState(false);
    const [userNameError,setUserNameError]=useState(false);
    const [currentTimerId,setCurrentTimerId]=useState(null);
    const [showLoadingArrow,setShowLoadingArrow]=useState(false);
    const [controller,setController]=useState(new AbortController());
    const [emailError,setEmailError]=useState(false);
    const [passwordError,setPasswordError]=useState(false);
    
    let tempController=null
    const navigate=useNavigate();
    
    const userNameHandler=(event)=>{
        setUserName(event.target.value);
        if(event.target.value.length>2){
            controller.abort();
            tempController=new AbortController();
            console.log('setting timeout');
            setShowLoadingArrow(true);
            setController(tempController);
            setCurrentTimerId(setTimeout(()=>validateUser(event.target.value),0));
        }
    };
    const emailHandler=(event)=>{
        setEmail(event.target.value);
        setEmailError(false);
    };
    const passwordHandler=(event)=>{
        setPassword(event.target.value);
    };
    const loginHandler=()=>{
        navigate('/login');
    }
    const signupHandler=async ()=>{
        try{
            const response=await axios.post(`${process.env.REACT_APP_backHost}api/v1/auth/signup`,{
                userName,
                email,
                password
            });
            navigate('/login');
        }catch(err){
            console.log(err);
        }
        
    }
    const validateUser=async (uName='')=>{
        
        try{
            const response=await axios.post(`${process.env.REACT_APP_backHost}api/v1/auth/validate`,{
                userName:uName,
            }, {
                signal:tempController.signal
            });
            setShowLoadingArrow(false);
            if(response.status===200){
                setUserValidated(true);
                setUserNameError('primary');
                console.log('valid');
            }
        }catch(err){
            if(err.message==='canceled'){
                return
            }
            setShowLoadingArrow(false);
            if(err.response){
                if(err.response.status===409){
                    setUserValidated(false);
                    setUserNameError('warning');
                    console.log('invalid');
                }
                
            }else{
                console.log(err);
            }
        }
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
        console.log('passwrd valid: ',schema.validate(password));
        if(schema.validate(password)){
            setPasswordError(false);
            return;
        }
        setPasswordError(true);
    }
    
    useEffect(()=>{
        
        
        if(emailError||passwordError||userValidated===false||email===''||password===''){
            setButtonDisabled(true);
        }else{
            setButtonDisabled(false);
        }
    },[email,emailError,password,passwordError,userValidated,userName,userNameError,controller,showLoadingArrow,currentTimerId])
    return <div id='signupContainer' className='w-full flex-grow flex  items-center justify-center'>
        <div className='relative rounded-tl-[4rem] rounded-br-[4rem] w-[45%] aspect-video grid-lines-dark-gradient  flex  items-center justify-center'>
            <div className='w-[90%] aspect-video flex flex-col justify-center items-center'>
                <ThemeProvider theme={themeTextfield}>
                        <div className='w-[80%] my-8'>
                            <FloatingLabelInput autoComplete='on' status={userNameError?'error':'primary'} label={<span className='flex items-center gap-1'>User Name {userNameError?errorIcon:null}</span>} name='userName' value={userName} onChange={userNameHandler} type='text' adornament={showLoadingArrow?<LoadingIcon className='size-5'/>:<LoadingIcon className='size-5 hidden'/>} className='!w-full'/>


                            
                        </div>
                        <div className='w-[80%] mb-8'>
                            <TextField autoComplete='on' color={emailError?'warning':'primary'} label="Email" name='email' value={email} onChange={emailHandler} onBlur={validateEmailLocal} inputProps={{'type':'email', 'className':'focus:ring-[0px]'}} className='w-full' focused={emailError?true:false}></TextField>
                        </div>
                        <div className='w-[80%] mb-8'>
                            <TextField autoComplete='on' color={passwordError?'warning':'primary'} label="Password" name='password' value={password} onChange={passwordHandler} onBlur={validatePasswordLocal} inputProps={{'type':'password', 'className':'focus:ring-[0px]'}} className='w-full' focused={passwordError?true:false}></TextField>
                        </div>
                </ThemeProvider>
                <ThemeProvider theme={themeButton}>
                        <div className='w-[80%] mb-8 flex justify-between'>
                            <div></div>
                            <div>
                                <Button className='!mr-2' disabled={buttonDisabled} onClick={signupHandler} variant="contained" >Sign up</Button>
                                <Button onClick={loginHandler} variant="outlined" >login</Button>
                            </div>
                            
                        </div>
                </ThemeProvider>
            </div>
        </div>
    </div>
}
export default Signup;