import React from 'react';
import HoverTab from '../components/hoverTab';
import SSlider from '../components/slider';
import ForYouProducts from '../components/forYouProducts';



export default function Home(){
    return<>
        <div className='flex rounded-md p-8 '>
            <HoverTab/>
            <div className='hero w-3/12 flex-auto h-96'><SSlider className='h-96'/></div>
        </div>
        <div>
            <ForYouProducts/>
        </div>
    </>
}
