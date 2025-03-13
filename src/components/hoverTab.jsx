import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';



const categories = [
  {
    name: 'catagories',
    index:0,
    posts: [
      {
        id: 1,
        title: 'catagory1',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "catagory2",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
      {
        id: 3,
        title: "catagory3",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
  },
  {
    name: 'color',
    index:1,
    posts: [
      {
        id: 1,
        title: 'blue',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'black',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
      {
        id: 3,
        title: 'orange',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
  }
]

export default function HoverTab() {
  const navigate=useNavigate();
  const [selectedIndex, setSelectedIndex]=useState(4);

  const handleClick=(event)=>{
      console.log(event.target.attributes.tag.value);
      navigate('/products',{
          state:{
              tag:event.target.attributes.tag.value,
              subTag:event.target.attributes.subTag.value
          }
      });
  }
  const handleMouseEnter = (index) => {
    setSelectedIndex(index);
  };
  const handleMouseLeave = () => {
    setSelectedIndex(4);
  };
  useEffect(()=>{
      const touch=window.matchMedia('(hover:none) and (pointer:coarse)');
      if(touch){
          document.getElementById('tabPanels').style.width=getComputedStyle(document.getElementById('imageSlider')).width;
      }
  })
  return (
    <div className="flex px-4 touch:px-0">
      <div className="rounded-l-xl bg-white/30 w-full max-w-md overflow-hidden touch:rounded-md">
        <TabGroup className='flex flex-row' selectedIndex={selectedIndex} manual onMouseLeave={handleMouseLeave}>
          <TabList className="flex flex-col gap-4 touch:flex-row touch:gap-2" id='tabList'>
            {categories.map(({ name,index }) => (
              <Tab
                key={name}
                className={selectedIndex==4?'rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[hover]:bg-white/5 data-[focus]:outline-1 data-[focus]:outline-white capitalize':"rounded-sm py-1 px-3 text-sm/6 font-semibold text-dark focus:outline-none data-[selected]:text-light-gray data-[selected]:bg-dark-purple-black data-[hover]:text-custom-white data-[hover]:bg-white/10 data-[selected]:data-[hover]:text-light data-[selected]:data-[hover]:bg-dark-purple-black data-[focus]:outline-1 data-[focus]:outline-white capitalize"} onMouseEnter={()=>handleMouseEnter(index)} 
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels id='tabPanels' className={selectedIndex==4?'hidden':'absolute ml-[5.5rem] z-[1002] animate-slide-in touch:animate-slide-down touch:ml-[0px] touch:mt-[2rem]'}>
            {categories.map(({ name, posts }) => (
              <TabPanel key={name}  className="h-96 w-36 rounded-r-xl bg-dark-purple-black p-3 touch:rounded-r-[0px] touch:!rounded-b-xl touch:w-full touch:h-48">
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5">
                      <div className="font-semibold capitalize text-white">
                        <span onClick={handleClick} tag={name} subTag={post.title} className="cursor-pointer absolute inset-0" />
                        {post.title}
                      </div>
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
