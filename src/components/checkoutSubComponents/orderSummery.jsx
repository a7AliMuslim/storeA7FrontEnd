import React from 'react'
import { useState, memo } from 'react';
import { Divider } from '@mui/material';
import CartCard from '../cartCard';
import {cartStore} from '../../features/cart/cartStore';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const themeDivider = createTheme({
    components: {
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: "#76B900", 
          },
        },
      },
    },
  });
  

function OrderSummery({productsListDiv,renderToggle}) {
    const products=cartStore.getState().cart.products;
    let subTotalAll=0;
    const [change, setChange]=useState(1);
    const [shippingCost, setShippingCost]=useState(2000);
    const [taxes, setTaxes]=useState(200);
  return (
    <>
        <p className='text-2xl my-4'>ORDER SUMMERY</p>
        <div ref={productsListDiv} className='overflow-hidden my-4 custom-scrollbar rounded-tr-[5rem] rounded-bl-[5rem] bg-black/5 backdrop-blur-sm'>
            <div className='max-h-80 overflow-auto'>   
                {
                    products?products.map(product=>{
                        subTotalAll=subTotalAll+product.subTotal;
                        console.log(subTotalAll);
                        return<><CartCard product={product} setChange={setChange} change={change} imageClassName='rounded-tr-3xl rounded-bl-3xl'/><Divider/></>
                    }):null
                }
            </div>
        </div>
        <div className='my-4'>
                <div name='subTotal' className='flex justify-between'>
                    <p>SubTotal</p>
                    <p>Rs.{products.length>0?subTotalAll:0}</p>
                </div>
                <div name='shipping/deliveryCost' className='flex justify-between'>
                    <p>Shipping</p>
                    <p>Rs.{products.length>0?shippingCost:0}</p>
                </div>
                <div name='taxes' className='flex justify-between'>
                    <p>Taxes</p>
                    <p>Rs.{products.length>0?taxes:0}</p>
                </div>
        </div>
        <ThemeProvider theme={themeDivider}>
            <Divider/>
        </ThemeProvider>
        <div name='total' className='flex justify-between my-4'>
                    <p>Total</p>
                    <p>Rs.{products.length>0?shippingCost+subTotalAll+taxes:0}</p>
        </div>    
    </>
  )
}

export default memo(OrderSummery);