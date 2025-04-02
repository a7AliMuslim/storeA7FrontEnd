import {createSlice} from '@reduxjs/toolkit';

const initialState={
    numberOfProducts:0,
    products:[]
};

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        add:(state, action)=>{
            state.numberOfProducts++;
            const matchingProduct=state.products.find((product)=>{
                if(product.id===action.payload.id && product.chosenColor===action.payload.chosenColor && product.chosenSize===action.payload.chosenSize){
                    return true;
                }else{
                    return false;
                }
            });
            if(matchingProduct){
                matchingProduct.cartQuantity++;
                matchingProduct.subTotal=(matchingProduct.price)*(matchingProduct.cartQuantity);
            }else{
                action.payload.cartQuantity=1;
                action.payload.subTotal=action.payload.price;
                state.products.push({...action.payload});
            }
            
        },
        remove:(state, action)=>{
            state.numberOfProducts--;
            const matchingProductIndex=state.products.findIndex((product)=>{
                if(product.id===action.payload.id && product.chosenColor===action.payload.chosenColor && product.chosenSize===action.payload.chosenSize){
                    return true;
                }else{
                    return false;
                }
            });
            if(matchingProductIndex!=-1){
                if(state.products[matchingProductIndex].cartQuantity==1){
                    state.products.splice(matchingProductIndex,1);
                }else{
                    state.products[matchingProductIndex].cartQuantity--;
                    state.products[matchingProductIndex].subTotal=(state.products[matchingProductIndex].price)*(state.products[matchingProductIndex].cartQuantity);
                }
            }
        },
        removeAll:(state, action)=>{
            const matchingProductIndex=state.products.findIndex((product)=>{
                if(product.id===action.payload.id && product.chosenColor===action.payload.chosenColor && product.chosenSize===action.payload.chosenSize){
                    return true;
                }else{
                    return false;
                }
            });
            if(matchingProductIndex!=-1){
                state.numberOfProducts=state.numberOfProducts-state.products[matchingProductIndex].cartQuantity;
                state.products.splice(matchingProductIndex,1);
            }
        }
    }
});

export default cartSlice.reducer;
export const {add, remove, removeAll}=cartSlice.actions;