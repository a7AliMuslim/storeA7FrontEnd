//importing react
import React from 'react';
import Navbar from './navbar.jsx';
import SearchNavbar from './searchNavbar.jsx';
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import {Link, useLocation} from 'react-router-dom';
import {useUserContext} from './userContext.jsx';


//component function
function Header(){
    const location=useLocation();
    return <>
                <div className='bg-clightBlue flex flex-row text-white sticky -top-3 z-[1001] py-1' id='header1'>
                    <div className='basis-1/5 px-8 flex justify-center items-center'><Link to='/'><StoreMallDirectoryRoundedIcon className='!size-16'/></Link></div>
                    <div className='basis-4/5'>
                        <Navbar/>
                        {
                            (location.pathname=='/signup'||location.pathname=='/login'||location.pathname=='/becomeSeller')?<SearchNavbar classes='invisible'/>:<SearchNavbar/>
                        }
                    </div>
                </div>
                <div id='header2' className='bg-clightBlue w-full h-4'></div>
        </>
}

export default Header;