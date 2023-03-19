import React from 'react'
import { palette } from '../../themes/colors'
import TemporizadorForm from './TemporizadorForm'

const TemporizadorIniciar = () => {

    const style = {
        display: 'flex',
        backgroundColor: palette.main,
        borderRadius: '0.3em',
        padding: '1em',
        width: '40em'
    }

  return (
    <div style={style}>
        <TemporizadorForm></TemporizadorForm>
    </div>
  )
}

export default TemporizadorIniciar