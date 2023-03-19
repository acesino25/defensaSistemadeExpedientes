import React from 'react'
import TemporizadorIniciar from './TemporizadorIniciar'

const TemporizadorPagina = () => {
  return (
    <div style={{margin: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h1>
            Inicia un nuevo temporizador
        </h1>
        <p>
            Recuerda que NO asignas audiencia, asignas un temporizador respecto
            a acciones que deben ser tomadas y/o controladas
        </p>
        <h3>No puedes cambiar lo creado. Controla antes de enviar</h3>

        <TemporizadorIniciar></TemporizadorIniciar>
    </div>
  )
}

export default TemporizadorPagina