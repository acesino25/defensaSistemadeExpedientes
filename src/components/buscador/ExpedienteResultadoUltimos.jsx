import React from 'react'
import { palette } from '../../themes/colors'

const ExpedienteResultadoUltimos = ({resultado}) => {
  
    /* Styles */

    const style = {
        display: 'flexbox',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.main,
        borderRadius: '0.2em',
        padding: '0.4em',
        width: '7em',
        height: '4em'
    }
  
    return (
    <div style={style}>
        <h3>{`${resultado.apellido}, ${resultado.nombre}`}</h3>
        <p>{resultado.dni}</p>
    </div>
  )
}

export default ExpedienteResultadoUltimos