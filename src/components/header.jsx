//importing react
import React from 'react';
import Navbar from './navbar.jsx';
import SearchNavbar from './searchNavbar.jsx';
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import {Link, useLocation} from 'react-router-dom';



//component function
function Header(){
    const location=useLocation();
    return <>
                <div className={'bg-dark-purple-black flex flex-row text-white sticky -top-3 z-[1001] py-1 touch:-top-1'+((location.pathname==='/singleProduct')?' hidden':'')} id='header1'>
                    <div className='w-1/5 px-8 flex justify-center items-center'><Link to='/'><StoreMallDirectoryRoundedIcon className='!size-16 touch:!size-8'/></Link></div>
                    <div className='w-4/5'>
                        <Navbar/>
                        {
                            (location.pathname==='/signup'||location.pathname==='/login'||location.pathname==='/becomeSeller'||location.pathname==='/checkout')?<SearchNavbar className='invisible'/>:<SearchNavbar/>
                        }
                    </div>
                </div>
                <div id='header2' className={'bg-dark-purple-black w-full h-4 touch:h-1 z-10'+((location.pathname==='/singleProduct')?' hidden':'')}></div>
        </>
}

export default Header;