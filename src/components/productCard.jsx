import PlaceHolderImage from './svgs/loading.jsx';
import {useState, useEffect, useRef, memo} from 'react';
import fetchImageBlob from '../features/cloudStorage/imageFetch.js';


function ProductCard({
    img=null,
    title='Product',
    price=0,
    className='w-48',
    productId=0,
    onClick
}){
    const [imageFetched, setImageFetched]=useState(false);
    const [imageSrc, setImageSrc]=useState('');
    const imgRef=useRef(null);
    useEffect(()=>{
        if(!img){
            return;
        }
        if(imgRef){
            const fetchImg=async () =>{
                try{
                    setImageSrc(await fetchImageBlob(img));
                    setImageFetched(true);
                }catch(err){
                    console.log(err);
                }
                
            }
            fetchImg();
        }
    },[img])
    className='flex flex-col flex-none hover:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden rounded-md bg-nvidia-green m-2 h-fit touch:m-[0px] touch:w-40 '+className;
    return<div onClick={onClick} className={className} productid={productId}>
        {
            imageFetched?<img ref={imgRef} src={imageSrc} className='flex-auto w-full aspect-square'/>:<PlaceHolderImage className='flex-auto w-full aspect-square'/>
        }
        <p className='text-light-text m-2 line-clamp-2 h-12'>{title}</p>
        <p className='text-light-text m-2'>{`Rs.${price}`}</p>
    </div>
}

export default memo(ProductCard);