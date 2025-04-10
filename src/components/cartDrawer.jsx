import { SwipeableDrawer } from '@mui/material';
import {cartStore} from '../features/cart/cartStore.jsx';
import {useState, memo} from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import CartCard from './cartCard';
import { Button,Divider  } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const themeButton=createTheme({
  palette: {
    primary: {
        main:'#76B900',
        light:'#F0F0F0',
        dark:'#2C2A34',
        contrastText: '#F0F0F0',
    },
    
  },
});

function CartDrawer({opener,setOpener}){
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
        <SwipeableDrawer className='' anchor='right' open={opener} onClose={closeHandler} PaperProps={{className:'w-1/3 black-linen-gradient text-light-text touch:w-4/5'}}>
            <div className="p-2 flex w-full items-center justify-between">
              <span className='text-2xl text-light-text'>Cart</span>
              <XMarkIcon onClick={closeHandler} className="size-5 cursor-pointer text-light-gray" />
            </div>
            <div className='h-full overflow-auto'>
                {
                    products?products.map(product=>{
                        subTotalAll=subTotalAll+product.subTotal;
                        return<><CartCard product={product} setChange={setChange} change={change}/><Divider/></>
                    }):null
                }
            </div>
            <div className='w-full p-2'>
                <div className='flex justify-between w-full'>
                    <p className='text-xl text-light-text'>SubTotal</p>
                    <p className='text-light-text'>Rs.{Math.ceil(subTotalAll)}</p>
                </div>
                <p className="text-light-text italic text-xs">doesn't include shipping charges</p>
            </div>
            <div className='w-full flex flex-col items-center justify-between p-2'>
                <ThemeProvider theme={themeButton}>
                    <Button onClick={goToCheckout} variant="contained" className='w-1/2 h-10'>
                    {
                        window.matchMedia('(hover:none) and (pointer:coarse)').matches?<span>checkout</span>:<span>Go to checkout</span>
                    }
                    </Button>
                </ThemeProvider>
                <p onClick={closeHandler} className='text-nvidia-green text-sx cursor-pointer'>or continue shopping</p>
            </div>
            
            
        </SwipeableDrawer>
    
    )
}


export default memo(CartDrawer);