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
const blobSvg=<svg width="696" height="694" viewBox="0 0 696 694" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" fill="url(#paint0_linear)">
	<animate repeatCount="indefinite" fill="freeze" attributeName="d" dur="5s"
	
	values="M364.504 0.00131368C416.594 0.168265 466.139 20.1059 512.391 44.0676C557.895 67.642 602.302 96.1253 631.434 138.289C659.943 179.551 664.767 231.184 675.519 280.171C686.2 328.838 699.684 376.947 694.692 426.522C689.39 479.177 679.959 535.064 645.785 575.472C611.738 615.729 556.092 627.656 507.429 647.946C460.761 667.403 415.021 690.642 364.504 692.748C313.131 694.889 261.064 684.352 215.724 660.104C171.077 636.226 142.122 593.131 108.11 555.626C72.2421 516.076 25.1071 483.213 9.10745 432.275C-7.10404 380.663 -0.388863 322.784 19.1253 272.328C37.8438 223.929 83.0317 193.02 116.859 153.669C149.559 115.629 173.536 69.5665 216.159 43.1182C260.47 15.6227 312.356 -0.165822 364.504 0.00131368Z;
	
	
	M332 0.500017C384.091 0.666969 433.248 15.5383 479.5 39.5C525.005 63.0744 601.369 82.3364 630.5 124.5C659.009 165.762 634.815 216.013 645.567 265C656.247 313.667 644.058 369.701 639.067 419.275C633.765 471.931 650.501 499.092 616.326 539.5C582.28 579.757 545.947 600.711 497.284 621C450.616 640.457 417.41 678.395 366.893 680.5C315.52 682.641 234.734 673.749 189.393 649.5C144.746 625.623 135.765 553.505 101.752 516C65.8847 476.45 29.4999 470.213 13.5002 419.275C-2.71131 367.663 -6.01387 315.456 13.5002 265C32.2188 216.601 67.9245 195.852 101.752 156.5C134.452 118.461 131.877 52.4483 174.5 26C218.811 -1.49547 279.852 0.332881 332 0.500017Z;
	
	M364.504 0.00131368C416.594 0.168265 466.139 20.1059 512.391 44.0676C557.895 67.642 602.302 96.1253 631.434 138.289C659.943 179.551 664.767 231.184 675.519 280.171C686.2 328.838 699.684 376.947 694.692 426.522C689.39 479.177 679.959 535.064 645.785 575.472C611.738 615.729 556.092 627.656 507.429 647.946C460.761 667.403 415.021 690.642 364.504 692.748C313.131 694.889 261.064 684.352 215.724 660.104C171.077 636.226 142.122 593.131 108.11 555.626C72.2421 516.076 25.1071 483.213 9.10745 432.275C-7.10404 380.663 -0.388863 322.784 19.1253 272.328C37.8438 223.929 83.0317 193.02 116.859 153.669C149.559 115.629 173.536 69.5665 216.159 43.1182C260.47 15.6227 312.356 -0.165822 364.504 0.00131368Z"/>
 </path>
<defs>
<linearGradient id="paint0_linear" x1="149" y1="128" x2="432.5" y2="693" gradientUnits="userSpaceOnUse">
<stop stop-color="#76B900"/>
<stop offset="1" stop-color="#2C2A34" stop-opacity="0.97"/>
</linearGradient>
</defs>
</svg>


//input:total number of products without slice applied and number of products on single, output: total pages
function getTotalPages(prodCount, productsPerPage){
    return Math.ceil(prodCount/productsPerPage);
}

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
        const {clientX, clientY}=event;
        console.log(clientX,clientY);
        if(masksPositionWithoutMouse.length>0){
            const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
            maskRef.current.style.maskPosition=masksPositionWithoutMouse+`, ${clientX-(remInPixels*4)+'px'} ${clientY-(remInPixels*4)+'px'}`
        }
        console.log(maskRef.current.style.maskPosition);
    }
    useEffect(()=>{
        fetchedProductData();
    },[filter,pageNumber]);
    useEffect(()=>{
        const rect = contentRef.current.getBoundingClientRect();
        const top = rect.top + window.scrollY+'px' ;
        const left = rect.left + window.scrollX+'px' ;
        const width = rect.width+'px';
        const height = rect.height+'px';
        
        
        const position=`0px 0px, ${left} ${top}`;
        const size=`100% 100%, ${width} ${height}, 8rem 8rem`;
        console.log('size', size);
        console.log('position', position);
        
      
        
        maskRef.current.style.maskPosition=position;
        maskRef.current.style.maskSize=size;
        setMasksPositionWithoutMouse(position);
        
    },[products])
    return<div onMouseMove={mouseMaskHandler} className='w-5/6 rounded-md p-8 touch:w-full touch:px-1  bg-clip-content'>
            <div className=' absolute inset-0 w-full h-full'>
                {
                    blobSvg
                }
            </div>
            <div ref={maskRef} className="w-full h-full grid-blocks-dark-gradient absolute inset-0 z-0 mask">
            
            </div>
            <div ref={contentRef} className='relative'>
                <div className='flex flex-wrap justify-center z-40 touch:gap-2'>
                       {
                      products?products.map((product)=><ProductCard onClick={cardClickHandler} img={`http://localhost:3002/api/v1/images?imageID=${product.imageIDs[0]}`} productId={product.id} title={product.title} price={product.price}/>):Array.from({length:50}, () => (<Skeleton className='m-2 bg-white/50'  variant="rounded"><ProductCard/></Skeleton>))
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

