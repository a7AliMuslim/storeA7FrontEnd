//importing react
import React from 'react';


//for navigation
import {NavLink ,Link} from 'react-router-dom';


//user context
import {useUserContext} from './userContext.jsx';


//components to work with
import SearchBar from './searchBar.jsx';
import CartDrawer from './cartDrawer';
import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';


//component function
function SearchNavbar(){
    //handles cartDrawer open state
    const [cartDrawerOpener, setCartDrawerOpener]=React.useState(false);
    
    //setting user
    const [user, setUser]=React.useState(useUserContext().user || null);
    
    //handles cart drawer
    const cartDrawerHandler=()=>{
        setCartDrawerOpener(!cartDrawerOpener);
    }
    
    return <div className='flex justify-around w-full'>
            <div className='flex min-w-max basis-4/5'>
                <SearchBar className='flex-auto'/>
            </div>

            <nav className='flex basis-1/5'>
                {
                    !user && <><NavLink className='mx-1' to='/login'>Login</NavLink><NavLink className='mx-1'  to='/signup'>Sign up</NavLink></>
                }
                <div className='flex items-center' onClick={cartDrawerHandler}>< ShoppingBasketRoundedIcon className='size-5 mx-2 ' /></div>
                <CartDrawer opener={cartDrawerOpener} setOpener={setCartDrawerOpener}></CartDrawer>
                {
                    !!user && <div className='flex items-center'><p>Welcome {user}</p></div>
                }
            </nav>
        </div>
}


export default SearchNavbar;
