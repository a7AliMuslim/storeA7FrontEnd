import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, lime, purple } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('key')}`
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
function BecomeSeller(){
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [registerDialogOpen, setRegisterDialogOpen]=useState(false);
    const [userKey,setUserKey]=useState(localStorage.getItem('key')||null);
    const emailChangeHandler=(event)=>{
        setEmail(event.currentTarget.value);
    }
    const passwordChangeHandler=(event)=>{
        setPassword(event.currentTarget.value);
    }
    const registerDialogHandler=()=>{
        setRegisterDialogOpen(!registerDialogOpen);
    }
    const navigate=useNavigate();
    const registerHandler=async ()=>{
        axios.defaults.headers.post['Authorization'] = `Bearer ${userKey}`
        const response =await axios.post('http://localhost:3002/api/v1/seller/register').catch(err=>console.log(err));
        console.log(response);
        localStorage.setItem('seller',JSON.stringify(response.data));
        setUserKey(null);
        navigate('/seller');
    }
    const loginHandler=async ()=>{
        axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('key')}`
        const response=await axios.post('http://localhost:3002/api/v1/seller/login',{email,password}).catch(err=>console.log(err));
        console.log(response.data);
        localStorage.setItem('seller',JSON.stringify(response.data));
        localStorage.removeItem('key');
        setUserKey(null);
        navigate('/seller');
    }
    
    return <>
           <div className='w-full h-dvh flex justify-center items-center'>
               <div className='h-1/2 w-1/3 rounded-lg bg-white p-4'>
                   <ThemeProvider theme={theme}>
                        <TextField autoComplete='on' label="Email" variant="filled" name='email' value={email} onChange={emailChangeHandler} color='primary' fullWidth={true} className='!my-4' ></TextField>
                        <TextField autoComplete='on' label="password" variant="filled" name='password' value={password} onChange={passwordChangeHandler} inputProps={{'type':'password'}} fullWidth={true} className='!my-4'></TextField>
                        <div className='flex justify-end'>
                            <Button onClick={registerDialogHandler} variant="contained" className='!mx-2' >Register</Button>
                            <Button onClick={loginHandler} variant="contained" className='!mx-2'>login</Button>
                        </div>
                    </ThemeProvider>
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