import React from 'react';
import {NavLink ,Link} from 'react-router-dom';
import {useUserContext} from './userContext.jsx';
import Catagories from './catagories.jsx';
import SearchBar from './searchBar.jsx';
import CartDrawer from './cartDrawer';
import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';

function SearchNavbar(){
    const [cartDrawerOpener, setCartDrawerOpener]=React.useState(false);
    const [user, setUser]=React.useState(useUserContext().user || localStorage.getItem('user') || null);
    const cartDrawerHandler=()=>{
        setCartDrawerOpener(!cartDrawerOpener);
    }
    return <div className='flex justify-around w-full'>
            <div className='basis-1/5 px-8'><Link to='/'><StoreMallDirectoryRoundedIcon className='!size-10'/></Link></div>
            <div className='flex min-w-max basis-3/5'>
                <Catagories className=''>Catagories</Catagories>
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
//
//<NavLink className='' to='/cart'>Cart</NavLink>