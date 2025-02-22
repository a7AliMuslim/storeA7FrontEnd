import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import {useUserContext} from '../components/userContext.jsx';
import {useNavigate} from 'react-router-dom';

function Login(){
    const [userName,setUserName]=useState(null);
    const [password,setPassword]=useState(null);
    const userObj=useUserContext();
    const navigate=useNavigate();
    const userNameHandler=(event)=>{
        setUserName(event.target.value);
    };
    const passwordHandler=(event)=>{
        setPassword(event.target.value);
    };
    const loginHandler=async ()=>{
        try{
            const response=await axios.post('http://localhost:3002/api/v1/auth/login',{password,email:userName});
            localStorage.setItem('key',response.data.token);
            userObj.login(response.data.user);
            navigate('/');
        }catch(err){
            console.log(err);
        }
        
    }
    return <div>
        <label for='userName'>User name</label>
        <input type='text' name='userName' id='userName' placeHolder='User name' value={userName} onChange={userNameHandler}></input>
        <label for='password'>User name</label>
        <input type='password' name='password' id='password' placeHolder='password' value={password} onChange={passwordHandler}></input>
        <button onClick={loginHandler}>login</button>
    </div>
}
export default Login;