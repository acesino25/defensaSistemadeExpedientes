import React from 'react'
import { palette } from '../../themes/colors'
import UsersCreateForm from './UsersCreateForm'

const UsersCreate = () => {

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
        <h1>Nuevo usuario</h1>
        <UsersCreateForm></UsersCreateForm>
    </div>
  )
}

export default UsersCreate