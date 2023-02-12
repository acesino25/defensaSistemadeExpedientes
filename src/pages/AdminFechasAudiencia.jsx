import React from 'react'
import FormSelectFechas from '../components/FormSelectFechas'
import {palette} from '../themes/colors'

const AdminFechasAudiencia = () => {

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
        <FormSelectFechas></FormSelectFechas>
    </div>
  )
}

export default AdminFechasAudiencia