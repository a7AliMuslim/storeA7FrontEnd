import React from 'react';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {add} from '../features/cart/cartSlice.jsx';
import {useSelector, useDispatch} from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import ProductCard from './productCard';
import { Button, ButtonGroup, Skeleton } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import {useLocation, useNavigate} from 'react-router-dom';





//input:total number of products without slice applied and number of products on single, output: total pages
function getTotalPages(prodCount, productsPerPage){
    return Math.ceil(prodCount/productsPerPage);
}
const parseBorderRadius = (radius) => {
    return radius.split(" ").map((val) => parseFloat(val) || 0);
};
let lastCanvasBlobCall=1;
axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('key')}`;
axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem('key')}`;
function ProductsContainer({filter}){
    const navigate = useNavigate();
    const location=useLocation();
    const [products, setProducts]=useState(null);
    const [pageNumber, setPageNumber]=useState(1);
    const [totalPages, setTotalPages]=useState(0);
    const [masksPositionWithoutMouse, setMasksPositionWithoutMouse]=useState('');
    
    
    
    //for buttons which load slices of product
    const [pageButtonList, setPageButtonList]=useState([]);
    const [filteredProductCount, setFilteredProductCount]=useState(0);
    const [filteredProductSliceRange, setfilteredProductSliceRange]=useState([0,0])
    const dispatch=useDispatch();
    const contentRef=useRef(null);
    const maskRef=useRef(null);
    const canvasRef = useRef(null);
    const prodContainer = useRef(null);
    
    //handlers
    const productPageJump=(event)=>{
        setPageNumber(Number(event.target.attributes.productpage.value));
    }
    const pageIncrease=()=>{
        if(pageNumber==totalPages){
            return;
        }
        setPageNumber(pageNumber+1);
    }
    const pageDecrease=()=>{
        if(pageNumber==1){
            return;
        }
        setPageNumber(pageNumber-1);
    }
    const addToCartHandler=(product)=>{
        dispatch(add(product));
    };
    const cardClickHandler=(event)=>{
        const clickedProduct=products.find(prod=>prod.id==event.currentTarget.attributes.productid.value);
        document.getElementById('app').removeAttribute('style');
        navigate('/singleProduct',{state:{path:location.pathname,product:clickedProduct}});
    }
    const fetchedProductData= async ()=>{
            try{
                const respons=await axios.post(`${process.env.REACT_APP_backHost}api/v1/products`,{filter,pageNumber,});
                setProducts(respons.data.slice);
                setFilteredProductCount(respons.data.count);
                
                const prodRange=respons.data.productRange;
                prodRange[0]=prodRange[0]+1;
                prodRange[1]=prodRange[1]+1;
                
                if(prodRange[1]>respons.data.count){
                    setfilteredProductSliceRange([prodRange[0],respons.data.count]);
                }else{
                    setfilteredProductSliceRange(prodRange);
                }
                let pages=getTotalPages(respons.data.count,16)
                
                
                setTotalPages(pages);
                const list=[]
                if(pages<7){
                    for(let i=1;(i<7&&i<=pages);i++){
                        list.push(i);
                    }
                }else{
                    if(pageNumber>=pages-2){
                        list.push(1);
                        list.push(2);
                        list.push(3);
                    }else if(pageNumber==1){
                        list.push(pageNumber);
                        list.push(pageNumber+1);
                        list.push(pageNumber+2); 
                    }else if((pageNumber+1)==(pages-2)){
                        list.push(pageNumber-2);
                        list.push(pageNumber-1);
                        list.push(pageNumber);
                    }
                    else{
                        list.push(pageNumber-1);
                        list.push(pageNumber);
                        list.push(pageNumber+1);
                    }
                    list.push('...');
                    list.push(pages-2);
                    list.push(pages-1);
                    list.push(pages);
                }
                setPageButtonList(list);
                
            }catch(err){
                console.log(err);
            }
    };
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
    useEffect(()=>{
        fetchedProductData();
    },[filter,pageNumber]);
    
    useEffect(() => {
    if (!contentRef.current) return;
    
    console.log('prodchange loged')
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
            maskRef.current.style.maskPosition=position
            maskRef.current.style.maskSize=size;
            setMasksPositionWithoutMouse(position);
            maskRef.current.style.height=getComputedStyle(document.getElementById('app')).height;
            document.getElementById('app').style.height=getComputedStyle(document.getElementById('app')).height;

      }
    }, "image/png");
  }, [products]);
    useEffect(()=>{
        return ()=>{
            document.getElementById('app').removeAttribute('style');
        }
    },[]);

    
    
    return<div ref={prodContainer} onMouseMove={mouseMaskHandler} onMouseLeave={mouseLeaveMaskHandler} onMouseEnter={mouseEnterMaskHandler} className='w-5/6 rounded-md p-8 touch:w-full touch:px-1  bg-clip-content'>
            <canvas ref={canvasRef} className="hidden" />
            <div ref={maskRef}  className="w-full h-full grid-blocks-custom absolute inset-0 z-0 mask">
            
            </div>
            <div ref={contentRef} className='relative rounded-2xl'>
                <div className='flex flex-wrap justify-center z-40 touch:gap-2'>
                       {
                      products?products.map((product)=><ProductCard onClick={cardClickHandler} img={`${product.imageIDs[0]}`} productId={product.id} title={product.title} price={product.price}/>):Array.from({length:16}, () => (<Skeleton className='m-2 bg-white/50'  variant="rounded"><ProductCard/></Skeleton>))
                  }
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">

                
                <div className="flex flex-1 items-center justify-between touch:justify-end">
                    <div className='touch:hidden'>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{filteredProductSliceRange[0]}</span> to <span className="font-medium">{filteredProductSliceRange[1]}</span> of{' '}
                        <span className="font-medium">{filteredProductCount}</span> results
                      </p>
                    </div>
                    <div>
                      <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <div
                          onClick={pageDecrease}
                          className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                        </div>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <StyledEngineProvider injectFirst>
                            <ButtonGroup variant="text" aria-label="Basic button group" className=''>
                                {
                                    pageButtonList.map(pageButton=>{
                                        if(pageButton=='...'){
                                            return <Button disabled className='!text-black !border-black/70 hover:bg-white/70 hover:text-black'>...</Button>
                                        }else if(pageButton==pageNumber){
                                            return <Button disabled className='!text-black !border-black/70 bg-white/70 hover:text-black'>{pageButton}</Button>
                                        }
                                        return <Button onClick={productPageJump} productpage={pageButton} className='text-black !border-black/70 hover:bg-white/70 hover:text-black'>{pageButton}</Button>
                                    })
                                }
                                
                              </ButtonGroup>
                          </StyledEngineProvider>
                        <div
                          onClick={pageIncrease}
                          className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                        </div>
                      </nav>
                    </div>
          </div>
            </div>
            </div> 
        </div>
        
   
}
export default React.memo(ProductsContainer);

