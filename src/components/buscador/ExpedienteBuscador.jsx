import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext, useUserContext } from '../../context/UserContext'
import { server } from '../../data/data'
import { palette } from '../../themes/colors'
import ExpedienteActuacionesRecientes from './ExpedienteActuacionesRecientes'
import ExpedienteListarResultados from './ExpedienteListarResultados'
import ExpedientesRecientes from './ExpedientesRecientes'

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
            
            const encodedBuscar = encodeURIComponent(buscar);
            const encodedUserId = encodeURIComponent(user.id);
            const encodedExpediente = encodeURIComponent(encodedBuscar);
            const encodedComma = encodeURIComponent(',');
            const url = `http://${server}/buscar/${encodedExpediente}, ${user.id}`; /* necesario el espacio entremedio */
            console.log(url)
            const response = await fetch(url);

            if (response.status === 400) {
                setResultados(null)
                throw new Error('No se encontraron resultados.');
            }

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
            <button type='submit' title='Buscar'>🔍</button>
            <button type='button' title='Audiencias' style={{border: 'solid 2px black'}}><Link to='/audiencias'>📅</Link></button>
        </form>
    </div>
        <ExpedienteListarResultados resultados={resultados}></ExpedienteListarResultados>
        {/*<h2>Actuaciones:</h2>
        <ExpedienteActuacionesRecientes></ExpedienteActuacionesRecientes>*/}
        <h2 style={{color: "black"}}>Creados recientemente:</h2> 
        <ExpedientesRecientes></ExpedientesRecientes>
        
    </div>
  )
}

export default ExpedienteBuscador