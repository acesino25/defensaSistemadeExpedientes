import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useUserContext } from '../context/UserContext';

const LayoutMain = () => {

  const {user} = useUserContext();
  const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/login');
        }
    },
    [])

  return (
    <div className='center mid column' style={{gap:'10px'}}>
        {user && (<NavBar></NavBar>)}
        <Outlet></Outlet>
    </div>
  )
}

export default LayoutMain