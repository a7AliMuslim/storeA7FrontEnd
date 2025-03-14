import React from 'react';
import {useState, useEffect} from 'react';
import { SwipeableDrawer } from '@mui/material';


function FilterDrawer({children,opener,setOpener}){
    const [container, setContainer]=useState(null);
    const closeHandler=()=>{
        setOpener(false)
    }
    useEffect(()=>{
        console.log('zin',getComputedStyle(document.getElementById('header2')).zIndex);
        setContainer(document.getElementById("filter-drawer-container"));
    },[])
    if (!container) return null; 
    return <SwipeableDrawer className='' anchor='left' open={opener} onClose={closeHandler} PaperProps={{className:'w-1/3 black-linen-gradient text-light-text touch:w-4/5'}} container={container} disablePortal disableEnforceFocus ModalProps={{
                keepMounted: true,
            }}>
            {children}
    </SwipeableDrawer>
}
export default FilterDrawer;