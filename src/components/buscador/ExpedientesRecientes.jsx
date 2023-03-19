import React, { useEffect, useState } from 'react'
import wretch from "wretch"
import { server } from '../../data/data'
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
        
        const fetchData = async () => {
            const response = await fetch(`http://${server}/expedientes/10`);
            return await response.json();
        };

        fetchData().then((json)=>{
            handleResponse(json)
        });

        
        /* MODIFICADO POR UN FETCH MÁS GENÉRICO 
        wretch(`http://${server}/expedientes/10`)
        .get()
        .json((data)=>{handleResponse(data);console.log(data)})
        */

    }, [])
    
  return (
    <div style={{display: 'flex', marginTop: '1em', flexWrap: 'wrap', gap: '2.5em', justifyContent: 'center', paddingBottom: '5em'}}>
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