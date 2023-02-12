import React, { useRef, useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import { palette } from '../../themes/colors'

const UsersLogin = () => {
    /* Styles */
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1em',

        label:{
            display: 'flex',
            width: '20em',
            gap: '0.5em',
            justifyContent: 'space-evenly'
        },

        input:{
            width: '10em'
        }
    }

    /* useRef HOOK FORM */
    const form = useRef(null)

    /* useState Form */
    const [userLogin, setUserLogin] = useState({
        mail: '',
        password: ''
    })

    /* useState error */
    const [error, setError] = useState(false)

    /* useState del context */
    const {user, setUser} = useUserContext();

    /* FORM HOOK */
    /* onSubmit handle */
    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch("http://127.0.0.1:8000/users/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userLogin),
        })
        .then((response) => response.status == '200' ? (response.json()) : (setError(true))).then(
            (data) =>{
                error == false ? (setUser(data)) : (alert('Ha habido un error'))
                
            }
        )
    }

    console.log(user)
    
  return(
    
        <form ref={form} style={style} onSubmit={(e)=>handleSubmit(e)}>
            {
                user == null ? (
                    <>
                    <label style={style.label}>
                Email:
                <input 
                type="text" 
                name='mail'
                value={userLogin.mail}
                onChange={(e)=>setUserLogin({...userLogin, [e.target.name]:e.target.value})}
                style={style.input}
                required
                ></input>
            </label>
            <label style={style.label}>
                Contraseña:
                <input 
                type="password" 
                name='password'
                value={userLogin.password}
                onChange={(e)=>setUserLogin({...userLogin, [e.target.name]:e.target.value})}
                style={style.input}
                required
                ></input>
            </label>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap:'0.4em'}}>
            <button type='submit' style={{backgroundColor: palette.lightdarker}}>Login</button>
            <a>Olvidé mi contraseña</a>
            </div>
            </>) : (<h1>Ya estás logueado</h1>)
            }
        </form>
  )
}

export default UsersLogin