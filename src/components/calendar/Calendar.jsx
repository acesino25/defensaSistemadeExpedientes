import React, { useEffect, useState } from 'react'
import { palette } from '../../themes/colors'
import Swal from 'sweetalert2'
import { useUserContext } from '../../context/UserContext'

const Calendar = ({fechas}) => {
    
    /* useState RESPUESTA del servidor */

    const [respuesta, setRespuesta] = useState('')

    /* user context */
    const {user} = useUserContext()

    const handleClick = (id) => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/inhabilitarFecha/${id}, ${user.id}`);
            return await response.json();
        };

        fetchData().then((json)=>{
            Swal.fire({
                position: 'top-end',
                icon: json == true ? 'success' : 'error',
                title: json == true ? 'Habilitada' : 'Deshabilitada',
                showConfirmButton: false,
                timer: 1500
            });
            setRespuesta(json);
            console.log(json)
        });
    }
  return (
    <div>
        {
            fechas.map((fecha)=>{
                const date = new Date(fecha.fechaHora);

                    const options = {
                        timeZone: "America/Argentina/Buenos_Aires",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                        hour: "numeric",
                        minute: "numeric"
                    };

                const formattedDate = new Intl.DateTimeFormat("es-AR", options).format(date);

                return(
                    <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', gap: '1em', width:'90%'}}>
                        <div style={{width:'70%', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <p>{formattedDate}</p>
                        { fecha.idExpediente == null ? '' :
                            <div>
                                <h1 style={{color:'red', fontSize: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>HAY UNA AUDIENCIA ASIGNADA</h1>
                            </div>
                        }
                        </div>
                        <button 
                            onClick={()=>handleClick(fecha.id)} 
                            style={
                                {backgroundColor: palette.lightdarker, 
                                flex: '1',
                                height: '2em', 
                                width: '2em', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center'}}>
                                    {fecha.disponible ? <p style={{fontSize: '1em'}}>🔓</p> : <p>🔐</p>}</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Calendar