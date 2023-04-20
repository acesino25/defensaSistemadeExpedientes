import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useExpContext } from '../../context/ExpCreateContext'
import { useUserContext } from '../../context/UserContext'
import { server } from '../../data/data'
import { palette } from '../../themes/colors'
import { fechaFormat } from '../../utils/fechaFormat'

const AudienciaFechasDisponibles = ({desde, hasta, buscar}) => {


    /* useContext */

    const {expCreate, SetExpCreate} = useExpContext()
    const {user} = useUserContext()

    console.log(expCreate)

    /* error 204 */

    const handle204 = () =>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }

    /* success 200 */
    const success200 = (nuevaFecha) =>{
        Swal.fire(
            'ACTUALIZADO!',
            `Nueva fecha: ${nuevaFecha}`,
            'success'
          )
    }

    /* handleClick */

    const handleClick = (idFecha) =>{

        Swal.fire({
            title: `Deseas cambiar la fecha de audiencia del expediente ${expCreate.idEspecial}`,
            showDenyButton: true,
            confirmButtonText: 'Cambiar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                procesar();
            } else if (result.isDenied) {
              Swal.fire('El proceso se ha cancelado', '', 'info')
            }
        })


        const procesar = () =>{
            const idEspecial = encodeURIComponent(expCreate.idEspecial)
            const idFechaEncoded = encodeURIComponent(idFecha)
            const idUserEncoded = encodeURIComponent(user.id)

            /* 1) Fetch editar fecha*/
            /* Obtendremos el idEspecial del expediente y se lo pasamos al fetch*/
            /* Obtendremos el ID de la fecha nueva y se la pasamos al fetch */
            /* Obtenemos el userid y lo pasamos al fetch */
                                /* 1%252F2023,      idFecha,    userId */
            /* /editarDisponible/{idEspecial},{idFecha},{userId}*/

            /* el BACKEND se encargará de esto:
            /*  1) */
            /* la buscaremos en la tabla fechas y la dejaremos disponible y sin id de expediente */
            /*  2) */
            /* Con el ID nuevo de fecha se la asignaremos al expediente */

            /* En la tabla temporizador vamos a buscar al temporizador que tenga el id de sistema en */
            /* idEspecial con el expediente y que en titulo tenga el nombre "Audiencia" */

            fetch(`http://${server}/editarDisponible/?idFecha=${idFecha}&idEspecial=${idEspecial}&userId=${user.id}`, {
            method: 'POST',
            })
            .then((response) => {
                if (response.status !== 200) {
                    handle204()
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                success200(fechaFormat(data))
                console.log(data)
            })
            .catch((error) => {
                alert('reportar error de sistema')
            });
        }


        

    }

    /* useState */

    const [respuesta, setRespuesta] = useState(null)

    /* Handle Response */

    const handleResponse = (response) => {
        setRespuesta(response)
        console.log(response)
    }


    useEffect(()=>{
        console.log(desde, hasta)
        if(desde !== null && hasta !== null){
            console.log(`http://${server}/diaDisponible/${desde.toISOString()},${hasta.toISOString()}`)
            /* Handle de response got from the api */
            
            const fetchData = async () => {
                const response = await fetch(`http://${server}/diaDisponible/${desde.toISOString()},${hasta.toISOString()}`);
                return await response.json();
            };

            fetchData().then((json)=>{
                handleResponse(json)
                console.log('Respuesta')
                console.log(json)
            });
        }
    },[hasta])


  return (
    respuesta == null ?(
    <div style={{display: 'flex', flexDirection: 'column', color: 'black'}}>
        No hay fechas
    </div>):(
        <div style={{display: 'flex', flexDirection: 'column', color:'white'}}>
            {
                respuesta.map((fecha)=>{

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
                                {backgroundColor: fecha.disponible ? palette.lightdarker : palette.rojo, 
                                flex: '1',
                                height: '2em', 
                                width: '2em', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center'}}>
                                    {fecha.disponible ? <p style={{fontSize: '1em'}}>👑</p> : <p>🔐</p>}</button>
                    </div>
                    )
                })
            }
        </div>
    )
  )
}

export default AudienciaFechasDisponibles