import placeHolderImage from '../images/steamMount.jpg';

export default function ProductCard({
    img=placeHolderImage,
    title='Product',
    price=0,
    className='w-48',
    productId=0,
    onClick
}){
    className='flex flex-col flex-none hover:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden rounded-md bg-white/50 bg-blend-overlay m-2 h-fit touch:m-[0px] touch:w-40 '+className;
    return<div onClick={onClick} className={className} productid={productId}>
        <img src={img} className='flex-auto w-full aspect-square'/>
        <p className='text-slate-900 m-2 line-clamp-2 h-12'>{title}</p>
        <p className='text-red-500 m-2'>{`Rs.${price}`}</p>
    </div>
}