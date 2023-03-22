import { array } from 'prop-types'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import wretch from "wretch"
import { server } from '../../data/data'
import { useExpContext } from '../../context/ExpCreateContext'
import { useUserContext } from '../../context/UserContext'
import { palette } from '../../themes/colors'
import { fechaFormat } from '../../utils/fechaFormat'

const ExpedienteResultadoActuacionesUltimo = ({resultado}) => {
  /* navigate */
  const navigate = useNavigate()

  /* useState para activar */
  const [activo, setActivo] = useState(false)

  /* useState */
  const emptyState = {
    idEspecial: '',
    estado: '',
    descripcion: ''
  }
  const [estado, setEstado] = useState('')

  /* useContext */

  const {user, setUser} = useUserContext()
  const {expCreate, SetExpCreate} = useExpContext()

  /* HANDLE CLICK */

  const handleClickState = () => {
      console.log(resultado)

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
          title: `${resultado.datos.apellido.toUpperCase()}, ${resultado.datos.nombres} C/ `,
          html:   concat,
          showCancelButton: true,
          confirmButtonText: 'Actualizar estado',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            console.log(estado)
            return fetch(`http://${server}/estado/${user.id}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({idEspecial: resultado.id, estado: login, descripcion: ''}),
          }).then(response => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                return response.json()
              })
              .catch(error => {
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              })
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `Actualizado`
            })
          }
        })
      }



      /* Handle onClick *




      /* The request */

      wretch(`http://${server}/expediente/estados/${resultado.id}, ${user.id}`)
      .get()
      .json((data)=>handleResponse(data))
      .notFound(error => { /* ... */ })
      .unauthorized(error => { /* ... */ })
      .error(418, error => { /* ... */ })
      .res(response => {console.log(response)})
      .catch(error => { /* uncaught errors */ })

  }

  /* Styles */

  const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: resultado.datos.hipervulnerable ? palette.vulnerable : palette.main,
      borderRadius: '0.2em',
      minWidth: '7em',
      minHeight: '12em',
      width: '10em',
      height: '15em',
      padding:'1em'
  }

  /* handleClickInfo */

  const handleClickInfo = () =>{
      const today = Date.now()
      const fechaComparar = new Date(resultado.datos.fechaAudiencia).getTime()

      const styleFecha = {
        color: today > fechaComparar && 'red'
      }

      const empresasDenunciadas = resultado.datos.empresas.split(', ')
      Swal.fire({
          title: `<strong>Expediente ${resultado.idEspecial}</strong>`,
          icon: 'info',
          html:
            `<b>Última audiencia programada para el:</b><br><p style="color:${styleFecha.color}">${fechaFormat(resultado.datos.fechaAudiencia)}</p><br><br>
            <b>DATOS ÚTILES:</b> ${resultado.datos.detalles}<br><br>
            <b><u>DATOS DE CONTACTO:</u></b><br><br>
            Localidad: ${resultado.datos.localidad}<br>
            Dirección: <a href='${resultado.datos.direccion}' target='_blank'>${resultado.datos.direccion.substring(0, 100)}</a><br>
            Teléfono: <a href='https://wa.me/54${resultado.datos.telefono.trim()}?text=Me comunico desde defensa del consumidor respecto a su expediente *${resultado.idEspecial} ${resultado.datos.apellido} ${resultado.datos.nombres} C/ ${new Intl.ListFormat('es').format(empresasDenunciadas)}*. Le recordamos éste número no tiene la obligación formal de ser usado como canal oficial, solo realizamos una atención especial hacia usted para facilitar el trámite. Para una atención más formal le solicitamos concurra a las oficinas' target='_blank'><b>${resultado.datos.telefono}</b></a><br>
            `,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'
        })
  }


  /* Handle onClick */

  const handleClick = () =>{
      SetExpCreate({
          id: resultado.id,
          idEspecial: resultado.idEspecial,
          nombres: resultado.datos.nombres,
          apellido: resultado.datos.apellido,
          direccion: resultado.datos.direccion,
          localidad: resultado.datos.localidad,
          telefono: resultado.datos.telefono,
          dni: resultado.datos.dni,
          fechaAudiencia: resultado.datos.fechaAudiencia,
          categoria: resultado.datos.categoria,
          detalles: resultado.datos.detalles,
          empresas: resultado.datos.empresas,
          hipervulnerable: resultado.datos.hipervulnerable,
          actuacion: resultado.datos.actuacion,
          creador: resultado.datos.creador
      })

      

      navigate('/created')
  }

  const handleClick2 = () =>{
      SetExpCreate({
          id: resultado.id,
          idEspecial: resultado.idEspecial,
          nombres: resultado.datos.nombres,
          apellido: resultado.datos.apellido,
          direccion: resultado.datos.direccion,
          localidad: resultado.datos.localidad,
          telefono: resultado.datos.telefono,
          dni: resultado.datos.dni,
          fechaAudiencia: resultado.datos.fechaAudiencia,
          categoria: resultado.datos.categoria,
          detalles: resultado.datos.detalles,
          empresas: resultado.datos.empresas,
          hipervulnerable: resultado.datos.hipervulnerable,
          actuacion: resultado.datos.actuacion,
          creador: resultado.datos.creador
      })

      

      navigate('/crear')
  }



  return (
  <div>
    <button onClick={handleClickState} style={style}>
      <h1 style={{fontSize: '24px', textAlign: 'center'}}>{`${resultado.idEspecial}`}</h1>
      <h3 style={{fontSize: '9px', textAlign: 'center'}}>{`${resultado.datos.apellido}, ${resultado.datos.nombres}`}</h3>
      <p style={{fontSize: '9px', textAlign: 'center'}}>{resultado.datos.dni}</p>
      <p style={{fontSize: '9px', textAlign: 'center'}}>{fechaFormat(resultado.datos.fechaAudiencia)}</p>
      
    </button>
    <div style={{display: 'flex', justifyContent: 'space-between', gap: '5px', marginTop: '7px'}}>
          <button
          onClick={()=>handleClick2()}
          style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: palette.gris, fontSize: '9px', width: '40%'}}>Editar</button>
          <button
          onClick={()=>handleClickInfo()}
          style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: palette.gris, fontSize: '9px', width: '40%'}}>👁‍🗨</button>
          <button 
          onClick={()=>handleClick()}
          style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: palette.rojo, fontSize: '9px', width: '40%'}}>PDF</button>
      </div>
  </div>
)
}

export default ExpedienteResultadoActuacionesUltimo