import React from 'react'
import UsersLogin from '../components/usuarios/UsersLogin'
import { palette } from '../themes/colors'

const UserLogin = () => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '30em',
        height: 'auto',
        margin: '2em',
        borderRadius: '0.2em',
        padding: '2em',
        backgroundColor: palette.main
    }
  return (
    <div style={style}>
        <UsersLogin></UsersLogin>
    </div>
  )
}

export default UserLogin