import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { palette } from '../../themes/colors';

const TemporizadorForm = () => {
    const [value, setValue] = useState(Date.now)
    const [fin, setFin] = useState(Date.now)
  return (
    <div>
        <LocalizationProvider dateAdapter={AdapterDayjs} style={{display:'flex'}}>
            
            <Grid container spacing={10}>
                <Grid item xs={10}>
                <TextField fullWidth label="Título descriptivo" id="fullWidth" />
                </Grid>    
                <Grid item xs={5}>
                    <MobileDatePicker
                        value={value}
                        minDate={dayjs('2017-01-01')}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        label="Inicio"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={5}>        
                    <MobileDatePicker
                        value={value}
                        minDate={dayjs('2017-01-01')}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        label="Fin"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={5}> 
                    <button style={{backgroundColor: palette.lightdarker, height: '2em', display: 'flex', justifyContent: 'center', alignItems:'center'}}>Crear</button>
                </Grid>
            </Grid>
        </LocalizationProvider>
  </div>
  )
}

export default TemporizadorForm