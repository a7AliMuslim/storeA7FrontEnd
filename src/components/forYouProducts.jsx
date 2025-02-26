import img1 from '../images/snowpeak.jpg';
import img2 from '../images/volcano.jpg';
import img3 from '../images/volcanicThunder2.jpg';
import img4 from '../images/volcanicThunder.jpg';
import img5 from '../images/rockyWaters2.jpg';
import img6 from '../images/steamMount.jpg';
import ProductCard from './productCard';

export default function ForYouProducts(){
    return<div className='mx-8 my-4'>
            <h1 className='text-3xl subpixel-antialiased font-semibold text-black px-8 my-4'>For you</h1>
            <div className='flex flex-wrap justify-center'>
                <ProductCard className='w-48' img={img1} title='image 1' price='2000'/>
                <ProductCard className='w-48' img={img2} title='image  kjdfkj ksjfn kjsfslk ksjflkdfn lknf lkdn lkds  ' price='2000'/>
                <ProductCard className='w-48' img={img3} title='image 1' price='2000'/>
                <ProductCard className='w-48' img={img4} title='image 1' price='2000'/>
                <ProductCard className='w-48' img={img5} title='image 1' price='2000'/>
                <ProductCard className='w-48' img={img6} title='image 1' price='2000'/>
            </div>
         </div>
}