import {Slider} from '@mui/material';
import {useState, memo} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
        main:'#76B900',
    },
  },
});

function RangeSlider({filterObj}){
    const [rangeValue,setRangeValue]=useState([0,100000]);
    filterObj.priceRange=rangeValue;
    const handleChange=(event, newRangeValue)=>{
        setRangeValue(newRangeValue);
    }
    
    return (<div>
                <p className='py-2 text-light-text'>Price Range</p>
                <ThemeProvider theme={theme}>
                    <Slider
                      getAriaLabel={() => 'Price range'}
                      value={rangeValue}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      step='500'
                      max='100000'
                      size="small"
                    />
                </ThemeProvider>
                <p className='text-sm text-light-text'>{rangeValue[0]} - {rangeValue[1]} Rs</p>
        </div>
        )
}
export default memo(RangeSlider);