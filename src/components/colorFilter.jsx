import {useState, memo} from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Checkbox , FormGroup, FormControlLabel} from '@mui/material';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
 components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#F0F0F0', // Green when unchecked
          '&.Mui-checked': {
            color: '#76B900', // Green when checked
          },
        },
      },
    },
 }
});

function ColorFilter({filterObj, subTag=''}){
    const [blueCheck,setBlueCheck]=useState(subTag==='blue'?true:false);
    const [blackCheck,setBlackCheck]=useState(subTag==='black'?true:false);
    const [orangeCheck,setOrangeCheck]=useState(subTag==='orange'?true:false);
    
    
    filterObj.color=[];
    if(blueCheck){
        filterObj.color.push('blue');
    }
    if(blackCheck){
        filterObj.color.push('black');
    }
    if(orangeCheck){
        filterObj.color.push('orange');
    }
    
    
    const checkHandler=(event)=>{
        if(event.target.name==='blue'){
            setBlueCheck(!blueCheck);
        }
        if(event.target.name==='black'){
            setBlackCheck(!blackCheck);
        }
        if(event.target.name==='orange'){
            setOrangeCheck(!orangeCheck);
        }
    }
    
    
    return (
        <Disclosure as="div" >
          <DisclosureButton className="py-2 group flex w-full items-center justify-between text-light-text">
              <span>Color</span>
              <PlusIcon className="size-5 group-data-[hover]:fill-light-gray group-data-[open]:hidden fill-light-text" />
              <MinusIcon className="size-5 group-data-[hover]:fill-light-gray [.group:not([data-open])_&]:hidden fill-light-text" />
          </DisclosureButton>
          <DisclosurePanel transition className="text-white origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
            <FormGroup className='ml-8 text-light-text'>
                <ThemeProvider theme={theme}>
                    <FormControlLabel control={<Checkbox id='blue' name='blue' value='blue' onChange={checkHandler} checked={blueCheck} />} label="Blue" />
                    <FormControlLabel control={<Checkbox id='black' name='black' value='black' onChange={checkHandler} checked={blackCheck} />} label="Black" />
                    <FormControlLabel control={<Checkbox id='orange' name='orange' value='orange' onChange={checkHandler} checked={orangeCheck} />} label="Orange" />
                </ThemeProvider>
            </FormGroup>
          </DisclosurePanel>
    </Disclosure>
        
    )
}
export default memo(ColorFilter);