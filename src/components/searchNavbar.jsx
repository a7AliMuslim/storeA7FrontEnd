//importing react
import React, { useState } from 'react';


//for navigation
import {NavLink } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


//user context
import {useUserContext} from './userContext.jsx';


//components to work with
import SearchBar from './searchBar.jsx';
import CartDrawer from './cartDrawer';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import {cartStore} from '../features/cart/cartStore.jsx';
import {removeAll} from '../features/cart/cartSlice';
import {useDispatch} from 'react-redux';


//component function
function SearchNavbar({className=''}){
    const userObj=useUserContext();
    const location=useLocation();
    const dispatch=useDispatch();
    const [rerenderToggle,setRenderToggle]=useState(false);

    //handles cartDrawer open state
    const [cartDrawerOpener, setCartDrawerOpener]=useState(false);
    
    //setting user
    const user=userObj.userInStorage() || null;
    
    
    //handles cart drawer
    const cartDrawerHandler=()=>{
        setCartDrawerOpener(!cartDrawerOpener);
    }
    
    const logOutHandler=()=>{
        cartStore.getState().cart.products.forEach(prod=>dispatch(removeAll(prod)));
        localStorage.removeItem('key');
        userObj.logout();
        setRenderToggle(!rerenderToggle);
    }
    
    return <div className={`${className} flex justify-around w-full touch:text-xs`}>
            <div className='flex basis-4/5 touch:basis-3/5'>
                <SearchBar className='flex-auto'/>
            </div>

            <nav className='flex basis-1/5 touch:basis-2/5 touch:justify-around'>
                {
                    !user && <><NavLink className='mx-1 flex items-center' to='/login'>Login</NavLink><NavLink className='mx-1 flex items-center'  to='/signup'>Sign up</NavLink></>
                }
                {
                    location.pathname==='/checkout'?null:<div id='cart-icon' className='flex items-center' onClick={cartDrawerHandler}>< ShoppingBasketRoundedIcon className='!size-5 mx-2 cursor-pointer touch:!size-4' /></div>
                }
                <CartDrawer opener={cartDrawerOpener} setOpener={setCartDrawerOpener}></CartDrawer>
                {
                    !!user && <div className='flex items-center justify-evenly w-full'><p className='touch:hidden'>Hi {(user.type==='seller'||user.type==='approvedSeller')?'seller':user.userName}</p> <p onClick={logOutHandler} className='cursor-pointer'>log out</p></div>
                }
            </nav>
        </div>
}


export default React.memo(SearchNavbar);
