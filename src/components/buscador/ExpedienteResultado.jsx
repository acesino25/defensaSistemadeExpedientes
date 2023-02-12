import React from 'react'
import Swal from 'sweetalert2'
import { UserContext, useUserContext } from '../../context/UserContext'
import { palette } from '../../themes/colors'
import wretch from "wretch"

const ExpedienteResultado = ({resultado}) => {

    /* ESTILOS */
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15em',
        height: '20em',
        padding: '0.3em',
        margin: '0.3em',
        backgroundColor: resultado.hipervulnerable && palette.vulnerable || resultado.archivado && palette.archivado
    }

    /* context user */

    const {user} = useUserContext()

    /* HANDLE CLICK */

    const handleClick = () => {
        console.log(resultado.id)

        /* Handle de response got from the api */
        const handleResponse = (estados) =>
        {
            var concat = ""
            estados.map((estado)=>{
                concat += `<div style="background: ${palette.grisclaro}; display: flex; justify-content: center; align-items: center; flex-direction: column;"> ${estado.estado} 
                <div style="display: flex; justify-content: center; align-items: center;"><p style="font-size: 10px; text-align: center">${estado.fecha}</p></div>
                </div>`
            })
            
            Swal.fire({
            title: `${resultado.apellido.toUpperCase()}, ${resultado.nombres} C/ `,
            html:   concat,
            showCancelButton: true,
            confirmButtonText: 'Actualizar estado',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
        }

        wretch(`http://127.0.0.1:8000/expediente/estados/${resultado.id}, ${user.id}`)
        .get()
        .json((data)=>handleResponse(data))
        .notFound(error => { /* ... */ })
        .unauthorized(error => { /* ... */ })
        .error(418, error => { /* ... */ })
        .res(response => {console.log(response)})
        .catch(error => { /* uncaught errors */ })

    }

  return (
    <button onClick={handleClick} style={style}>
        <div>
            <h3>{`${resultado.apellido.toUpperCase()}, ${resultado.nombres}`}</h3>
            <h1 style={{color: palette.lightdarker}}>{resultado.idEspecial == null ? 'NULL':resultado.idEspecial}</h1>
            <p style={{textAlign: 'center'}}><strong style={{textAlign: 'center'}}>
                {`${resultado.apellido.toUpperCase()}, ${resultado.nombres} C/ ${resultado.empresas}`}</strong></p>
        </div>
    </button>
  )
}

export default ExpedienteResultado