import React from 'react'
import FormCreateExp from '../components/formCreateExp'
import { palette } from '../themes/colors'
import { useExpContext } from "../context/ExpCreateContext";


const CreateExp = () => {

  const {expCreate, SetExpCreate } = useExpContext();

  return (
    <div className='center mid' style={
      {flexDirection: 'column',
      backgroundColor: palette.main, padding:'1rem',
      borderRadius: '5px',
      margin: '10px'
      }}>
        <h1>Crear expediente</h1>
        <p style={{fontSize: '12px', textAlign: 'center'}}>Recuerda que el estrés puede afectarte, <br></br>date unos instantes para relajarte en lugar de gritarle a alguien.</p>
        <FormCreateExp></FormCreateExp>
    </div>
  )
}

export default CreateExp