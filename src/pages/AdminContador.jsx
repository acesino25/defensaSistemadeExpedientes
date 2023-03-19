import React, { useEffect, useState } from 'react'
import { palette } from '../themes/colors'
import wretch from 'wretch'
import { useUserContext } from '../context/UserContext'
import Swal from 'sweetalert2'
import { server } from '../data/data'
import { useNavigate } from 'react-router-dom'

const AdminContador = () => {

    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30em',
        height: '20em',
        backgroundColor: palette.main,
        borderRadius: '0.3em',
        marginTop: '1em',

        input:{
            fontSize: '26px',
            color: palette.lightdarker,
            fontWeight: 'bold',
            textAlign: 'center',
        }
    }

    /* useNavigate */
    const navigate = useNavigate();

    /* use State */
    const [contador, setContador] = useState('')

    /* handle Response */
    const handleResponse = (data) =>{
        setContador(data.contador)
    }

    /* use usercontext */
    const {user} = useUserContext()

    /* useEffect */

    useEffect(()=>{
        if(user.permiso <= 2){
            
            navigate('/login')
        }

        wretch(`http://${server}/contador/${user.id}`)
        .get()
        .json((data)=>{handleResponse(data);console.log(data)})
    }, [])


    /* Handle submit */
    const handleSubmit = (e) =>{
        e.preventDefault()

        console.log(`${contador}`)

        fetch(`http://${server}/contador/set/${contador}, ${user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(''),
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
                title: 'Actualizado'
              })
              
            /*console.log(data.detail[0].msg);*/
        });
    }

  return (
    <div style={style}>
        
        <h3>CONTADOR DE EXPEDIENTES ACTUAL:</h3>

        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={(e)=>handleSubmit(e)}>
            <input
            value={contador}
            onChange={(e)=>setContador(e.target.value)}
            style={style.input}
            type="text"></input>

            <button type='submit' style={{backgroundColor: palette.lightdarker, marginTop: '1em'}}>Actualizar</button>
        </form>

    </div>
  )
}

export default AdminContador