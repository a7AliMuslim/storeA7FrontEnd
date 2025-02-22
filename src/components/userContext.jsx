import React from 'react';
import {createContext, useState, useContext} from 'react';

const userContext=createContext(null);

const UserProvider=({children})=>{
    const [user,setUser]=useState(null);
    const login=(user)=>{
        setUser(user);
        localStorage.setItem('user',user.name);
        console.log('user set in storage');
    };
    const logout=(user)=>{
        setUser(null);
        localStorage.removeItem('user');
    };
    const userInStorage=()=>{
        return localStorage.getItem('user');
    }
    return(
        <userContext.Provider value={{user,login,logout,userInStorage}}>
        {children}
        </userContext.Provider>
    )
};
export const useUserContext=()=>{
    return useContext(userContext);
};
export default UserProvider;