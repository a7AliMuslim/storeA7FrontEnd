import {useEffect, useState} from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


function ProductsStatus(){
    const [products, setProducts]=useState(null);
    const [ratingValue, setRatingValue]=useState(null);
    const productsStatusFetcher= async ()=>{
        const sellerToken=await JSON.parse(localStorage.getItem('seller')).sellerToken;
        axios.defaults.headers.post['Authorization'] = `Bearer ${sellerToken}`;
        const response=await axios.post('http://localhost:3002/api/v1/products/');
        console.log(response.data.products);
        setProducts(response.data.products);
    }
    const deleteProduct=async (event)=>{
        console.log(event);
        const sellerToken=await JSON.parse(localStorage.getItem('seller')).sellerToken;
        axios.defaults.headers.patch['Authorization'] = `Bearer ${sellerToken}`;
        const productID=event.target.attributes.prod_id.value;
        console.log(productID);
        await axios.patch('http://localhost:3002/api/v1/products/delete',{productID});
        const newProducts=products.filter(prod=>{
            if(prod.id==productID){
                return false;
            }
            return true;
        })
        console.log(newProducts);
        setProducts(newProducts);
    }
    useEffect(()=>{
        document.getElementById('product_status').style.height=Number(getComputedStyle(document.getElementById('root')).height.replace('px',''))-(2*(Number(getComputedStyle(document.getElementById('header1')).height.replace('px',''))))+'px';
    },[products])
    useEffect(()=>{
        productsStatusFetcher();
    },[])
    
    return <div className='w-full flex flex-col items-center justify-between max-h-screen overflow-auto' id='product_status'>
        {
            (products && products.length>0)?products.map(product=>{
                return <div className='flex rounded-lg w-2/3 bg-black/20 hover:scale-105 transition-all duration-300 my-2'>
                    <div className='basis-1/5 aspect-square flex items-center justify-center'><img src={`http://localhost:3002/api/v1/images?imageID=${product.imageIDs[0]}`} className='rounded-md w-full aspect-square'/></div>
                    <div className='basis-3/5 flex justify-center '>
                        <div className='w-11/12'>
                            <div className='text-xl'>{product.title}</div>
                            <div>
                                <Rating
                                  name="product-rating"
                                  value={product.rating}
                                  readOnly
                                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                  classes=''
                                />
                            </div>
                            <div>Items sold: {product.numOfSales}</div>
                        </div>
                    </div>
                    <div className='basis-1/5 aspect-square justify-around items-center flex flex-col'>
                        <p className='hover:cursor-pointer' onClick={deleteProduct} prod_id={product.id}>Remove</p>
                        <div>
                            <span>Qty:{product.quantities.reduce((qtyAcc,currQty)=>{
                                    return qtyAcc+Number(currQty.qty)
                                },0)}</span>
                        </div>
                    </div>
                </div>}):<div>No product</div>
        }
        
    </div>
}
export default ProductsStatus;