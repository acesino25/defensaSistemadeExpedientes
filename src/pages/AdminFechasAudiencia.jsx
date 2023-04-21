import React, { useEffect } from 'react'
import FormSelectFechas from '../components/FormSelectFechas'
import { useUserContext } from '../context/UserContext'
import {palette} from '../themes/colors'

const AdminFechasAudiencia = () => {
    const {user} = useUserContext();
    useEffect(()=>{
      
        console.log(user)
    },[user])

    const style = {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: palette.main,
        width: '40em',
        height: 'auto',
        borderRadius: '0.5em',
        marginBottom: '1em'
    }

  return (
    <div style={style}>
      {
      user.permiso <= 3 ?
          <div> DEBES SOLICITAR ESTO A TU JEFE DE AUDIENCIAS. NO COMPROMETAS AL SISTEMA </div>
        :
          <FormSelectFechas></FormSelectFechas>
      }
    </div>
  )
}

export default AdminFechasAudiencia