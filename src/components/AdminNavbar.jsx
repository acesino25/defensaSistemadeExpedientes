import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <nav style={{marginTop: '2em', display: 'flex', gap: '5px', flexDirection:'column'}}>
        <button><Link to='/admin/fechas'>Habilitar/Deshabilitar fechas</Link></button>
        <button><Link to='/admin/usuarios'>Crear usuario</Link></button>
        <button><Link to='/admin/fechas'>Editar usuario</Link></button>
    </nav>
  )
}

export default AdminNavbar