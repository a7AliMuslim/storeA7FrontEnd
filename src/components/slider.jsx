import React from 'react';
import img1 from '../images/snowpeak.jpg';
import img2 from '../images/volcano.jpg';
import img3 from '../images/volcanicThunder2.jpg';
import img4 from '../images/volcanicThunder.jpg';
import img5 from '../images/rockyWaters2.jpg';
import img6 from '../images/steamMount.jpg';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css'
const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 1,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 1,
      partialVisibilityGutter: 30
    }
  };
export default function Slider(){
    return <Carousel
  additionalTransfrom={0}
  arrows
  autoPlay
  autoPlaySpeed={6000}
  customTransition='transform 1500ms ease-in-out'
  transitionDuration={1500}
  draggable={true}
  centerMode={false}
  className="rounded-md"
  containerClass="container-with-dots"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  itemClass="h-96"
  keyBoardControl
  minimumTouchDrag={80}
  pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={responsive}
  rewind={false}
  rewindWithAnimation={false}
  rtl={false}
  shouldResetAutoplay
  showDots={true}
  sliderClass=""
  slidesToSlide={1}
  focusOnSelect={true}
  swipeable
>
  <img className='w-full' src={img1}/>
  <img className='w-full' src={img2}/>
  <img src={img3} className='w-full'/>
  <img src={img4} className='w-full'/>
  <img src={img5} className='w-full'/>
  <img src={img6} className='h-96 w-full'/>
</Carousel>;
}
