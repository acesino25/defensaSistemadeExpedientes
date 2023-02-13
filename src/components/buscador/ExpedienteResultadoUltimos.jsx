import { array } from 'prop-types'
import React, { useState } from 'react'
import { palette } from '../../themes/colors'

const ExpedienteResultadoUltimos = ({resultado}) => {

    /* useState para activar */
    const [activo, setActivo] = useState(false)
  
    /* Styles */

    const style = {
        display: 'flexbox',
        justifyContent: 'center',
        alignItems: 'center',
        flexDireaction: 'column',
        backgroundColor: palette.main,
        borderRadius: '0.2em',
        padding: '0.4em',
        width: '7em',
        height: '8em'
    }

    return (
    <div style={style}>
        <h3 style={{fontSize: '9px', textAlign: 'center'}}>{`${resultado.datos.apellido}, ${resultado.datos.nombres}`}</h3>
        <p style={{fontSize: '9px', textAlign: 'center'}}>{resultado.datos.dni}</p>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: palette.gris, fontSize: '9px', width: '40%'}}>Editar</button>
            <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: palette.rojo, fontSize: '9px', width: '40%'}}>PDF</button>
        </div>
    </div>
  )
}

export default ExpedienteResultadoUltimos