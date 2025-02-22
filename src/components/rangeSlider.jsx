import {Slider} from '@mui/material';
import {useState} from 'react';

function RangeSlider({filterObj}){
    const [rangeValue,setRangeValue]=useState([0,30000]);
    filterObj.PriceRange=rangeValue;
    const handleChange=(event, newRangeValue)=>{
        setRangeValue(newRangeValue);
    }
    
    return (
        <Slider
          getAriaLabel={() => 'Price range'}
          value={rangeValue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          step='5000'
          max='100000'
        />
        )
}
export default RangeSlider;