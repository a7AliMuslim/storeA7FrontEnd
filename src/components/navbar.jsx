//importing react
import React from 'react';


//for navigation
import {NavLink} from 'react-router-dom';


//component function
function Navbar(){
    return <nav className='flex w-full justify-end touch:hidden'>
        <NavLink className='m-2' to='/'>Home</NavLink>
        <NavLink className='m-2' to='/contact'>Contact us</NavLink>
        <NavLink className='m-2' to='/about'>About us</NavLink>
        <NavLink className='m-2' to='/seller'>Become seller</NavLink>
    </nav>
}
export default React.memo(Navbar);