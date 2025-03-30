import React from 'react';
import axios from 'axios';
import {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoadingIcon from '../components/arrowPath.jsx';
import FloatingLabelInput from '../components/customInput.jsx';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import Dust from '../components/animations/dust.jsx';


const errorIcon=<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='size-4'>
  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
</svg>


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
        }else{
            setUserNameError(false);
        }
    };
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
        const passGood=isStrongPassword(pass, {
            minLength: 9,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
          }) && !["123456789", "password"].includes(pass)

        if(passGood ||pass===''){
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


    const loginHandler=()=>{
        navigate('/login');
    }
    const signupHandler=async ()=>{
        try{
            if(email===''){
                setEmailError(true);
                throw new Error('email invalid');
            }
            if(password===''){
                setPasswordError(true);
                throw new Error('password inavalid');
            }
            if(userName===''){
                setUserNameError(true);
                throw new Error('userName inavalid');
            }
            await axios.post(`${process.env.REACT_APP_backHost}api/v1/auth/signup`,{
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
                setUserNameError(false);
            }
        }catch(err){
            if(err.message==='canceled'){
                return
            }
            setShowLoadingArrow(false);
            if(err.response){
                if(err.response.status===409){
                    setUserValidated(false);
                    setUserNameError(true);
                }
                
            }else{
                console.log(err);
            }
        }
    }

    useEffect(()=>{
        if(emailError||passwordError||!userValidated){
            setButtonDisabled(true);
        }else{
            setButtonDisabled(false);
        }
    },[emailError,passwordError,userValidated])
    return <div id='signupContainer' className='w-full flex-grow flex  items-center justify-center'>
        <div className='relative rounded-tl-[4rem] rounded-br-[4rem] w-[45%] aspect-video grid-lines-dark-gradient  flex  items-center justify-center'>
            <Dust dustCount={20}/>
            <div className='w-[90%] aspect-video flex flex-col justify-center items-center'>
                <div className='w-[80%] my-8'>
                    <FloatingLabelInput autoComplete='on' status={userNameError?'error':'primary'} label={<span className='flex items-center gap-1'>User Name {userNameError?errorIcon:null}</span>} name='userName' value={userName} onChange={userNameHandler} type='text' adornament={showLoadingArrow?<LoadingIcon className='size-5'/>:<LoadingIcon className='size-5 hidden'/>} className='!w-full'/>
                </div>
                <div className='w-[80%] mb-8'>
                    <FloatingLabelInput autoComplete='on' status={emailError?'error':'primary'} label='Email' name='email' value={email} onChange={emailHandler} onBlur={validateEmailLocal} type='email' className='!w-full'/>
                </div>
                <div className='w-[80%] mb-8'>
                    <FloatingLabelInput status={passwordError?'error':'primary'} label='Password' name='password' value={password} onChange={passwordHandler} onBlur={validatePasswordLocal} type='password' className='!w-full'/>            
                </div>
                
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