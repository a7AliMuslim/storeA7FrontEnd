import React from 'react';
import {useState, useEffect} from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import axios from 'axios';
import { Skeleton, Rating, Button  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import {add} from '../features/cart/cartSlice.jsx';
import {useSelector, useDispatch} from 'react-redux';
import {cartStore} from '../features/cart/cartStore.jsx';
import ImageCard from '../components/imageCard.jsx';

axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('key')}`
function SingleProduct(){
    const location=useLocation();
    const state=location.state;
    const [product, setProduct]=useState(state.product);
    const remainingColorLenght=9-product.colors.length;
    const [mainImage,setMainImage]=useState(product.imageIDs[0]);
    const [smallImages, setSmallImages]=useState(product.imageIDs);
    const [isLoading, setIsLoading]=useState(true);
    const [selectedColorBlob, setSelectedColorBlob]=useState(null);
    const [selectedSize, setSelectedSize]=useState(null);
    const [sizes, setSizes]=useState(product.quantities.map(qt=>{
            return '!'+qt.attributesPair.size;
        }));
    const dispatch=useDispatch();
    
    console.log(product);
    const colorChangeHandler=(event)=>{
        if(selectedColorBlob){
            selectedColorBlob.classList.remove('ring-2');
            selectedColorBlob.classList.remove('ring-black');
        }
        console.dir(selectedColorBlob);
        event.currentTarget.classList.add('ring-2');
        event.currentTarget.classList.add('ring-black');
        setSizes(product.quantities.map(qt=>{
            if(qt.attributesPair.color==event.currentTarget.attributes.name.value && qt.qty!='0'){
                return qt.attributesPair.size;
            }
            return '!'+qt.attributesPair.size;
        }))
        setSelectedColorBlob(event.currentTarget);
    }
    const sizeChangeHandler=(event)=>{
        if(selectedSize){
            selectedSize.classList.remove('!bg-black/50');
            selectedSize.classList.remove('!text-white');
        }
        console.dir(selectedSize);
        event.currentTarget.classList.add('!bg-black/50');
        event.currentTarget.classList.add('!text-white');
        setSelectedSize(event.currentTarget);
    }
    const imageChangeHandler=(event)=>{
        setMainImage(event.currentTarget.attributes.imageid.value)
    }
    const addToCartHandler=()=>{
        if(!selectedColorBlob){
            alert('please select color');
            return;
        }
        if(!selectedSize){
            alert('please select size');
            return;
        }
        product.chosenColor=selectedColorBlob.attributes.name.value;
        product.chosenSize=selectedSize.attributes.name.value;
        const matchingDetails=product.quantities.find(qt=>{
            if(qt.attributesPair.color==product.chosenColor && qt.attributesPair.size==product.chosenSize){
                return true;
            }else{
                return false;
            }
        });
        if(matchingDetails.qty=='0'){
            alert('no product of this combination');
            return;
        }
        const stateBefore=[...(cartStore.getState().cart.products)];
        dispatch(add(product));
        const stateAfter=[...(cartStore.getState().cart.products)];
        console.log('stateBefore');
        console.log(stateBefore);
        console.log('stateAfter');
        console.log(stateAfter);
    };
    const fetchExtendedProductData=async ()=>{
        setSmallImages(product.imageIDs);
        setIsLoading(false);
    }
    useEffect(()=>{
        fetchExtendedProductData();
    },[]);
    return <div className='flex bg-big-multi-gradient animate-bg-pan-left flex-grow'>
            <div className='flex-auto w-1/2 pt-2'>
              
                   {
                        isLoading?<Skeleton className='bg-white/50' variant="rounded"><img src={'no'} className='w-full aspect-square'></img> </Skeleton>:<div className='w-full flex justify-center items-center'><ImageCard img={mainImage} className='rounded-md w-[75%] aspect-square'/></div>
                    }
                
                <div className='flex justify-center gap-2 mt-3'>
                    {
                        isLoading?Array.from({length:4},()=><Skeleton className='m-2 bg-white/50' variant="rounded"><div className='w-1 aspect-square'/> </Skeleton>):smallImages.map((imageID)=><ImageCard img={imageID} imageid={imageID} onClick={imageChangeHandler} className='w-[10%] flex-initial aspect-square rounded hover:scale-110 transition-all duration-300'></ImageCard>)
                    }
                </div>
            </div>
            <div className='flex-auto w-1/2 p-8'>
                <h1 className='text-5xl capitalize text-light-text'>{product.title}</h1>
                <p className='text-red-500 my-2 text-2xl'>{`Rs.${product.price}`}</p>
                <Rating
                  name="product-rating"
                  value={product.rating}
                  readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <p className='line-clamp-4 text-justify my-8 text-light-text h-28'>{product.description}</p>
                <div name='color' className='w-full my-2 text-light-text'>
                    <p>Color</p>
                    <div name='colorblob' className='flex justify-between'>
                       {
                            product.quantities.length>0?product.quantities.map(quantity=>{
                                if(quantity.attributesPair.color=='black'){
                                    return <div onClick={colorChangeHandler} name='black' className='bg-gray-800 cursor-pointer rounded-full hover:opacity-90 w-[6%] flex-initial aspect-square'/>
                                }else if(quantity.attributesPair.color=='white'){
                                    return <div onClick={colorChangeHandler} name='white' className='bg-white cursor-pointer rounded-full hover:opacity-90 w-[6%] flex-initial aspect-square'/>
                                }else if(quantity.attributesPair.color=='blue'){
                                    return <div onClick={colorChangeHandler} name='blue' className='bg-blue-800 cursor-pointer rounded-full hover:opacity-90 w-[6%] flex-initial aspect-square'/>
                                }else if(quantity.attributesPair.color=='gray'){
                                    return <div onClick={colorChangeHandler} name='gray' className='bg-gray-300 cursor-pointer rounded-full hover:opacity-90 w-[6%] flex-initial aspect-square'/>
                                }else{
                                    return <div onClick={colorChangeHandler} name='no' className='bg-gray-300 cursor-pointer rounded-full hover:opacity-90 w-[6%] flex-initial aspect-square'/>
                                }
                            }):null
                        }
                        {
                            Array.from({length:remainingColorLenght},()=><div className=' rounded-full opacity-0 w-[6%] flex-initial aspect-square'/>)
                        }
                       
                        
                        
                    </div>
                </div>
                <div name='sizes' className='w-full my-2 text-light-text'>
                    <p>Sizes</p>
                    <div name='sizesblob' className='flex flex-wrap justify-center'>
                       {
                            sizes?sizes.map((size)=>{
                                if(size.startsWith('!')){
                                    return (<div name={size} className='bg-white/50 m-1 align-middle rounded-md opacity-40 grow min-w-14 h-10 uppercase flex justify-center items-center'><span>{size.replace('!','')}</span></div>)
                                }else{
                                    return (<div onClick={sizeChangeHandler} name={size} className='bg-white/50 m-1 align-middle rounded-md hover:opacity-90 grow min-w-14 h-10 uppercase flex justify-center items-center cursor-pointer'><span>{size}</span></div>)
                                } 
                            }):null
                        }
                    </div>
                </div>
                <div name='button-container' className='flex justify-center items-center mt-10'>
                    <Button onClick={addToCartHandler} variant="contained" className='w-1/2 h-10'><span>Add to cart</span>< ShoppingCartIcon className='size-5 mx-2' /></Button>
                </div>
            </div>
        </div>
}
export default SingleProduct;