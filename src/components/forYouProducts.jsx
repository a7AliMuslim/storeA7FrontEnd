import ProductCard from './productCard';

export default function ForYouProducts(){
    return<div className='mx-8 my-4 touch:mx-2 touch:my-2'>
            <h1 className='text-3xl subpixel-antialiased font-semibold text-light-text px-8 my-4 touch:text-xl touch:px-[0px] touch:my-2'>For you</h1>
            <div className='flex flex-wrap justify-evenly gap-3'>
                <ProductCard className='w-48' title='image 1' price='2000'/>
                <ProductCard className='w-48' title='image  kjdfkj ksjfn kjsfslk ksjflkdfn lknf lkdn lkds  ' price='2000'/>
                <ProductCard className='w-48' title='image 1' price='2000'/>
                <ProductCard className='w-48' title='image 1' price='2000'/>
                <ProductCard className='w-48' title='image 1' price='2000'/>
                <ProductCard className='w-48' title='image 1' price='2000'/>
            </div>
         </div>
}
