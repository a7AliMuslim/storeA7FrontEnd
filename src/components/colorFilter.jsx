import {useState} from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Checkbox , FormGroup, FormControlLabel} from '@mui/material';
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

function ColorFilter({filterObj}){
    const [blueCheck,setBlueCheck]=useState(false);
    const [blackCheck,setBlackCheck]=useState(false);
    const [orangeCheck,setOrangeCheck]=useState(false);
    
    
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
    
    console.log(filterObj.color)
    const checkHandler=(event)=>{
        if(event.target.name=='blue'){
            setBlueCheck(!blueCheck);
        }
        if(event.target.name=='black'){
            setBlackCheck(!blackCheck);
        }
        if(event.target.name=='orange'){
            setOrangeCheck(!orangeCheck);
        }
    }
    
    
    return (
        <Disclosure as="div" >
          <DisclosureButton className="py-2 group flex w-full items-center justify-between">
              <span>Color</span>
              <PlusIcon className="size-5 fill-black/90 group-data-[hover]:fill-black/50 group-data-[open]:hidden" />
              <MinusIcon className="size-5 fill-black/70 group-data-[hover]:fill-black/50 [.group:not([data-open])_&]:hidden" />
          </DisclosureButton>
          <DisclosurePanel transition className="text-white origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
            <FormGroup className='ml-8 text-black'>
                <FormControlLabel control={<Checkbox id='blue' name='blue' value='blue' onChange={checkHandler} checked={blueCheck} />} label="Blue" />
                <FormControlLabel control={<Checkbox id='black' name='black' value='black' onChange={checkHandler} checked={blackCheck} />} label="Black" />
                <FormControlLabel control={<Checkbox id='orange' name='orange' value='orange' onChange={checkHandler} checked={orangeCheck} />} label="Orange" />
            </FormGroup>
          </DisclosurePanel>
    </Disclosure>
        
    )
}
export default ColorFilter;