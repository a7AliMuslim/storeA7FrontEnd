import React from 'react';
import {useState} from 'react';
import CatagoryFilter from './catagoryFilter';
import ColorFilter from './colorFilter';
import RangeSlider from './rangeSlider';
import RatingFilter from './ratingFilter';

function FilterSidbar({setFilter}){
    const [filterObj, setFilterObj]=useState({objName:'filter'});
    const applyFilter=()=>{
        
        setFilter({...filterObj});
    }
    
    return (<div className='flex flex-col flex-initial w-44'>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Filters</h1>
        <RangeSlider filterObj={filterObj}/>
        <CatagoryFilter filterObj={filterObj}/>
        <ColorFilter filterObj={filterObj}/>
        <RatingFilter filterObj={filterObj}/>
    </div>)
}
export default FilterSidbar;