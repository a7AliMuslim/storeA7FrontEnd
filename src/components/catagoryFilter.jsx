import {useState} from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Checkbox , FormGroup, FormControlLabel} from '@mui/material';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

function CatagoryFilter({filterObj}){
    const [glovesCheck,setGlovesCheck]=useState(false);
    const [jacketCheck,setJacketCheck]=useState(false);
    const [helmetCheck,setHelmetCheck]=useState(false);
    filterObj.catagory=[];
    if(glovesCheck){
        filterObj.catagory.push('gloves');
    }
    if(jacketCheck){
        filterObj.catagory.push('jacket');
    }
    if(helmetCheck){
        filterObj.catagory.push('helmet');
    }
    console.log(filterObj.catagory);
    const checkHandler=(event)=>{
        console.log(event.target);
        if(event.target.name=='gloves'){
            setGlovesCheck(!glovesCheck);
        }
        if(event.target.name=='jacket'){
            setJacketCheck(!jacketCheck);
        }
        if(event.target.name=='helmet'){
            setHelmetCheck(!helmetCheck);
        }
    }
    return (
        <Disclosure as="div" >
          <DisclosureButton className="py-2 group flex w-full items-center justify-between">
              <span>Catagories</span>
              <PlusIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:hidden" />
              <MinusIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 [.group:not([data-open])_&]:hidden" />
          </DisclosureButton>
          <DisclosurePanel transition className="text-white origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
            <FormGroup className='ml-8'>
                <FormControlLabel control={<Checkbox id='gloves' name='gloves' value='gloves' onChange={checkHandler} checked={glovesCheck} />} label="gloves" />
                <FormControlLabel control={<Checkbox id='jacket' name='jacket' value='jacket' onChange={checkHandler} checked={jacketCheck} />} label="jacket" />
                <FormControlLabel control={<Checkbox id='helmet' name='helmet' value='helmet' onChange={checkHandler} checked={helmetCheck} />} label="helmet" />
            </FormGroup>
          </DisclosurePanel>
    </Disclosure>
        
    )
}
export default CatagoryFilter;