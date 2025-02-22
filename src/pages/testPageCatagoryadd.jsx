import React from 'react';
import axios from 'axios';
import HoverTab from '../components/hoverTab';
import { Button, TextField, Menu, MenuItem } from '@mui/material';




export default function CatagoryAdd(){
    const [catagory, setCatagory]=React.useState('');
    const [parentCatagory, setparentCatagory]=React.useState('');
    const catagoryChangeHandler=(event)=>{
        setCatagory(event.currentTarget.value);
    };
    const parentCatagoryChangeHandler=(event)=>{
        setparentCatagory(event.currentTarget.value);
    };
    const submit=async ()=>{
        const sellerToken=await JSON.parse(localStorage.getItem('seller')).sellerToken;
        axios.defaults.headers.patch['Authorization'] = `Bearer ${sellerToken}`;
        const response= await axios.patch('http://localhost:3002/api/v1/products/addCatagories',{catagoryName:catagory, parentCatagory}).catch(err=>console.log(err));
        console.log(response);
    }
    const submitHandler=()=>{
        if(catagory==''){
            return
        }
        submit()
    }
    
    

    
    return<>
        <TextField label="catagory" variant="filled" name='catagory' value={catagory} onChange={catagoryChangeHandler} className='w-full' ></TextField>
        <TextField label="parentCatagory" variant="filled" name='parentCatagory' value={parentCatagory} onChange={parentCatagoryChangeHandler} className='w-full' ></TextField>
        <Button onClick={submitHandler}>submit</Button>
    
        <HoverTab/>
    </>
}
