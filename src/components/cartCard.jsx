import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import {add, remove, removeAll} from '../features/cart/cartSlice.jsx';
import {useDispatch} from 'react-redux';
import ImageCard from '../components/imageCard.jsx';
import {memo, useEffect, useRef} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

// eslint-disable-next-line no-unused-vars
let temp=0;
function CartCard({product, setChange=null, change=null, imageClassName=''}){
    const dispatch=useDispatch();
    const detailsRef=useRef(null);
    const imgBoxRef=useRef(null);
    const imgContRef=useRef(null);
    const detailsDiv1Ref=useRef(null);
    const detailsDiv2Ref=useRef(null);
    
    const removeAllHandler=()=>{
//        console.log('remove all product');
//        console.log(product);
//        const stateBefore=[...(cartStore.getState().cart.products)];
        dispatch(removeAll(product));
//       const stateAfter=[...(cartStore.getState().cart.products)];
//        console.log('stateBefore');
//        console.log(stateBefore);
//        console.log('stateAfter');
//        console.log(stateAfter);
        temp=setChange?setChange(change+1):null;
    }
    const increaseProduct=()=>{
//        console.log('add single product');
//        console.log(product);
//        const stateBefore=[...(cartStore.getState().cart.products)];
        dispatch(add(product));
//        const stateAfter=[...(cartStore.getState().cart.products)];
//        console.log('stateBefore');
//        console.log(stateBefore);
//        console.log('stateAfter');
//        console.log(stateAfter);
        temp=setChange?setChange(change+1):null;
    };
    const decreaseProduct=()=>{
//        console.log('remove single product');
//        console.log(product);
//        const stateBefore=[...(cartStore.getState().cart.products)];
        dispatch(remove(product));
//        const stateAfter=[...(cartStore.getState().cart.products)];
//        console.log('stateBefore');
//        console.log(stateBefore);
//        console.log('stateAfter');
//        console.log(stateAfter);
        temp=setChange?setChange(change+1):null;
    };

    useEffect(()=>{
        const setDetailsHeight=()=>{
            if(detailsRef && imgBoxRef && imgContRef && detailsDiv1Ref && detailsDiv2Ref && detailsRef.current && imgBoxRef.current && imgContRef.current && detailsDiv1Ref.current && detailsDiv2Ref.current){
                const ImgBoxHeight=parseFloat(window.getComputedStyle(imgBoxRef.current).height);
                const ImgContHeight=parseFloat(window.getComputedStyle(imgContRef.current).height);
                if(ImgContHeight>ImgBoxHeight){
                    const DetailsDiv1Height=parseFloat(window.getComputedStyle(detailsDiv1Ref.current).height);
                    const DetailsDiv2Height=parseFloat(window.getComputedStyle(detailsDiv2Ref.current).height);
                    if(DetailsDiv1Height+DetailsDiv2Height>=ImgBoxHeight){
                        detailsRef.current.style.height=DetailsDiv1Height+DetailsDiv2Height+'px';
                        return;
                    }
                    detailsRef.current.style.height=ImgBoxHeight+'px';
                }
            }
        }
        setDetailsHeight();
        window.addEventListener('resize',setDetailsHeight);

        return ()=> window.removeEventListener('resize', setDetailsHeight);
    },[]);
    return(
        <div className='w-full h-1/3 flex p-2 items-center overflow-hidden'>
            <div ref={imgContRef} className='w-[28%] flex items-center justify-center h-full overflow-hidden'>
                <div className='aspect-square max-w-full max-h-full'>
                    <div ref={imgBoxRef}>
                        <ImageCard alt='oops' img={product.imageIDs[0]} className={`w-full rounded-md ${imageClassName}`}/>
                    </div>
                </div>
            </div>
            
            <div ref={detailsRef} className='w-[72%] flex h-full pl-2'>
                <div className='w-2/3 flex flex-col justify-between h-full overflow-hidden'>
                    <div ref={detailsDiv1Ref} className='flex flex-col overflow-hidden'>
                        <span className='capitalize text-xl text-light-text'>{product.title}</span>
                        <span className='text-light-text'>{setChange?product.chosenSize:null}</span>
                    </div>

                    <div ref={detailsDiv2Ref} className="flex justify-between">
                        <span className='capitalize text-light-text'>{setChange?null:product.chosenSize+', '+product.chosenColor+', '}Qty:{product.cartQuantity}</span>
                        {
                            setChange?(<div className='flex'>
                                            <MinusIcon onClick={decreaseProduct} className="size-5 cursor-pointer text-light-text" />
                                            <PlusIcon onClick={increaseProduct} className="size-5 cursor-pointer text-light-text" />
                                        </div>):null
                        }
                    </div>
                </div>
                <div className='w-1/3 flex flex-col justify-between items-center h-full overflow-hidden text-light-text'>
                    <span>Rs.{Math.ceil(product.subTotal)}</span>
                    {
                        setChange?<span onClick={removeAllHandler} className='cursor-pointer' productid={product.id}><DeleteIcon className='size-5'/></span>:null
                    }
                    
                </div>
            </div>
            
        </div>
    )
}

export default memo(CartCard);