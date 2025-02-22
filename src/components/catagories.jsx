import React from 'react';
import {Link} from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function Catagories({children}){
    
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-700 data-[active]:bg-slate-700 data-[active]:text-white">
                  {children}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <Link to='/products' state={{type:'gloves'}}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      gloves
                    </Link>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    <Link to='/products' state={{type:'jacket'}}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      jacket
                    </Link>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    <Link to='/products' state={{type:'helmet'}}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      helmet
                    </Link>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
        </>
    )
}
export default Catagories;