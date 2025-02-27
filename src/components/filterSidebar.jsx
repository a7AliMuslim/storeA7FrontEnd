import React from 'react';
import {useState} from 'react';
import CatagoryFilter from './catagoryFilter';
import ColorFilter from './colorFilter';
import RangeSlider from './rangeSlider';
import RatingFilter from './ratingFilter';
import Button from '@mui/material/Button'

function FilterSidbar({setFilter}){
    const [filterObj, setFilterObj]=useState({objName:'filter'});
    //applies the filter on main filter object, triggers rerender of parent
    const applyFilter=()=>{
        setFilter({...filterObj});
    }
    return (<div className='flex basis-1/6 flex-col gap-4'>
        <h1 className="text-2xl tracking-tight text-gray-900 my-2">Filters</h1>
        <RangeSlider filterObj={filterObj}/>
        <CatagoryFilter filterObj={filterObj}/>
        <ColorFilter filterObj={filterObj}/>
        <RatingFilter filterObj={filterObj}/>
        <Button className='!my-4' variant="contained" onClick={applyFilter}>Apply</Button>
    </div>)
}
export default FilterSidbar;