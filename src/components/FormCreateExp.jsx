import React, { useEffect, useRef, useState } from 'react'
import { palette } from '../themes/colors'
import { schemaFormCreateExp } from '../schema/FormSchemas'
import { useExpContext } from '../context/ExpCreateContext'
import Calendar from './calendar/Calendar'
import Swal from 'sweetalert2'
import { useUserContext } from '../context/UserContext'

const FormCreateExp = () => {

    /* DATOS FETCH */

    const [fechas, setFechas] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/nuevaAudiencia');
            const json = await response.json();
            setFechas(json);
        };
        fetchData();
    }, []);

    const formCreate = useRef(null)
    /*const [form, setForm] = useState({
        idEspecial: '',
        nombres: '',
        apellido: '',
        direccion: '',
        localidad: '',
        telefono: '',
        dni: '',
        empresas: '',
        hipervulnerable: false,
        actuacion: false,
        creador: '1'
    })*/



    /* CONTEXT */

    const { expCreate, SetExpCreate } = useExpContext();
    const {user} = useUserContext()

    /* Estilos */
    
    const style={
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1em'
    }


    /* Traemos los inputs hasta dni para automatizar esta parte */

    const arrInputs = [] /* Como foreach no devuelve nada, debemos pushear cada iteración para luego mostrarla para renderizar */

    Object.entries(schemaFormCreateExp).forEach(([key, value])=>{

        const [firstletter, ...rest] = value
        
        arrInputs.push(
        <label htmlFor="" style={style} key={key+'l'}>
            {`${firstletter.toUpperCase()}${rest.join('')}:`} 
            <input 
            style={{flex:1}} 
            type="text" 
            name={value} 
            id={value}
            onChange={(e)=>SetExpCreate({...expCreate, [e.target.name]: e.target.value})}
            value={expCreate[value]}/>
        </label>
        )
    })

    

    const handleSubmit = (e)=>{
        e.preventDefault()

        const dataForm = new FormData(formCreate.current);
        const objectData = Object.fromEntries([...dataForm.entries()])

        /*if(!objectData.idEspecial.trim()){
            return alert('El id debe ser declarado')
        }*/


        const expediente = {
            idEspecial: expCreate.idEspecial,
            nombres: expCreate.nombres,
            apellido: expCreate.apellido,
            direccion: expCreate.direccion,
            localidad: expCreate.localidad,
            telefono: expCreate.telefono,
            dni: expCreate.dni,
            fechaAudiencia: expCreate.fechaAudiencia[0],
            detalles: expCreate.detalles,
            empresas: expCreate.empresas,
            hipervulnerable: expCreate.hipervulnerable,
            actuacion: expCreate.actuacion,
            creador: user.id
        }

        console.log(expediente)

        fetch("http://127.0.0.1:8000/expediente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expediente),
        })
        .then((response) => response.status == '200' ? response.json() : (Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No PROCESADO',
            showConfirmButton: false,
            timer: 1500
          }))
          )
        .then((data) => {
            console.log(data)
            Swal.fire({
                icon: 'success',
                title: 'EXPEDIENTE CREADO',
                text: `ID del EXPEDIENTE: ${data.idEspecial}`,
                footer: `<a href="">El ID del sistema para el expediente es: ${data.id}</a>`
              })
              
            /*console.log(data.detail[0].msg);*/
        });

        

    }


  return (
    <div>
        <form action="" onSubmit={(e)=>handleSubmit(e)} ref={formCreate} className='center column' style={{gap: '10px', width: '300px'}}>
            {
                arrInputs
            }

            <label style={style}>
                Fecha audiencia:
                <select id='fechaAudiencia' 
                name='fechaAudiencia' 
                onChange={(e)=>SetExpCreate({...expCreate, [e.target.name]:[e.target.value]})}>
                    <option>10 días hábiles, recuerda</option>
                    {
                        fechas == null ? (<option value="false">Loading...</option>) : (fechas.map((fecha)=>{

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
                            return (
                                <option value={fecha.fechaHora}>{formattedDate}</option>
                            )
                        }))
                    }
                </select>
            </label>

            <label style={style}>
                Detalles:
                <input 
                type='text' 
                name='detalles' 
                id='detalles'
                onChange={(e)=>SetExpCreate({...expCreate, [e.target.name]: e.target.value})}
                value={expCreate.detalles}
                ></input>
            </label>

            <label style={{display:'flex', flexDirection:'column'}}>
                <p>Empresas (separadas por comas ',')</p>
                <input 
                type='text' 
                name='empresas' 
                id='empresas'
                onChange={(e)=>SetExpCreate({...expCreate, [e.target.name]: e.target.value})}
                value={expCreate.empresas}
                ></input>
            </label>

            <div style={{display:'flex', gap: '4px'}}>
                <label>
                    ¿Hipervulnerable?
                    <input 
                    type='checkbox'
                    id='hipervulnerable'
                    name='hipervulnerable'
                    onChange={(e)=>SetExpCreate({...expCreate, [e.target.name]:e.target.checked})}
                    value={expCreate.hipervulnerable}
                    ></input>
                </label>

                <label>
                    ¿Actuación?
                    <input 
                    type='checkbox'
                    id='actuacion'
                    name='actuacion'
                    onChange={(e)=>SetExpCreate({...expCreate, [e.target.name]: e.target.checked})}
                    value={expCreate.actuacion}
                    ></input>
                </label>
            </div>

            <button type='submit' style={{backgroundColor: palette.lightdarker}}>Crear</button>
        </form>
    </div>
  )
}

export default FormCreateExp