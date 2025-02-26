import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import {useState, useEffect} from 'react';



const categories = [
  {
    name: 'Catagory1',
    index:0,
    posts: [
      {
        id: 1,
        title: 'Catagory1.1',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "Catagory1.2",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
  },
  {
    name: 'Catagory2',
    index:1,
    posts: [
      {
        id: 1,
        title: 'Catagory2.1',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'Catagory2.2',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
  },
  {
    name: 'Catagory3',
    index:2,
    posts: [
      {
        id: 1,
        title: 'Catagory3.1',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "Catagory3.2",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  },
]

export default function HoverTab() {
  const [selectedIndex, setSelectedIndex]=useState(4);

  const handleMouseEnter = (index) => {
    setSelectedIndex(index);
  };
  const handleMouseLeave = () => {
    setSelectedIndex(4);
  };
  return (
    <div className="flex px-4">
      <div className="rounded-l-xl bg-white/30 w-full max-w-md overflow-hidden">
        <TabGroup className='flex flex-row' selectedIndex={selectedIndex} manual onMouseLeave={handleMouseLeave}>
          <TabList className="flex flex-col gap-4" id='tabList'>
            {categories.map(({ name,index }) => (
              <Tab
                key={name}
                className={selectedIndex==4?'rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[hover]:bg-white/5 data-[focus]:outline-1 data-[focus]:outline-white':"rounded-sm py-1 px-3 text-sm/6 font-semibold text-dark focus:outline-none data-[selected]:bg-white/20 data-[hover]:bg-white/10 data-[selected]:data-[hover]:text-light data-[selected]:data-[hover]:bg-cdarkBlue data-[focus]:outline-1 data-[focus]:outline-white"} onMouseEnter={()=>handleMouseEnter(index)} 
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className={selectedIndex==4?'hidden':'absolute ml-[5.5rem] z-[1002] animate-slide-in'}>
            {categories.map(({ name, posts }) => (
              <TabPanel key={name}  className="h-96 rounded-r-xl bg-cdarkBlue p-3">
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5">
                      <a href="#" className="font-semibold text-white">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  )
}
