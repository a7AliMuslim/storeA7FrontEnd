import PlaceHolderImage from './svgs/loading.jsx';
import {useState, useEffect, useRef, memo} from 'react';
import fetchImageBlob from '../features/cloudStorage/imageFetch.js';


function ImageCard({
    img=null,
    className='w-48',
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
    className='hover:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden rounded-md touch:w-40 '+className;
    return<div onClick={onClick} className={className}>
        {
            imageFetched?<img ref={imgRef} src={imageSrc} className='w-full aspect-square'/>:<PlaceHolderImage className='w-full aspect-square'/>
        }
    </div>
}

export default memo(ImageCard);