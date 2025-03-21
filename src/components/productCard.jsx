import placeHolderImage from '../images/steamMount.jpg';
import {useState, useEffect, useRef} from 'react';
import fetchImageBlob from '../features/cloudStorage/imageFetch.js'


export default function ProductCard({
    img=placeHolderImage,
    title='Product',
    price=0,
    className='w-48',
    productId=0,
    onClick
}){
    const imgRef=useRef(null);
    useEffect(()=>{
        if(img==placeHolderImage){
            return;
        }
        if(imgRef){
            const imgTag=imgRef.current;
            const fetchImg=async () =>{
                try{
                    imgTag.src=await fetchImageBlob(img);
                }catch(err){
                    console.log(err);
                }
                
            }
            fetchImg();
        }
    },[img])
    className='flex flex-col flex-none hover:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden rounded-md bg-nvidia-green m-2 h-fit touch:m-[0px] touch:w-40 '+className;
    return<div onClick={onClick} className={className} productid={productId}>
        <img ref={imgRef} src={placeHolderImage} className='flex-auto w-full aspect-square'/>
        <p className='text-light-text m-2 line-clamp-2 h-12'>{title}</p>
        <p className='text-light-text m-2'>{`Rs.${price}`}</p>
    </div>
}