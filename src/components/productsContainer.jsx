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


axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('key')}`;
axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem('key')}`;
function ProductsContainer({filter}){
    const navigate = useNavigate();
    const location=useLocation();
    const [products, setProducts]=useState(null);
    const [pageNumber, setPageNumber]=useState(1);
    const dispatch=useDispatch();
    const pageIncrease=()=>{
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
                const respons=await axios.post('http://localhost:3002/api/v1/products',{filter,start:1,page:pageNumber});
                const productsData=respons.data.result;
                setProducts(productsData);
                console.log(productsData);
            }catch(err){
                console.log(err);
            }
    };
    useEffect(()=>{
        fetchedProductData();
    },[filter,pageNumber]);
    return<div className='bg-white/10 flex-auto rounded-md'>
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
                        Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                        <span className="font-medium">97</span> results
                      </p>
                    </div>
                    <div>
                      <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                        </a>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <StyledEngineProvider injectFirst>
                            <ButtonGroup variant="text" aria-label="Basic button group" className=''>
                                <Button className='text-white !border-white hover:bg-white/70 hover:text-black'>1</Button>
                                <Button className='text-white !border-white hover:bg-white/70 hover:text-black'>2</Button>
                                <Button className='text-white !border-white hover:bg-white/70 hover:text-black'>3</Button>
                                <Button disabled className='!text-white !border-white hover:bg-white/70 hover:text-black'>...</Button>
                                <Button className='text-white !border-white hover:bg-white/70 hover:text-black'>8</Button>
                                <Button className='text-white !border-white hover:bg-white/70 hover:text-black'>9</Button>
                                <Button className='text-white !border-white hover:bg-white/70 hover:text-black'>10</Button>
                              </ButtonGroup>
                          </StyledEngineProvider>
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                        </a>
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