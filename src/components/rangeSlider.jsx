import {Slider} from '@mui/material';
import {useState} from 'react';

function RangeSlider({filterObj}){
    const [rangeValue,setRangeValue]=useState([0,30000]);
    filterObj.PriceRange=rangeValue;
    const handleChange=(event, newRangeValue)=>{
        setRangeValue(newRangeValue);
    }
    
    return (<div>
                <p className='py-2'>Price Range</p>
                <Slider
                  getAriaLabel={() => 'Price range'}
                  value={rangeValue}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  step='500'
                  max='100000'
                  size="small"
                />
                <p className='text-sm'>{rangeValue[0]} - {rangeValue[1]} Rs</p>
        </div>
        )
}
export default RangeSlider;