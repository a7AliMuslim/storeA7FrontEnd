import React from 'react';
import {useState, useEffect, useRef} from 'react';
import FilterSidebar from '../components/filterSidebar.jsx';
import ProductsContainer from '../components/productsContainer.jsx';
import FilterDrawer from '../components/filterDrawer.jsx';
import {useLocation} from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/20/solid';

const filterIcon=<svg id='filter-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>


function Products(){
    const location=useLocation();
    const [state, setState]=useState(location.state||'');
    const [filter, setFilter]=useState('');
    const [filterDrawerOpener, setFilterDrawerOpener]=React.useState(false);
    const iconDivRef=useRef(null);
    const filterDrawerCloseHandler=(event)=>{
        if(event.target.closest('#filter-icon')){
            return
        }
        if(event.target.closest('#filter-drawer-container')){
            return;
        }
        setFilterDrawerOpener(false);
    }
    const filterDrawerOpenHandler=()=>{
        setFilterDrawerOpener(true);
    }
    useEffect(()=>{
        if(window.matchMedia('(hover:none) and (pointer:coarse)').matches){
            iconDivRef.current.style.width=getComputedStyle(document.getElementById('filter-drawer-container')).width;
        }
        console.log(filter);
        
    });
    const isFilterSet=()=>{
        if(filter==''){
            return false;
        }
        if(filter && filter.catagory && filter.color && filter.priceRange){
            if(filter.catagory.length==0 && filter.color.length==0 && filter.priceRange[0]==0 && filter.priceRange[1]==100000 && !(filter.rating)){
                return false;
            }
        }
        return true;
    }
    return <div className='min-h-screen' onClick={filterDrawerCloseHandler}>
          
           <div ref={iconDivRef} className='hidden justify-between touch:flex'  >
                <div onClick={filterDrawerOpenHandler} className='flex'>{filterIcon}<div className={'size-2 rounded-full bg-red-400 -translate-x-2 translate-y-[0.1rem] '+(isFilterSet()?'':'hidden')}></div></div>
                <XMarkIcon className={"animate-spin-fast overflow-hidden rounded-lg z-20 size-6 cursor-pointer text-dark hover:bg-red-300 hover:text-light-text "+(filterDrawerOpener?'block':'hidden')} />
           </div>
           
            <div className='flex h-full'>
               {
                    (window.matchMedia('(hover:none) and (pointer:coarse)').matches)?<FilterDrawer opener={filterDrawerOpener}><FilterSidebar setFilter={setFilter} state={state} setFilterDrawerOpener={setFilterDrawerOpener}></FilterSidebar></FilterDrawer>:<FilterSidebar setFilter={setFilter} state={state}></FilterSidebar>
                }
                <ProductsContainer filter={filter}></ProductsContainer>
            </div>
        </div>
}
export default Products;