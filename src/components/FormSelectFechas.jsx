import React, { useEffect, useRef, useState } from 'react'
import { useUserContext } from '../context/UserContext'
import { meses, server } from '../data/data'
import { palette } from '../themes/colors'
import Calendar from './calendar/Calendar'

const FormSelectFechas = () => {
    const styleColumn ={
        display: 'flex',
        flexDirection: 'column',
        gap: '4em',
        alignItems: 'center'
    }

    const style ={
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        height: '2em',
        paddingTop: '1em',
        width: '10em'
    }

    /* useContext */

    const {user} = useUserContext()

    /* useState PARA FETCH */

    const [fecha, setFecha] = useState({
        anio: 2023,
        mes: '01'
    })

    /* useState PARA GUARDAR LO DEL FETCH */
    const [fechas, setFechas] = useState([])


    /* useState para LLAMAR al FETCH */

    const [cargar, setCargar] = useState(false)


    /* Anios para el formulario */

    const anios = []
    for(let i=2023; i<=2033; i++){
        anios.push(i)
    }

    /* useRef HOOK FORMULARIO */

    const form = useRef(null)
    const formEliminar = useRef(null)


    /* useEffect */
    /* FETCH DATA */

    const createString = `${fecha.anio}-${fecha.mes}-01T00:00`
    var nextMonth = fecha.mes

    nextMonth = Number(nextMonth)
    
    nextMonth = nextMonth+1
    
    console.log(nextMonth)
    const desde = new Date(createString) /* Year month day */
    if(nextMonth < 10){
        var hasta = new Date(`${fecha.anio}-0${nextMonth}-01T00:00`) /* Year month day */
    }else if(nextMonth == 13){
        var hasta = new Date(`${fecha.anio+1}-01-01T00:00`) /* Year month day */
    }
    else{
        var hasta = new Date(`${fecha.anio}-${nextMonth}-01T00:00`) /* Year month day */
    }
    

    console.log(desde.toISOString())
    console.log(hasta.toISOString())

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://${server}/fechasDisponibles/${desde.toISOString()},${hasta.toISOString()}`);
            const json = await response.json();
            setFechas(json);
            setCargar(false)
        };
        fetchData();
    }, [cargar]);

    console.log(fechas)

    /* HOOK FORMULARIO HandleSubmit */

    const handleSubmit = (e) =>{
        e.preventDefault()

        console.log('hooked')
        /* Hacemos un fetch de la información provista */
        setCargar(true)
    }

    const handleDelete = () => {

        const fetchData = async() => {
            const response = await fetch(`http://${server}/deshabilitarmes/${desde.toISOString()},${hasta.toISOString()}, ${user.id}`);
            const json = await response.json();
        }

        fetchData()
    }

  return (
    <div style={{...styleColumn, marginBottom: '2em'}}>
        <form onSubmit={(e)=>handleSubmit(e)} ref={form} style={style}>
        <select onChange={(e)=>(setFecha({...fecha, mes:e.target.value}))} id='mes' name='mes'>
            {
                meses.map((mes)=>{
                    return(
                        <option value={mes.numero}>{mes.texto}</option>
                    )
                })
            }
            
        </select>
        <select onChange={(e)=>(setFecha({...fecha, anio:e.target.value}))} id='anio' name='anio'>
            {
                anios.map((anio)=>(<option value={anio}>{anio}</option>))
            }
        </select>

            <button 
            type='submit' 
            style={{backgroundColor: palette.lightdarker, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems:'center'}}>Fetch</button>
        </form>

        <button
            onClick={()=>handleDelete()}
            style={{backgroundColor: palette.heavy, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems:'center'}}>Bloquear MES</button>

            <details>
                <summary>Fechas</summary><Calendar fechas={fechas}></Calendar>
            </details>
    </div>
  )
}

export default FormSelectFechas