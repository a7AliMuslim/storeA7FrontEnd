import ProductCard from './productCard';
import { motion } from "framer-motion";

export default function ForYouProducts(){
    return<div className='mx-8 my-4 touch:mx-2 touch:my-2'>
            <h1 className='text-3xl subpixel-antialiased font-semibold text-light-text px-8 my-4 touch:text-xl touch:px-[0px] touch:my-2'>For you</h1>
            <motion.div className='w-full h-full' viewport={{ once: true, amount: 0.3 }}>
                <motion.div className='flex flex-wrap justify-evenly gap-3' initial={{ clipPath: "inset(0% 50% 0% 50%)", opacity:0 }}  whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity:1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} viewport={{ once: true}}>
                    <ProductCard className='w-48' title='image 1' price='2000'/>
                    <ProductCard className='w-48' title='image  kjdfkj ksjfn kjsfslk ksjflkdfn lknf lkdn lkds  ' price='2000'/>
                    <ProductCard className='w-48' title='image 1' price='2000'/>
                    <ProductCard className='w-48' title='image 1' price='2000'/>
                    <ProductCard className='w-48' title='image 1' price='2000'/>
                    <ProductCard className='w-48' title='image 1' price='2000'/>
                </motion.div>
            </motion.div>
         </div>
}

