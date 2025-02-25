//importing react
import React from 'react';
import Navbar from './navbar.jsx';
import SearchNavbar from './searchNavbar.jsx';
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import {Link} from 'react-router-dom';
import {useUserContext} from './userContext.jsx';

function Header(){
    return <div className='bg-clightBlue text-white flex flex-row' id='header'>
                <div className='basis-1/5 px-8 flex justify-center items-center'><Link to='/'><StoreMallDirectoryRoundedIcon className='!size-16'/></Link></div>
                <div className='basis-4/5'>
                    <Navbar/>
                    <SearchNavbar/>
                </div>
        </div>
}

export default Header;