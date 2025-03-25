import React from 'react'
import { useState, memo } from 'react';
import { Divider } from '@mui/material';
import CartCard from '../cartCard';
import {cartStore} from '../../features/cart/cartStore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';


const themeDivider = createTheme({
    components: {
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: "#F2F2F2", 
          },
        },
      },
    },
  });
  

function OrderSummery({productsListDiv}) {
    const products=cartStore.getState().cart.products;
    let subTotalAll=0;
    const [change, setChange]=useState(1);
    const [shippingCost, setShippingCost]=useState(2000);
    const [taxes, setTaxes]=useState(200);
  return (
    <>
        <p className='text-2xl my-4'>Order summery</p>
        <div ref={productsListDiv} className='max-h-80 overflow-auto my-4 custom-scrollbar rounded-3xl bg-black/5 backdrop-blur-sm'>
               
                {
                    products?products.map(product=>{
                        subTotalAll=subTotalAll+product.subTotal;
                        console.log(subTotalAll);
                        return<><CartCard product={product} setChange={setChange} change={change}/><Divider/></>
                    }):null
                }
        </div>
        <div className='my-4'>
                <div name='subTotal' className='flex justify-between'>
                    <p>SubTotal</p>
                    <p>Rs.{subTotalAll}</p>
                </div>
                <div name='shipping/deliveryCost' className='flex justify-between'>
                    <p>Shipping</p>
                    <p>Rs.{shippingCost}</p>
                </div>
                <div name='taxes' className='flex justify-between'>
                    <p>Taxes</p>
                    <p>Rs.{taxes}</p>
                </div>
        </div>
        <ThemeProvider theme={themeDivider}>
            <Divider/>
        </ThemeProvider>
        <div name='total' className='flex justify-between my-4'>
                    <p>Total</p>
                    <p>Rs.{shippingCost+subTotalAll+taxes}</p>
        </div>    
    </>
  )
}

export default memo(OrderSummery);