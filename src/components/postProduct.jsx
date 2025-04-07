import axios from 'axios';
import {useState, useEffect} from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, lime, purple } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';



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

function PostProduct(){
    const [quantities, setQuantities]=useState([]);
    const [images, setImages]=useState([]);
    const [title, setTitle]=useState('');
    const [price, setPrice]=useState('');
    const [category, setCategory]=useState('');
    const [color, setColor]=useState('');
    const [size, setSize]=useState('');
    const [quantity, setQuantity]=useState('');
    const [miniDescription, setMiniDescription]=useState('');
    const [description, setDescription]=useState('');
    const [quality, setQuality]=useState('');
    const titleChangeHandler=(event)=>{
        setTitle(event.currentTarget.value);
    }
    const priceChangeHandler=(event)=>{
        if(isNaN(event.currentTarget.value)){
            return;
        }
        setPrice(event.currentTarget.value);
    }
    const categoryChangeHandler=(event)=>{
        setCategory(event.currentTarget.value);
    }
    const colorChangeHandler=(event)=>{
        setColor(event.currentTarget.value);
    }
    const sizeChangeHandler=(event)=>{
        setSize(event.currentTarget.value);
    }
    const quantityChangeHandler=(event)=>{
        if(isNaN(event.currentTarget.value)){
            return;
        }
        setQuantity(event.currentTarget.value);
    }
    const miniDescriptionChangeHandler=(event)=>{
        setMiniDescription(event.currentTarget.value);
    }
    const descriptionChangeHandler=(event)=>{
        setDescription(event.currentTarget.value);
    }
    const fileChangeHandler=(event)=>{
        const files=event.target.files;
        const imgs=[];
        for(let i=0;i<files.length;i++){
            const reader= new FileReader();
            reader.onload=(e)=>{
                imgs.push(e.target.result);
                console.log(i,'loop');
                if(imgs.length==files.length){
                    console.log('in', i, 'loop lenghts are equal')
                    setImages(imgs);
                }
            }
            reader.readAsDataURL(files[i]);
        }
        
    }
    const submitHandler=async ()=>{
        const prod={
            title,
            price,
            category,
            miniDescription,
            description,
            quality,
            quantities:quantities,
        }
        const jsonProd=JSON.stringify(prod);
        console.log(jsonProd);
        const prodBlob=new Blob([jsonProd],{type: "application/json"});
        const formData=new FormData();
        const files = document.getElementById('imageInput').files;
        for (let i = 0; i < files.length; i++) {
            formData.append('productImage', files[i]);
        }
        formData.append('prodBlob', prodBlob, 'prodBlob.json');
        console.log(formData);
        const response= await axios.patch(`${process.env.REACT_APP_backHost}api/v1/products/withImage`, formData, {
            headers:{
                'Content-Type':'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('key')||null}`
            }
        }).catch(err=>console.log(err));
        console.log(response);
    }
    const quantityAddHandler=()=>{
        const matchingDetails=quantities.find(qt=>{
            if(qt.attributesPair.color==color && qt.attributesPair.size==size){
                return true;
            }else{
                return false;
            }
        });
        if(matchingDetails){
            const oldVal=Number(matchingDetails.qty);
            const newVal=Number(quantity);
            matchingDetails.qty=oldVal+newVal+'';
        }else{
            quantities.push({
                qty:quantity,
                attributesPair:{
                    color,
                    size,
                }
            });
        }
        setQuantities([...quantities]);
    }
    const quantityRemoveHandler=(event)=>{
        console.log(event.currentTarget.attributes.indx.value);
        quantities.splice(parseInt(event.currentTarget.attributes.indx.value),1)
        setQuantities([...quantities]);
        
    }
    useEffect(()=>{
        document.getElementById('qtyShowBox').style.height=getComputedStyle(document.getElementById('qtyInputBox')).height;
        if(document.getElementById('imgSwiperContainer')){
            document.getElementById('imgSwiper').style.width=getComputedStyle(document.getElementById('imgSwiperContainer')).width;
        }
        
    });
    return <>
            <div className='flex'>
                 <div className='w-1/2 flex items-center justify-center'>
                    <div className='w-4/5 bg-black/20 rounded-lg overflow-hidden'>
                       {
                            images.length==0?<div className='rounded-lg w-full aspect-square'/>:<div id='imgSwiperContainer' className='w-full aspect-square flex items-center justify-center'>
                                <Swiper navigation={true} modules={[Navigation]} className='w-0' id='imgSwiper'>
                                {
                                  images.map((image,i)=>{
                                      console.log(images);
                                           return <SwiperSlide><img src={image} key={i} className='w-full h-full'/></SwiperSlide>
                                       })
                                  }
                                  </Swiper>
                            </div>
                        }
                       
                        
                         <input type='file' id='imageInput' name='productImage' onChange={fileChangeHandler} multiple/>
                    </div>
                 </div>
                 <div className='w-1/2'>
                     <ThemeProvider theme={theme}>
                      <TextField label="Title" variant="filled" name='title' value={title} onChange={titleChangeHandler} color='primary' className='w-full' ></TextField>
                      <div className='flex w-full'>
                          <TextField label="Price" variant="filled" name='price' value={price} onChange={priceChangeHandler} color='primary' className='w-1/2' ></TextField>
                          <TextField label="Category" variant="filled" name='category' value={category} onChange={categoryChangeHandler} color='primary' className='w-1/2' ></TextField>
                      </div>
                      <div className='w-full flex'>
                          <div id='qtyInputBox' className='basis-1/2'>
                              <TextField label="Color" variant="filled" name='color' value={color} onChange={colorChangeHandler} color='primary' className='w-full' ></TextField>
                              <TextField label="Size" variant="filled" name='size' value={size} onChange={sizeChangeHandler} color='primary' className='w-full' ></TextField>
                              <TextField label="Quantity" variant="filled" name='quantity' value={quantity} onChange={quantityChangeHandler} color='primary' className='w-full' ></TextField>
                              <Button onClick={quantityAddHandler} variant="contained">add</Button>
                          </div>
                          <div id='qtyShowBox' className='basis-1/2 h-full bg-white/20'>
                              {
                                  quantities.map((qty,index)=>{
                                      return<div className='flex px-2 w-full justify-between'>
                                      <p className='text-center pt-2'>{qty.attributesPair.size} {qty.attributesPair.color} {qty.qty}</p>
                                      <IconButton indx={index} onClick={quantityRemoveHandler}>
                                          <DeleteIcon/>
                                      </IconButton>
                                      
                                      </div>
                                  })
                              }
                          </div>
                      </div>
                      <TextField label="MiniDescription" variant="filled" name='miniDescription' value={miniDescription} onChange={miniDescriptionChangeHandler} color='primary' className='w-full' ></TextField>
                      <TextField label="Description" variant="filled" name='description' value={description} onChange={descriptionChangeHandler} color='primary' className='w-full' multiline maxRows={3}></TextField>
                      <Button onClick={submitHandler} variant="contained">Submit</Button>
                     </ThemeProvider>
                    </div>

                </div>
    </>
}

export default PostProduct;
