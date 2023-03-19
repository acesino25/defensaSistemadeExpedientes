import { TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import AudienciasResultado from './AudienciasResultado';

const AudienciasProgramadas = () => {

    const [fecha, setFecha] = useState(dayjs().toDate())
    const [buscar, setBuscar] = useState(false)

    /* useEffect */
    useEffect(()=>{
        console.log(fecha)
    },[fecha])


  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        AudienciasProgramadas
        <LocalizationProvider dateAdapter={AdapterDayjs} style={{display:'flex'}}>
                <MobileDatePicker
                    value={fecha}
                    minDate={dayjs('2017-01-01')}
                    onChange={(newValue) => {
                        setFecha(newValue.toDate());
                        setBuscar(true)
                    }}
                    label="Fecha"
                    renderInput={(params) => <TextField {...params} />}
                />
        </LocalizationProvider>

        <AudienciasResultado fecha={fecha}></AudienciasResultado>
    </div>
  )
}

export default AudienciasProgramadas