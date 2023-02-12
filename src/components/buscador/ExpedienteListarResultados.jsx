import React from 'react'
import ExpedienteResultado from './ExpedienteResultado'

const ExpedienteListarResultados = ({resultados}) => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1em',
        gap: '1em',
        flexWrap: 'wrap'
      }
      console.log(resultados)
  return (
    <div style={style}>{
        resultados.map((resultado)=>{
            return(
                <ExpedienteResultado resultado={resultado}></ExpedienteResultado>
            )
        })
    }</div>
  )
}

export default ExpedienteListarResultados