import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import {useState} from 'react';

const categories = [
  {
    name: 'Gloves',
    index:0,
    posts: [
      {
        id: 1,
        title: 'Riding Gloves',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "Mecahnic gloves",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
  },
  {
    name: 'Jacket',
    index:1,
    posts: [
      {
        id: 1,
        title: 'Winter jackets',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'Summer jackets',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
  },
  {
    name: 'Helmet',
    index:2,
    posts: [
      {
        id: 1,
        title: 'Digital helmets',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "Desi helmets",
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
      <div className="w-full max-w-md">
        <TabGroup className='flex flex-row' selectedIndex={selectedIndex} manual onMouseLeave={handleMouseLeave}>
          <TabList className="flex flex-col gap-4">
            {categories.map(({ name,index }) => (
              <Tab
                key={name}
                className={selectedIndex==4?'rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[hover]:bg-white/5 data-[focus]:outline-1 data-[focus]:outline-white':"rounded-full py-1 px-3 text-sm/6 font-semibold text-dark focus:outline-none data-[selected]:bg-white/20 data-[hover]:bg-white/10 data-[selected]:data-[hover]:text-light data-[selected]:data-[hover]:bg-cdarkBlue data-[focus]:outline-1 data-[focus]:outline-white"} onMouseEnter={()=>handleMouseEnter(index)} 
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className={selectedIndex==4?'hidden':'absolute ml-16 z-10'}>
            {categories.map(({ name, posts }) => (
              <TabPanel key={name} className="rounded-xl bg-cdarkBlue p-3">
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5">
                      <a href="#" className="font-semibold text-white">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                      <ul className="flex gap-2 text-white/50" aria-hidden="true">
                        <li>{post.date}</li>
                        <li aria-hidden="true">&middot;</li>
                        <li>{post.commentCount} comments</li>
                        <li aria-hidden="true">&middot;</li>
                        <li>{post.shareCount} shares</li>
                      </ul>
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
