import React from 'react';
import Navbar from './navbar.jsx';
import SearchNavbar from './searchNavbar.jsx';
import {useUserContext} from './userContext.jsx';

function Header(){
    const user=localStorage.getItem('user');
    return <div className='bg-clightBlue text-white' id='header'>
            <Navbar/>
            <SearchNavbar/>
        </div>
}

export default Header;