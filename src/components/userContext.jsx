//importing react and some react components
import React from 'react';
import {createContext, useState, useContext} from 'react';


//declaring context
const userContext=createContext(null);


//component function(also stores user in local storage along with context)
const UserProvider=({children})=>{
    const [user,setUser]=useState(localStorage.getItem('user') || localStorage.getItem('seller') || null);
    const login=(user)=>{
        setUser(user);
        console.log(user);
        if(user.type==='seller'||user.type==='approvedSeller'){
            localStorage.removeItem('user');
            localStorage.setItem('seller',JSON.stringify(user));
            return;
        }
        localStorage.removeItem('seller');
        localStorage.setItem('user',JSON.stringify(user));
    };
    const logout=()=>{
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('seller');
    };
    const userInStorage=()=>{
        return JSON.parse(localStorage.getItem('user')||localStorage.getItem('seller'));
    }
    return(
        <userContext.Provider value={{user,login,logout,userInStorage}}>
        {children}
        </userContext.Provider>
    )
};


//exposes stored context
export const useUserContext=()=>{
    return useContext(userContext);
};


//component exported
export default UserProvider;