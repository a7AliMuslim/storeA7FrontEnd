import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {add} from '../features/cart/cartSlice.jsx';
import {useSelector, useDispatch} from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import ProductCard from './productCard';
import { Button, ButtonGroup, Skeleton } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import {useLocation, useNavigate} from 'react-router-dom';

function getCurrentPage(range,productsPerPage){
    return Math.ceil(range[0]/productsPerPage);
    
}

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
    const [pageButtonList, setPageButtonList]=useState([]);
    const [filteredProductCount, setFilteredProductCount]=useState(0);
    const [filteredProductSliceRange, setfilteredProductSliceRange]=useState([0,0])
    const dispatch=useDispatch();
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
                console.log(respons.data);
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
                console.log('list',list);
                console.log('pageNumber+1',pageNumber+1);
                console.log('pages-2',pages-2)
                setPageButtonList(list);
                
            }catch(err){
                console.log(err);
            }
    };
    useEffect(()=>{
        fetchedProductData();
    },[filter,pageNumber]);
    return<div className='bg-white/10 basis-5/6 rounded-md'>
            <div className='flex flex-wrap justify-center'>
                       {
                      products?products.map((product)=><ProductCard onClick={cardClickHandler} img={`http://localhost:3002/api/v1/images?imageID=${product.imageIDs[0]}`} productId={product.id} title={product.title} price={product.price}/>):Array.from({length:50}, () => (<Skeleton className='m-2 bg-white/50'  variant="rounded"><ProductCard/></Skeleton>))
                  }
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">

                <div className="flex flex-1 justify-between sm:hidden">
                   <StyledEngineProvider injectFirst>
                        <Button
                          onClick={pageDecrease} className='text-black bg-white/90 hover:bg-white'
                        >
                          Previous
                        </Button>
                    </StyledEngineProvider>
                    <StyledEngineProvider injectFirst>
                        <Button
                          onClick={pageIncrease} className='text-black bg-white/90 hover:bg-white'
                        >
                          Next
                        </Button>
                    </StyledEngineProvider>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
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
                                        return <Button className='text-black !border-black/70 hover:bg-white/70 hover:text-black'>{pageButton}</Button>
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
        
   
}
export default React.memo(ProductsContainer);

//
//     
//        <div className='border-2 border-sky-500 flex-auto'>
//            {
//            
//            products?products.map((product)=><div>{product.title}<button onClick={()=>addToCartHandler(product)}>add to cart</button></div>):null
//            
//        }
//        </div>