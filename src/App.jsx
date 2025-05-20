import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Footer, Header } from './components';
import authService from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import { login, logout } from './redux/authSlice';


const App = () => {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  console.log("auth", auth);

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login())
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{setLoading(false)})
  },[dispatch])

  // if(loading){
  //   return <div>Loading...</div>
  // }


  return (
    <div className='flex flex-wrap min-h-screen content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          Parul
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
