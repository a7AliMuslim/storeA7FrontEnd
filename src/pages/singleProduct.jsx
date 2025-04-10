import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { Skeleton, Rating, Button  } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import {add} from '../features/cart/cartSlice.jsx';
import {useDispatch} from 'react-redux';
import {cartStore} from '../features/cart/cartStore.jsx';
import ImageCard from '../components/imageCard.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const themeButton = createTheme({
  palette: {
    primary: {
        main:'#76B900',
        light:'#F0F0F0',
        dark:'#2C2A34',
        contrastText: '#F0F0F0',
    },
  },
});

let lastCanvasBlobCall=1;
const parseBorderRadius = (radius) => {
    return radius.split(" ").map((val) => parseFloat(val) || 0);
};


function SingleProduct(){
    const location=useLocation();
    const state=location.state;
    const navigate=useNavigate();
    const [product, setProduct]=useState(state?state.product:null);
    const remainingColorLenght=product?9-product.colors.length:0;
    const [mainImage,setMainImage]=useState(product?product.imageIDs[0]:null);
    const [smallImages, setSmallImages]=useState(product?product.imageIDs:null);
    const [isLoading, setIsLoading]=useState(true);
    const [selectedColorBlob, setSelectedColorBlob]=useState(null);
    const [selectedSize, setSelectedSize]=useState(null);
    const [masksPositionWithoutMouse, setMasksPositionWithoutMouse]=useState('');
    const contentRef=useRef(null);
    const maskRef=useRef(null);
    const canvasRef = useRef(null);
    const prodContainer = useRef(null);
    const cartRef = useRef(null);
    const [sizes, setSizes]=useState(product?product.quantities.map(qt=>{
            return '!'+qt.attributesPair.size;
        }):null);
    const dispatch=useDispatch();
    
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
        if(cartRef){
            cartRef.current.classList.remove('animate-[pulse_1s_ease-out_3]');
            console.log(cartRef.current.classList);
            setTimeout(()=>{
                cartRef.current.classList.add('animate-[pulse_1s_ease-out_3]');
                console.log(cartRef.current.classList);   
            },0);
            
            
        }
        //console.log('stateBefore');
        //console.log(stateBefore);
        //console.log('stateAfter');
        //console.log(stateAfter);
    };
    const cartOpenHandler=()=>{
        document.getElementById('cart-icon').click();
    }
    
    
    const mouseMaskHandler=(event)=>{
        if(masksPositionWithoutMouse.length>0 && prodContainer){
            const {clientX, clientY}=event;
            const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
            maskRef.current.style.maskPosition=masksPositionWithoutMouse+`, ${clientX+window.scrollX-(remInPixels*2)+'px'} ${clientY+window.scrollY-(remInPixels*2)+'px'}`
        }
    }
    const mouseLeaveMaskHandler=(event)=>{
        maskRef.current.style.maskImage=maskRef.current.style.maskImage.replace(', radial-gradient(circle, black 0%, black 70%, rgba(0, 0, 0, 0) 100%)','');
    }
    const mouseEnterMaskHandler=(event)=>{
        if(maskRef.current.style.maskImage.includes(', radial-gradient(circle, black 0%, black 70%, rgba(0, 0, 0, 0) 100%)')){
            return;
        }
        maskRef.current.style.maskImage=maskRef.current.style.maskImage+', radial-gradient(circle, black 0%, black 70%, rgba(0, 0, 0, 0) 100%)';
    }
    
    
    const fetchExtendedProductData=()=>{
        setSmallImages(product.imageIDs);
        setIsLoading(false);
    }
    useEffect(()=>{
        if(product){
            fetchExtendedProductData();
        }
        
    },[product]);
    const applyMask=()=>{
        if (!contentRef.current) return;

        
        const sourceDiv = contentRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Get div dimensions


        // Get computed styles
        const computedStyle = window.getComputedStyle(sourceDiv);
        const borderRadius = computedStyle.borderRadius;
        const rect = sourceDiv.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const yScroll=window.scrollY;
        const top = rect.top +yScroll +'px';
        const left = rect.left +'px';
        const position=`0px 0px, ${left} ${top}`;
        const size=`100% 100%, ${width+'px'} ${height+'px'}, 4rem 4rem`;

        // Set canvas size to match div
        canvas.width = width;
        canvas.height = height;

        // Parse border radius
        const radiusValues = parseBorderRadius(borderRadius, width, height);
        //console.log(radiusValues)

        // Draw rounded rectangle mask
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, radiusValues);
        ctx.fill();


        const currentCanvasBlobCall=lastCanvasBlobCall;
        lastCanvasBlobCall=lastCanvasBlobCall+1
        // Convert canvas to Blob
        canvas.toBlob((blob) => {
            if (blob && currentCanvasBlobCall===(lastCanvasBlobCall-1)) {
                document.getElementById('app').removeAttribute('style');
                lastCanvasBlobCall=1
                const objectURL = URL.createObjectURL(blob);
                maskRef.current.style.maskImage= `linear-gradient(black, black) ,url(${objectURL}), radial-gradient(circle, black 0%, black 70%, rgba(0, 0, 0, 0) 100%)`;
                maskRef.current.style.maskPosition=position+', 150% 150%';
                maskRef.current.style.maskSize=size;
                setMasksPositionWithoutMouse(position);
                maskRef.current.style.height=getComputedStyle(document.getElementById('app')).height;
                document.getElementById('app').style.height=getComputedStyle(document.getElementById('app')).height;

          }
        }, "image/png");
    }
    useEffect(() => {
        if(!product){
            navigate('/products')
            return;
        } 
        const timeOutId=setTimeout(()=>{
            maskRef.current.classList.remove('hidden');
            maskRef.current.classList.add('mask','grid-blocks-custom','animate-slide-in-appear');
            prodContainer.current.classList.remove('animate-bg-pan-left');
            prodContainer.current.classList.add('animate-bg-breath-right-left');
            applyMask();
            window.addEventListener("resize", applyMask);
        },6000);
        

        return () =>{
            window.removeEventListener("resize", applyMask);
            clearTimeout(timeOutId);
            document.getElementById('app').removeAttribute('style');
        } 
        
  },[]);
  const isTouch=window.matchMedia('(hover:none) and (pointer:coarse)').matches
    return <>
    {product?<div ref={prodContainer}  {...(!isTouch && { onMouseMove: mouseMaskHandler })} onMouseLeave={mouseLeaveMaskHandler} onMouseEnter={mouseEnterMaskHandler} className='flex bg-big-multi-gradient animate-bg-pan-left flex-grow touch:flex-col'>
            <canvas ref={canvasRef} className="hidden" />
            <div ref={maskRef}  className="w-full h-full absolute hidden inset-0 z-0"/>
            <div className='flex-auto w-1/2 pt-2 z-10 touch:w-full'>
              
                   {
                        isLoading?<Skeleton className='bg-white/50' variant="rounded"><img src={'no'} alt='oops' className='w-full aspect-square'></img> </Skeleton>:<div className='w-full flex justify-center items-center'><ImageCard img={mainImage} className='rounded-tl-[8rem] rounded-br-[8rem] w-[75%] aspect-square touch:rounded-tl-[3rem] touch:rounded-br-[3rem] ' applyDynamicShadow={true}/></div>
                    }
                
                <div className='flex justify-center gap-2 mt-3'>
                    {
                        isLoading?Array.from({length:4},()=><Skeleton className='m-2 bg-white/50' variant="rounded"><div className='w-1 aspect-square'/> </Skeleton>):smallImages.map((imageID)=><ImageCard img={imageID} imageid={imageID} onClick={imageChangeHandler} className='w-[10%] flex-initial aspect-square rounded hover:scale-110 transition-all duration-300'></ImageCard>)
                    }
                </div>
            </div>
            <div ref={contentRef} className='flex-auto w-1/2 p-8 z-10 touch:w-full'>
                <h1 className='text-5xl capitalize text-light-text'>{product.title}</h1>
                <p className='text-red-500 my-2 text-2xl'>{`Rs.${product.price}`}</p>
                <Rating
                  name="product-rating"
                  value={product.rating}
                  readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <p className='line-clamp-34 text-justify my-4 text-light-text min-h-15 '>{product.description}</p>
                <div name='color' className='w-full mb-2 mt-12 text-light-text'>
                    <p>Color</p>
                    <div name='colorblob' className='flex justify-between'>
                       {
                            product.quantities.length>0?product.quantities.map(quantity=>{
                                if(quantity.attributesPair.color=='black'){
                                    return <div onClick={colorChangeHandler} name='black' className='bg-gray-800 cursor-pointer rounded-full hover:opacity-90 w-[6%] flex-initial aspect-square touch:w-[14%]'/>
                                }else if(quantity.attributesPair.color=='white'){
                                    return <div onClick={colorChangeHandler} name='white' className='bg-white cursor-pointer rounded-full hover:opacity-90 w-[6%] flex-initial aspect-square touch:w-[14%]'/>
                                }else if(quantity.attributesPair.color=='blue'){
                                    return <div onClick={colorChangeHandler} name='blue' className='bg-blue-800 cursor-pointer rounded-full hover:opacity-90 w-[6%] flex-initial aspect-square touch:w-[14%]'/>
                                }else if(quantity.attributesPair.color=='gray'){
                                    return <div onClick={colorChangeHandler} name='gray' className='bg-gray-300 cursor-pointer rounded-full hover:opacity-90 w-[6%] flex-initial aspect-square touch:w-[14%]'/>
                                }else{
                                    return <div onClick={colorChangeHandler} name='no' className='bg-gray-300 cursor-pointer rounded-full hover:opacity-90 w-[6%] flex-initial aspect-square touch:w-[14%]'/>
                                }
                            }):null
                        }
                        {
                            Array.from({length:remainingColorLenght},()=><div className=' rounded-full opacity-0 w-[6%] flex-initial aspect-square touch:w-[14%]'/>)
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
                <div name='button-container' className='flex flex-col gap-2 justify-center items-center mt-10'>
                    <ThemeProvider theme={themeButton}>
                        <Button onClick={addToCartHandler} variant="contained" className='w-1/3 touch:w-2/3'><span>Add to</span>< ShoppingCartIcon className='size-5 ml-2' /></Button>
                        <p ref={cartRef} className='text-nvidia-green underline underline-offset-4 cursor-pointer animate-[pulse_1s_ease-out_3]' onClick={cartOpenHandler}>Open Cart</p>
                    </ThemeProvider>
                </div>
            </div>
        </div>:null}
        </>
}
export default SingleProduct;