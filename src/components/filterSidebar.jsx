import React from 'react';
import {useState, useEffect} from 'react';
import CatagoryFilter from './catagoryFilter';
import ColorFilter from './colorFilter';
import RangeSlider from './rangeSlider';
import RatingFilter from './ratingFilter';
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles';


const themeButton = createTheme({
  palette: {
    primary: {
        main:'#76B900',
        light:'#F0F0F0',
        dark:'#2C2A34',
        contrastText: '#F0F0F0',
    },
  },
});

function FilterSidbar({setFilter, state, setFilterDrawerOpener=null}){
    const [filterObj, setFilterObj]=useState({objName:'filter'});
    //applies the filter on main filter object, triggers rerender of parent
    const applyFilter=()=>{
        if(setFilterDrawerOpener){
            setFilterDrawerOpener(false);
        }
        setFilter({...filterObj});
    }
    useEffect(()=>{
        applyFilter();
        
    },[]);
    return (<div className='flex w-1/6 flex-col gap-4 p-8 black-diamond-gradient touch:h-full touch:w-full z-10'>
        <h1 className="text-2xl tracking-tight text-light-text my-2">Filters</h1>
        <RangeSlider filterObj={filterObj}/>
        {
                state.tag=='catagories'?<CatagoryFilter filterObj={filterObj} subTag={state.subTag}/>:<CatagoryFilter filterObj={filterObj}/>
        }
        {
                state.tag=='color'?<ColorFilter filterObj={filterObj} subTag={state.subTag}/>:<ColorFilter filterObj={filterObj}/>
        }
        <RatingFilter filterObj={filterObj}/>
        <ThemeProvider theme={themeButton}>
            <Button className='!my-4' variant="contained" onClick={applyFilter}>Apply</Button>
        </ThemeProvider>
    </div>)
}
export default FilterSidbar;