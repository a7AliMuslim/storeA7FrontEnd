//importing react
import React from 'react';


//importing components to work with
import HoverTab from '../components/hoverTab';
import SSlider from '../components/slider';
import ForYouProducts from '../components/forYouProducts';



export default function Home(){
    return<>
        <div className='flex p-8 touch:flex-col touch:p-2 grid-lines-green-gradient'>
            <HoverTab/>
            <div id='imageSlider' className='hero w-3/12 flex-auto h-96 touch:w-full touch:h-48'><SSlider className='h-96'/></div>
        </div>
        <div className='grid-lines-dark-gradient'>
            <ForYouProducts/>
        </div>
    </>
}
