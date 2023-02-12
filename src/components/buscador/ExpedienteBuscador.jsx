import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { UserContext, useUserContext } from '../../context/UserContext'
import { palette } from '../../themes/colors'
import ExpedienteListarResultados from './ExpedienteListarResultados'

const ExpedienteBuscador = () => {

    /* STYLES */

    /* Style for the div */

    const styleDiv = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '20em',
        padding: '0.5em',
        backgroundColor: palette.main,
        borderRadius: '7px'
    }

    const styleForm = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5em',
        marginTop: '0.5em'
    }

    /* Style for input */

    const styleInput ={
        padding: '0.3em',
        height: '2em'
    }

    /* user context */

    const {user} = useUserContext()


    /* useSTate */
    
    /* STATE */
    /* resultados del fetch */

    const [resultados, setResultados] = useState([])

    /* useState Input Buscador */
    const [buscar, setBuscar] = useState('')


    /* HANDLERS */

    /* HOOK SUBMIT */

    /* onSubmit */

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(!buscar){
            Swal.fire({
                icon: 'error',
                title: 'Campo vacío',
                text: 'No puedes enviar una búsqueda vacía'
              })
            return
        }

        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/buscar/${buscar}, ${user.id}`);
            const json = await response.json();
            setResultados(json);
            console.log(json)
        };
        fetchData();
    }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <div style={styleDiv}>
        <form onSubmit={(e)=>handleSubmit(e)} style={styleForm}>
            <input 
            type='text' 
            placeholder='DNI, ID de sistema o ID Expediente'
            style={styleInput}
            value={buscar}
            onChange={(e)=>(setBuscar(e.target.value))}
            ></input>
            <button type='submit'>🔍</button>
        </form>
    </div>

        <ExpedienteListarResultados resultados={resultados}></ExpedienteListarResultados>
    </div>
  )
}

export default ExpedienteBuscador