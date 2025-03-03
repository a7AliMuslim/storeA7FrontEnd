import { SwipeableDrawer } from '@mui/material';
import {cartStore} from '../features/cart/cartStore.jsx';
import {useState} from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import CartCard from './cartCard';
import { Button,Divider  } from '@mui/material';
import {add, remove} from '../features/cart/cartSlice.jsx';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function CartDrawer({opener,setOpener}){
    const navigate=useNavigate();
    const products=[...(cartStore.getState().cart.products)];
    const [change, setChange]=useState(1);
    let subTotalAll=0;
    const goToCheckout=()=>{
        setOpener(false)
        navigate('/checkout');
    }
    const closeHandler=()=>{
        setOpener(false)
    }
    return (
        <SwipeableDrawer anchor='right' open={opener} onClose={closeHandler} PaperProps={{className:'w-1/3 !bg-white/90'}}>
            <div className="p-2 flex w-full items-center justify-between">
              <span className='text-2xl'>Cart</span>
              <XMarkIcon onClick={closeHandler} className="size-5 cursor-pointer" />
            </div>
            <div className='h-full overflow-auto'>
                {
                    products?products.map(product=>{
                        subTotalAll=subTotalAll+product.subTotal;
                        console.log(subTotalAll);
                        return<><CartCard product={product} setChange={setChange} change={change}/><Divider/></>
                    }):null
                }
            </div>
            <div className='w-full p-2'>
                <div className='flex justify-between w-full'>
                    <p className='text-xl'>SubTotal</p>
                    <p>Rs.{subTotalAll}</p>
                </div>
                <p className="">doesn't include shipping charges</p>
            </div>
            <div className='w-full flex flex-col items-center justify-between p-2'>
                <Button onClick={goToCheckout} variant="contained" className='w-1/2 h-10'><span>Go to checkout</span></Button>
                <p onClick={closeHandler} className='text-sky-400 text-sx cursor-pointer'>or continue shopping</p>
            </div>
            
            
        </SwipeableDrawer>
    
    )
}
//{false}?Rs.{products.reduce((acc,product)=>acc+product.subTotal,0)}:null