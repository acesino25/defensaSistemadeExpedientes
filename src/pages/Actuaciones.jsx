import React from 'react'
import ExpedienteActuacionesRecientes from '../components/buscador/ExpedienteActuacionesRecientes'

const Actuaciones = () => {
  return (
    <div>
        <h2>ACTUACIONES PENDIENTES:</h2>
        <h3>Recuerda editar y eliminar la actuación luego de analizarla o haberla efectuado</h3>
        <ExpedienteActuacionesRecientes></ExpedienteActuacionesRecientes>
    </div>
  )
}

export default Actuaciones