import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartSlice.jsx';
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, cartReducer);

export const cartStore=configureStore({
    reducer:{
        cart:persistedReducer,
    }
});
export const persistor = persistStore(cartStore);




