import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import {useUserContext} from '../components/userContext.jsx';
import {useNavigate} from 'react-router-dom';

function Signup(){
    const [userName,setUserName]=useState(null);
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const userObj=useUserContext();
    const navigate=useNavigate();
    const userNameHandler=(event)=>{
        setUserName(event.target.value);
    };
    const emailHandler=(event)=>{
        setEmail(event.target.value);
    };
    const passwordHandler=(event)=>{
        setPassword(event.target.value);
    };
    const signupHandler=async ()=>{
        try{
            const response=await axios.post('http://localhost:3002/api/v1/auth/signup',{
                name:userName,
                email,
                password
            });
            console.log(response.data);
            localStorage.setItem('key',response.data.token);
            userObj.user=userName;
            navigate('/');
        }catch(err){
            console.log(err);
        }
        
    }
    return <div>
        <label for='userName'>User name</label>
        <input type='text' name='userName' id='userName' placeHolder='User name' value={userName} onChange={userNameHandler}></input>
        <label for='email'>User name</label>
        <input type='email' name='email' id='email' placeHolder='Email' value={email} onChange={emailHandler}></input>
        <label for='password'>User name</label>
        <input type='password' name='password' id='password' placeHolder='password' value={password} onChange={passwordHandler}></input>
        <button onClick={signupHandler}>signup</button>
    </div>
}
export default Signup;