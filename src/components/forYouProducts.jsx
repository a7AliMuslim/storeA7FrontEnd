import ProductCard from './productCard';
import { motion } from "framer-motion";
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Skeleton } from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';

export default function ForYouProducts(){
    const [saleProducts, setSaleProducts]=useState(null);
    const navigate = useNavigate();
    const location=useLocation();
    const cardClickHandler=(event)=>{
        const clickedProduct=saleProducts.find(saleProd=>saleProd.product.id===event.currentTarget.attributes.productid.value);
        clickedProduct.product.price=(parseFloat(clickedProduct.product.price)*parseFloat(clickedProduct.discountPercent)/100)+'';
        navigate('/singleProduct',{state:{path:location.pathname,product:clickedProduct.product}});
    }
    const fetchedSaleProductData=async ()=>{
        try{
            const respons=await axios.post(`${process.env.REACT_APP_backHost}api/v1/products/saleOffers`,null,
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem('key')||null}`
                                      }
                                }
                            );
            const cleanedSaleProducts=respons.data.saleProducts.filter(saleProduct=>saleProduct && saleProduct.discountPercent && saleProduct.product)
            console.log(cleanedSaleProducts)
            setSaleProducts(cleanedSaleProducts);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchedSaleProductData();
    },[]);
    return<div className='mx-8 my-4 touch:mx-2 touch:my-2'>
            <h1 className='text-3xl subpixel-antialiased font-semibold text-light-text px-8 my-4 touch:text-xl touch:px-[0px] touch:my-2'>For you</h1>
            <motion.div className='w-full h-full' viewport={{ once: true, amount: 0.3 }}>
                <motion.div className='flex flex-wrap justify-evenly gap-3' initial={{ clipPath: "inset(0% 50% 0% 50%)", opacity:0 }}  whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity:1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} viewport={{ once: true}}>
                    {saleProducts?saleProducts.map((saleProduct)=><ProductCard onClick={cardClickHandler} img={`${saleProduct.product.imageIDs[0]}`} productId={saleProduct.product.id} title={saleProduct.product.title} price={parseFloat(saleProduct.product.price)*parseFloat(saleProduct.discountPercent)/100}/>):Array.from({length:10}, () => (<Skeleton className='m-2 bg-white/50'  variant="rounded"><ProductCard/></Skeleton>))}
                </motion.div>
            </motion.div>
         </div>
}

