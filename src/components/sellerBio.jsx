import axios from 'axios';
import {useState, useEffect, useRef, useCallback} from 'react';
import React from 'react';
import { Button, TextField, IconButton, Rating } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, lime, purple } from '@mui/material/colors';
import placeHolderImage from '../images/steamMount.jpg';
import EditModal from './imageEditModal';
import PasswordChangeModal from './sellerPasswordChange';


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

function SellerBio(){
    const pfpRef=useRef(null);
    const [dataChange, setDataChange]=useState(false);
    const [pfpLink,setPfpLink]=useState(null);
    const [open, setOpen] = useState(false);
    const [brandName, setBrandName]=useState('');
    const [email, setEmail]=useState('');
    const [location, setLocation]=useState('');
    const [bio, setBio]=useState('');
    const [sellerRating, setSellerRating]=useState(1);
    const [type,setType]=useState('seller');
    const [passwordModalOpen,setPasswordModalOpen]=useState(false);
    const handlePasswordModalOpen=()=>setPasswordModalOpen(true);
    const handleOpen = () => setOpen(true);
    const getSellerData=async ()=>{
        const sellerToken=await JSON.parse(localStorage.getItem('seller')).sellerToken;
        axios.defaults.headers.get['Authorization'] = `Bearer ${sellerToken}`;
        const response=await axios.get(`${process.env.REACT_APP_backHost}api/v1/seller/getSellerData`);
        console.log(response.data);
        const link=`${process.env.REACT_APP_backHost}api/v1/images?imageID=${response.data.sellerPfpImageID}`;
        if(link!=pfpLink){
//            console.log(link);
//            console.log(pfpLink);
            setPfpLink(link);
        }
        setBio(response.data.bio);
        setBrandName(response.data.brandName);
        setEmail(response.data.email);
        setLocation(response.data.location);
        setSellerRating(response.data.rating);
        setType(response.data.type);
        
    }
    const UpdateSellerData=async ()=>{
        if(dataChange){
            const sellerToken=await JSON.parse(localStorage.getItem('seller')).sellerToken;
            axios.defaults.headers.patch['Authorization'] = `Bearer ${sellerToken}`;
            const response=await axios.patch(`${process.env.REACT_APP_backHost}api/v1/seller/updateSellerData`,{brandName,email,location,bio});
            console.log(response.data);
            setDataChange(false);
        }
    }
    useEffect(()=>{
        getSellerData();
    },[pfpLink]);
    const brandNameChangeHandler=(event)=>{
        setBrandName(event.currentTarget.value);
        setDataChange(true);
    }
    const emailChangeHandler=(event)=>{
        setEmail(event.currentTarget.value);
        setDataChange(true);
    }
    const locationChangeHandler=(event)=>{
        setLocation(event.currentTarget.value);
        setDataChange(true);
    }
    const bioChangeHandler=(event)=>{
        setBio(event.currentTarget.value);
        setDataChange(true);
    }


    return (<div className='w-full flex'>
            <div className='w-1/2 pr-2'>
                <div className='w-1/4 aspect-square m-8' onClick={handleOpen}>
                   {
                        pfpLink?<img className='rounded-full w-full aspect-square' src={pfpLink}></img>:<img className='rounded-full w-full aspect-square' src={placeHolderImage}></img>
                    }
                </div>
                <ThemeProvider theme={theme}>
                    <TextField label="Brand name" variant="filled" name='brandName' value={brandName} onChange={brandNameChangeHandler} color='primary' className='w-full' ></TextField>
                    <TextField label="Email" variant="filled" name='email' value={email} onChange={emailChangeHandler} color='primary' className='w-full' ></TextField>
                    <TextField label="Address" variant="filled" name='location' value={location} onChange={locationChangeHandler} color='primary' className='w-full' ></TextField>
                    <TextField label="Seller bio" variant="filled" name='bio' value={bio} onChange={bioChangeHandler} color='primary' className='w-full' ></TextField> 
                </ThemeProvider>
                
            </div>
            <div className='w-1/2 pl-2'>
                <div className='w-1/4 aspect-square m-8'></div>
                <ThemeProvider theme={theme}>
                    <Rating name="read-only" value={sellerRating} readOnly />
                    <TextField label="Type" variant="filled" name='type' value={type} color='primary' className='w-full' slotProps={{input: {readOnly: true}}}></TextField>
                    {
                        dataChange?<Button onClick={UpdateSellerData}>Update</Button>:<Button disabled>Update</Button>
                    }
                    <Button onClick={handlePasswordModalOpen}>Change password</Button>
                </ThemeProvider> 
            </div>

            {
                pfpLink?<EditModal open={open} setOpen={setOpen} pfpLink={pfpLink} setPfpLink={setPfpLink}/>:<div></div>
            }
            <PasswordChangeModal setPasswordModalOpen={setPasswordModalOpen} passwordModalOpen={passwordModalOpen}></PasswordChangeModal>

    </div>
    );
}

export default SellerBio;
