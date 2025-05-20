import React from "react";
import authService from '../../appwrite/auth';
import { logout } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

function LogoutBtn(){

    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
        .then(()=>{
            dispatch(logout());
        }).catch((error) => {
            console.error("Logout error ::", error);
        })
        
    }

    return (
            <button className="rounded-full px-6 py-2 hover:bg-blue-100 cursor-pointer" onClick={logoutHandler}>Logout</button>
        
    )
}

export default LogoutBtn;