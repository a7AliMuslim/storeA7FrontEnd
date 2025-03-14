import {useState} from 'react';
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


function CatagoryFilter({filterObj, subTag=''}){
    const [catagory1Check,setCatagory1Check]=useState(subTag=='catagory1'?true:false);
    const [catagory2Check,setCatagory2Check]=useState(subTag=='catagory2'?true:false);
    const [catagory3Check,setCatagory3Check]=useState(subTag=='catagory3'?true:false);
    console.log('subTag',subTag);
    //fills checked catagories on render and re render
    filterObj.catagory=[];
    if(catagory1Check){
        filterObj.catagory.push('catagory1');
    }
    if(catagory2Check){
        filterObj.catagory.push('catagory2');
    }
    if(catagory3Check){
        filterObj.catagory.push('catagory3');
    }
    
    
    const checkHandler=(event)=>{
        if(event.target.name=='catagory1'){
            setCatagory1Check(!catagory1Check);
        }
        if(event.target.name=='catagory2'){
            setCatagory2Check(!catagory2Check);
        }
        if(event.target.name=='catagory3'){
            setCatagory3Check(!catagory3Check);
        }
    }
    
    
    return (
        <Disclosure as="div" >
         
          <DisclosureButton className="py-2 group flex w-full items-center justify-between text-light-text">
              <span>Catagories</span>
              <PlusIcon className="size-5 fill-black/90 group-data-[hover]:fill-light-gray group-data-[open]:hidden fill-light-text" />
              <MinusIcon className="size-5 fill-black/70 group-data-[hover]:fill-light-gray [.group:not([data-open])_&]:hidden fill-light-text" />
          </DisclosureButton>
          
          <DisclosurePanel transition className="text-light-text origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
            <FormGroup className='ml-8 text-light-text'>
                <ThemeProvider theme={theme}>
                    <FormControlLabel control={<Checkbox id='catagory1' name='catagory1' value='catagory1' onChange={checkHandler} checked={catagory1Check} />} label="catagory1" />
                    <FormControlLabel control={<Checkbox id='catagory2' name='catagory2' value='catagory2' onChange={checkHandler} checked={catagory2Check} />} label="catagory2" />
                    <FormControlLabel control={<Checkbox id='catagory3' name='catagory3' value='catagory3' onChange={checkHandler} checked={catagory3Check} />} label="catagory3" />
                </ThemeProvider>
            </FormGroup>
          </DisclosurePanel>
          
    </Disclosure>
        
    )
}
export default CatagoryFilter;