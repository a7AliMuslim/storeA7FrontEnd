//importing react
import React from 'react';


//for navigation
import {NavLink ,Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';


//user context
import {useUserContext} from './userContext.jsx';


//components to work with
import SearchBar from './searchBar.jsx';
import CartDrawer from './cartDrawer';
import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';


//component function
function SearchNavbar({classes=''}){
    const userData=useUserContext();
    const location=useLocation();
    console.log(location);
    //handles cartDrawer open state
    const [cartDrawerOpener, setCartDrawerOpener]=React.useState(false);
    
    //setting user
    const user=userData.userInStorage() || null;
    console.log(user);
    
    //handles cart drawer
    const cartDrawerHandler=()=>{
        setCartDrawerOpener(!cartDrawerOpener);
    }
    
    const logOutHandler=()=>{
        userData.logout();
    }
    console.log(user);
    return <div className={`${classes} flex justify-around w-full touch:text-xs`}>
            <div className='flex basis-4/5 touch:basis-3/5'>
                <SearchBar className='flex-auto'/>
            </div>

            <nav className='flex basis-1/5 touch:basis-2/5 touch:justify-around'>
                {
                    !user && <><NavLink className='mx-1 flex items-center' to='/login'>Login</NavLink><NavLink className='mx-1 flex items-center'  to='/signup'>Sign up</NavLink></>
                }
                {
                    location.pathname=='/checkout'?null:<div id='cart-icon' className='flex items-center' onClick={cartDrawerHandler}>< ShoppingBasketRoundedIcon className='!size-5 mx-2 cursor-pointer touch:!size-4' /></div>
                }
                <CartDrawer opener={cartDrawerOpener} setOpener={setCartDrawerOpener}></CartDrawer>
                {
                    !!user && <div className='flex items-center justify-evenly w-full'><p className='touch:hidden'>Hi {user.userName}</p> <p onClick={logOutHandler} className='cursor-pointer'>log out</p></div>
                }
            </nav>
        </div>
}


export default SearchNavbar;
