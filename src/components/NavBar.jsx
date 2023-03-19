import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { palette } from '../themes/colors';
import { useUserContext } from '../context/UserContext';
import { getRandomColor } from '../data/randomColor';

const NavBar = () => {
  const {user} = useUserContext()
  return (
    <nav style={{marginTop: '2em', display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center'}}>
        <button><Link to='/crear'>Crear</Link></button>
        <button><Link to='/consultar'>Consultar</Link></button>
        <button><Link to='/admin'>Admin</Link></button>
        <button><Link to='/created'>PDF</Link></button>
        <Avatar sx={{ bgcolor: getRandomColor() }} style={{marginLeft:'1em'}}>{
          user.name[0]
        }</Avatar>
    </nav>
  )
}

export default NavBar