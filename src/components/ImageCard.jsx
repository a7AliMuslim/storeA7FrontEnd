import PlaceHolderImage from './svgs/loading.jsx';
import {useState, useEffect, useRef, memo} from 'react';
import fetchImageBlob from '../features/cloudStorage/imageFetch.js';


function ImageCard({
    img=null,
    className='',
    onClick,
    imageid=''
}){
    const [imageFetched, setImageFetched]=useState(false);
    const [imageSrc, setImageSrc]=useState('');
    const [error, setError]=useState('');
    const imgRef=useRef(null);
    console.log(onClick)
    useEffect(()=>{
        if(!img){
            return;
        }
        if(imgRef){
            const fetchImg=async () =>{
                try{
                    setImageSrc(await fetchImageBlob(img));
                    setImageFetched(true);
                    setError('');
                }catch(err){
                    console.log(err);
                    setError('error');
                }
                
            }
            fetchImg();
        }
    },[img])
    className='overflow-hidden rounded-md touch:w-40 '+className;
    return<div onClick={onClick} className={className} imageid={imageid}>
        {
            imageFetched?<img ref={imgRef} src={imageSrc} className='w-full aspect-square'/>:<PlaceHolderImage className={'w-full aspect-square '+ error}/>
        }
    </div>
}

export default memo(ImageCard);