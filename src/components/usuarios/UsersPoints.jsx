import React, { useEffect, useState } from 'react'
import { server } from '../../data/data'
import { palette } from '../../themes/colors'

const UsersPoints = () => {

    const [usuarios, setUsuarios] = useState(null)
    var contador = 0;

    useEffect(()=>{

        fetch(`http://${server}/users`).then(response => response.json())
            .then(data => {
                setUsuarios(data)
                console.log(usuarios)
            }).catch(error => console.log(error))
    }, [])

  return (
    <div>
        <div style={{fontSize:'24px'}}>

            {
                usuarios ? usuarios.map((usuario)=>{

                    contador++
                    
                    return (
                    <div 
                        style={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: palette.main,
                                gap: '0.5em',
                                margin: '1em',
                                padding: '1em',
                                borderRadius: '5px'
                            }}>
                                <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <p>{usuario.name}</p>
                                {
                                    contador == 1 ? <h1>🥇</h1> : contador == 2 ? (<h1>🥈</h1>) : (<h1>🥉</h1>)
                                    
                                }
                                </div>
                                <p style={{color: palette.secondary, margin: '0'}}>{usuario.puntos}</p>
                    </div>)
                    }) : '...Cargando ⌛'
            }
        </div>
    </div>
  )
}

export default UsersPoints