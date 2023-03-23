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
  return resultados != null ? (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        {resultados.length > 0 && <h1>RESULTADOS: {resultados.length}</h1>}
        <div style={style}>{
        resultados.map((resultado)=>{
            return(
                <ExpedienteResultado resultado={resultado}></ExpedienteResultado>
            )
        })
    }</div></div>
  ):(<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><h1>❓</h1><p>Tu búsqueda no arrojó resultados</p></div>)
}

export default ExpedienteListarResultados