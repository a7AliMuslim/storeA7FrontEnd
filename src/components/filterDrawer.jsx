import React from 'react';
import {useState, useEffect} from 'react';


function FilterDrawer({children,opener}){
    return <div id='filter-drawer-container' className={opener?'absolute h-full animate-slide-in z-10 drop-shadow-[0_2rem_10rem_rgba(0,0,0,1)] rounded-tr-lg overflow-hidden':'absolute h-full animate-slide-out z-10 rounded-tr-lg'}>
            {children}
    </div>
}
export default FilterDrawer;