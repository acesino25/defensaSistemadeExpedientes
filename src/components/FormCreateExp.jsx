import React, { useEffect, useRef, useState } from 'react'
import { palette } from '../themes/colors'
import { schemaFormCreateExp } from '../schema/FormSchemas'
import { useExpContext } from '../context/ExpCreateContext'
import Calendar from './calendar/Calendar'
import Swal from 'sweetalert2'
import { useUserContext } from '../context/UserContext'
import { server } from '../data/data'

const FormCreateExp = () => {

    /* DATOS FETCH */

    const [fechas, setFechas] = useState(null);
    const [categorias, setCategorias] = useState(null)

    /* success categoria */
    /* success 200 */
    const success200Categoria = (data) =>{
        setCategorias(data)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://${server}/nuevaAudiencia`);
            const json = await response.json();
            setFechas(json);
        };
        fetchData();

        fetch(`http://${server}/verCategorias/`, {
            method: 'GET',
        }).then((response) => {
            if (response.status !== 200) {
                Swal.fire({
                    icon: 'error',
                    title: 'Mmm...',
                    text: 'No hemos podido traer a las categorías por un error en la conexión'
                })
            } else {
                return response.json();
            }
        }).then((data) => {
            success200Categoria(data)
            console.log(data)
        }).catch((error) => {
            console.log('Error de sistema al cargar categorías')
        });
        
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
            id: expCreate.id,
            idEspecial: expCreate.idEspecial,
            nombres: expCreate.nombres,
            apellido: expCreate.apellido,
            direccion: expCreate.direccion,
            localidad: expCreate.localidad,
            telefono: expCreate.telefono,
            dni: expCreate.dni,
            fechaAudiencia: expCreate.fechaAudiencia[0],
            categoria: expCreate.categoria,
            detalles: expCreate.detalles,
            empresas: expCreate.empresas,
            hipervulnerable: expCreate.hipervulnerable,
            actuacion: expCreate.actuacion,
            creador: user.id
        }

        console.log(expediente)
        if(expCreate.fechaAudiencia[0] == null){
            Swal.fire({
                icon: 'error',
                title: 'Ah ah',
                text: 'No puedo procesar un expediente sin fecha'
              })

            return
        }

        if(expCreate.nombres == '' || expCreate.apellido == '' || expCreate.telefono == '' || expCreate.dni == '' || expCreate.empresas == ''){
            Swal.fire({
                icon: 'error',
                title: 'Ah ah',
                text: 'No puedo procesar un expediente sin datos del consumidor'
              })

            return
        }

        /* handle 200 */

        const handle200Ok = (response) =>{
            /*response.json()*/
            return response.json();
        }

        /* Fetch POST */

        fetch(`http://${server}/expediente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expediente),
        })
        .then((response) => {
            if(response.status == 200){
                return handle200Ok(response)
            }else if(response.status == 404){
                return Promise.reject({
                    status: 404,
                    message: 'Es posible que la fecha que elegiste no esté disponible. Usa otra'
                })
            }else{
                return Promise.reject({
                    status: response.status,
                    message: 'Hubo un error no especificado, es posible que la red no haya podido procesar tu consulta'
                })
            }
        }).then((data) => {
            console.log(data)
            SetExpCreate({
                idEspecial: '',
                nombres: '',
                apellido: '',
                direccion: '',
                localidad: '',
                telefono: '',
                dni: '',
                fechaAudiencia: '',
                categoria: '',
                detalles: '',
                empresas: '',
                hipervulnerable: false,
                actuacion: false,
                creador: '1'
            })
            Swal.fire({
                icon: 'success',
                title: 'EXPEDIENTE CREADO / ACTUALIZADO',
                text: `ID del EXPEDIENTE: ${data.idEspecial}`,
                footer: `<a href="">El ID del sistema para el expediente es: ${data.id}</a>`
              })
            /*console.log(data.detail[0].msg);*/
        }).catch(error => {
            // handle error
            console.log(error)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'No PROCESADO',
                text: error.message,
                showConfirmButton: false,
                timer: 3500
            });
        });
        

    }


  return (
    <div>
        <form action="" onSubmit={(e)=>handleSubmit(e)} ref={formCreate} className='center column' style={{gap: '10px', width: '300px'}}>
            {
                arrInputs
            }

            {/* FECHAS DE AUDIENCIA */}
            <label style={style}>
                Fecha audiencia:
                <select id='fechaAudiencia'
                required
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

            {/* CATEGORIA */}

            <label style={style}>
                Categoria:
                <select id='categoria'
                required
                name='categoria' 
                onChange={(e)=>SetExpCreate({...expCreate, [e.target.name]:[e.target.value]})}>
                    {
                        categorias == null ? (<option value="false">Loading...</option>) : (categorias.map((categoria)=>{
                            return (
                                <option value={categoria.nombre}>{categoria.nombre}</option>
                            )
                        }))
                    }
                </select>
            </label>

            {/* FIN DE CATEGORIA */}

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
                    checked={expCreate.hipervulnerable}
                    ></input>
                </label>

                <label>
                    ¿Actuación?
                    <input 
                    type='checkbox'
                    id='actuacion'
                    name='actuacion'
                    onChange={(e)=>SetExpCreate({...expCreate, [e.target.name]: e.target.checked})}
                    checked={expCreate.actuacion}
                    ></input>
                </label>
            </div>

            <button type='submit' style={{backgroundColor: palette.lightdarker}}><p style={{fontWeight: 'bold'}}>Crear / Actualizar</p></button>
        </form>
    </div>
  )
}

export default FormCreateExp