import React from 'react';
import {NavLink} from 'react-router-dom';

function Navbar(){
    return <nav className='flex w-full justify-start'>
        <NavLink className='m-2' to='/'>Home</NavLink>
        <NavLink className='m-2' to='/contact'>Contact us</NavLink>
        <NavLink className='m-2' to='/seller'>Become seller</NavLink>
    </nav>
}
export default Navbar;