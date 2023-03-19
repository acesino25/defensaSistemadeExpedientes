import React, { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AudienciaFechasDisponibles from './AudienciaFechasDisponibles';

const AudienciaReasignarForm = ({expediente}) => {

    const [fecha, setFecha] = useState(null)
    const [hasta, setHasta] = useState(null)
    const [buscar, setBuscar] = useState(false)

    /* useEffect */

    useEffect(()=>{
        setFecha(expediente.fechaAudiencia)
        console.log(fecha)
    },[])

    useEffect(()=>{
        if(fecha !== null && typeof(fecha) !== 'string'){
            console.log(fecha)
            const newDate = new Date(fecha)
            newDate.setDate(fecha.getDate()+1)
            setHasta(newDate)
            
        }
    }, [fecha])

    useEffect(()=>{
        console.log(hasta)
    },[hasta])

  return (
    <div>
        <div>
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
        </div>

        <div>
            <AudienciaFechasDisponibles desde={fecha} hasta={hasta} buscar={buscar}></AudienciaFechasDisponibles>
        </div>
    </div>
  )
}

export default AudienciaReasignarForm