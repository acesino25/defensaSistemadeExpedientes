import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { palette } from '../../themes/colors'

const UsersCreateForm = () => {

    const style = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '0.3em',

        label:{
            display: 'flex',
            justifyContent: 'center',
            width: '20em',
            gap: '1em'
        },

        input:{
            display: 'flex',
            flex: '1',
            width: '10em'
        }
    }


    /* useState */
    /* Creamos el state para crear usuario */

    const [user, setUser] = useState({
        "name": '',
        "mail": '',
        "password": '',
        "passwordConfirm": '',
        "puntos": 0,
        "permiso": 1
    })

    /* useRef Form */

    /* REF EL FORM */

    const form = useRef(null)




    /* HOOK SUBMIT */

    const handleSubmit = (e) =>{
        e.preventDefault()

        console.log(user)

        fetch("http://127.0.0.1:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((response) => response.status == '200' ? response.json() : (
            Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No PROCESADO',
            footer: 'Es posible que falte información, o que el usuario ya exista',
            showConfirmButton: false,
            timer: 1500
          })
          )
          )
        .then((data) => {
            console.log(data)
            Swal.fire({
                icon: 'success',
                title: 'USUARIO CREADO',
                text: `Nombre: ${data.name}`
              })
              
            /*console.log(data.detail[0].msg);*/

            setUser({
                "name": '',
                "mail": '',
                "password": '',
                "passwordConfirm": '',
                "puntos": 0,
                "permiso": 1
            })
        });
    }



  return (
    <form ref={form} style={style} onSubmit={(e)=>handleSubmit(e)}>
        <label style={style.label}>
            Nombre:
            <input style={style.input} 
            type='text' 
            name='name' 
            placeholder='Nombre'
            onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})} 
            value={user.nombre}
            required></input>
        </label>

        <label style={style.label}>
            Email:
            <input style={style.input}
            type='email' 
            name='mail' 
            onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})} 
            value={user.mail}
            placeholder='Email'></input>
        </label>

        <label style={style.label}>
            Contraseña:
            <input style={style.input}
            type='password' 
            name='password' 
            onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})} 
            value={user.password}
            placeholder='Password' 
            required></input>
        </label>

        <label style={style.label}>
            Repita la contraseña:
            <input style={style.input}
            type='password' 
            name='passwordConfirm' 
            onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})} 
            value={user.passwordConfirm}
            placeholder='Password' 
            required></input>
        </label>

        <button type='submit' style={{backgroundColor: palette.lightdarker, marginTop: '0.7em'}}>Crear</button>
    </form>
  )
}

export default UsersCreateForm