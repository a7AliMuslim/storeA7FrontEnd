import PlaceHolderImage from './svgs/loading.jsx';
import {useState, useEffect, useRef, memo} from 'react';
import fetchImageBlob from '../features/cloudStorage/imageFetch.js';
import { FastAverageColor } from 'fast-average-color';


const fac = new FastAverageColor();
function ImageCard({
    img=null,
    className='',
    onClick,
    imageid='',
    applyDynamicShadow=false,
    dynamicShadowSize='1rem'
}){
    const [imageFetched, setImageFetched]=useState(false);
    const [imageSrc, setImageSrc]=useState('');
    const [error, setError]=useState('');
    const outerDivRef=useRef(null);
    const imgRef=useRef(null);
    useEffect(()=>{
        if(!img){
            return;
        }
        if(imgRef){
            const fetchImg=async () =>{
                try{
                    const imageURL=await fetchImageBlob(img);
                    const shadowColor=await fac.getColorAsync(imageURL);
                    if(outerDivRef && applyDynamicShadow){
                        outerDivRef.current.style.boxShadow=`0px 0px ${dynamicShadowSize} ${shadowColor.hex}`;
                    }
                    setImageSrc(imageURL);
                    setImageFetched(true);
                    setError('');
                }catch(err){
                    console.log(err);
                    setError(' error ');
                }
                
            }
            fetchImg();
        }
    },[img,applyDynamicShadow,dynamicShadowSize]);
    
    
    className=`overflow-hidden ${className}`;
    return<div ref={outerDivRef} onClick={onClick} className={className} imageid={imageid}>
        {
            imageFetched?<img ref={imgRef} alt='oops' src={imageSrc} className={'w-full aspect-square '}/>:<PlaceHolderImage className={'w-full aspect-square '+ error}/>
        }
    </div>
}

export default memo(ImageCard);