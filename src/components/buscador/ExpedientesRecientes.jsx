import React, { useEffect, useState } from 'react'
import wretch from "wretch"
import ExpedienteResultadoUltimos from './ExpedienteResultadoUltimos'

const ExpedientesRecientes = () => {

    /* useState Resultado */

    const [resultado, setResultado] = useState(null)

    /* useEffect Cargar recientes */

    const handleResponse = (expedientes) =>
    {
        setResultado(expedientes)
        console.log(resultado)
    }

    useEffect(()=>{

        /* Handle de response got from the api */
        

        wretch('http://127.0.0.1:8000/expedientes/10')
        .get()
        .json((data)=>{handleResponse(data);console.log(data)})


    }, [])
    
  return (
    <div style={{display: 'flex', marginTop: '1em', flexWrap: 'wrap', gap: '1em', justifyContent: 'center'}}>
        {
            resultado ? (
                resultado.map((expediente)=>(
                    <ExpedienteResultadoUltimos resultado={expediente}></ExpedienteResultadoUltimos>
                ))
            ) : ('Cargando')
        }
    </div>
  )
}

export default ExpedientesRecientes