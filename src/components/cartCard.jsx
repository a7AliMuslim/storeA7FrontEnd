import placeHolderImage from '../images/volcanicThunder.jpg';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import {add, remove, removeAll} from '../features/cart/cartSlice.jsx';
import {useSelector, useDispatch} from 'react-redux';
import {cartStore} from '../features/cart/cartStore.jsx';

export default function CartCard({product, setChange=null, change=null}){
    const dispatch=useDispatch();
    
    const removeAllHandler=()=>{
        console.log('remove all product');
        console.log(product);
        const stateBefore=[...(cartStore.getState().cart.products)];
        dispatch(removeAll(product));
        const stateAfter=[...(cartStore.getState().cart.products)];
        console.log('stateBefore');
        console.log(stateBefore);
        console.log('stateAfter');
        console.log(stateAfter);
        const temp=setChange?setChange(change+1):null;
    }
    const increaseProduct=()=>{
        console.log('add single product');
        console.log(product);
        const stateBefore=[...(cartStore.getState().cart.products)];
        dispatch(add(product));
        const stateAfter=[...(cartStore.getState().cart.products)];
        console.log('stateBefore');
        console.log(stateBefore);
        console.log('stateAfter');
        console.log(stateAfter);
        const temp=setChange?setChange(change+1):null;
    };
    const decreaseProduct=()=>{
        console.log('remove single product');
        console.log(product);
        const stateBefore=[...(cartStore.getState().cart.products)];
        dispatch(remove(product));
        const stateAfter=[...(cartStore.getState().cart.products)];
        console.log('stateBefore');
        console.log(stateBefore);
        console.log('stateAfter');
        console.log(stateAfter);
        const temp=setChange?setChange(change+1):null;
    };
    return(
        <div className='w-full h-1/3 grid grid-cols-4 gap-4 p-2 items-center overflow-hidden'>
            <img src={`http://localhost:3002/api/v1/images?imageID=${product.imageIDs[0]}`} className='col-span-1 aspect-square rounded-md overflow-hidden'/>
            <div className='col-span-2 grid grid-cols-2 grid-rows-2 items-center h-full overflow-hidden'>
               <div className='flex flex-col overflow-hidden'>
                    <span className='capitalize text-xl text-light-text'>{product.title}</span>
                    <span className='text-light-text'>{setChange?product.chosenSize:null}</span>
                </div>
                <div>
                    
                </div>
                <div className="col-span-2 flex justify-between">
                  <span className='capitalize text-light-text'>{setChange?null:product.chosenSize+', '+product.chosenColor+', '}Qty:{product.cartQuantity}</span>
                  {
                        setChange?(<div className='flex'>
                      <MinusIcon onClick={decreaseProduct} className="size-5 cursor-pointer text-light-text" />
                      <PlusIcon onClick={increaseProduct} className="size-5 cursor-pointer text-light-text" />
                  </div>):null
                    }
                </div>
            </div>
            <div className='col-span-1 grid grid-cols-1 grid-rows-2 items-center h-full overflow-hidden text-light-text'>
                <span>Rs.{product.subTotal}</span>
                {
                    setChange?<span onClick={removeAllHandler} className='cursor-pointer' productid={product.id}>Remove</span>:null
                }
                
            </div>
        </div>
    )
}

