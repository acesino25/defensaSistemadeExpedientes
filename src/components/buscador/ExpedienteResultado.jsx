import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { UserContext, useUserContext } from '../../context/UserContext'
import { palette } from '../../themes/colors'
import wretch from "wretch"
import { server } from '../../data/data'
import { useNavigate } from 'react-router-dom'
import { useExpContext } from '../../context/ExpCreateContext'
import { fechaFormat } from '../../utils/fechaFormat'

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

    /* useNavigate */
    const navigate = useNavigate()

    /* context user */

    const {user} = useUserContext()
    const {expCreate, SetExpCreate} = useExpContext()

    /* useState */
    const emptyState = {
      idEspecial: '',
      estado: '',
      descripcion: ''
    }
    const [estado, setEstado] = useState('')

    /* handleClickInfo */

    const handleClickInfo = () =>{
      const today = Date.now()
      const fechaComparar = new Date(resultado.fechaAudiencia).getTime()

      const styleFecha = {
        color: today > fechaComparar && 'red'
      }

      const empresasDenunciadas = resultado.empresas.split(', ')
      Swal.fire({
          title: `<strong>Expediente ${resultado.idEspecial}</strong>`,
          icon: 'info',
          html:
            `<b>Última audiencia programada para el:</b><br><p style="color:${styleFecha.color}">${fechaFormat(resultado.fechaAudiencia)}</p><br><br>
            <b>DATOS ÚTILES:</b> ${resultado.detalles}<br><br>
            <b><u>DATOS DE CONTACTO:</u></b><br><br>
            Localidad: ${resultado.localidad}<br>
            Dirección: <a href='${resultado.direccion}' target='_blank'>${resultado.direccion.substring(0, 100)}</a><br>
            Teléfono: <a href='https://wa.me/54${resultado.telefono.trim()}?text=Me comunico desde defensa del consumidor respecto a su expediente *${resultado.idEspecial} ${resultado.apellido} ${resultado.nombres} C/ ${new Intl.ListFormat('es').format(empresasDenunciadas)}*. Le recordamos éste número no tiene la obligación formal de ser usado como canal oficial, solo realizamos una atención especial hacia usted para facilitar el trámite. Para una atención más formal le solicitamos concurra a las oficinas' target='_blank'><b>${resultado.telefono}</b></a><br>
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

    const handleClickEdit = () =>{
      SetExpCreate({
          id: resultado.id,
          idEspecial: resultado.idEspecial,
          nombres: resultado.nombres,
          apellido: resultado.apellido,
          direccion: resultado.direccion,
          localidad: resultado.localidad,
          telefono: resultado.telefono,
          dni: resultado.dni,
          fechaAudiencia: resultado.fechaAudiencia,
          categoria: resultado.categoria,
          detalles: resultado.detalles,
          empresas: resultado.empresas,
          hipervulnerable: resultado.hipervulnerable,
          actuacion: resultado.actuacion,
          creador: resultado.creador
      })

      

      navigate('/crear')
  }

    const handleClickPdf = () =>{
        SetExpCreate({
            id: resultado.id,
            idEspecial: resultado.idEspecial,
            nombres: resultado.nombres,
            apellido: resultado.apellido,
            direccion: resultado.direccion,
            localidad: resultado.localidad,
            telefono: resultado.telefono,
            dni: resultado.dni,
            fechaAudiencia: resultado.fechaAudiencia,
            categoria: resultado.categoria,
            detalles: resultado.detalles,
            empresas: resultado.empresas,
            hipervulnerable: resultado.hipervulnerable,
            actuacion: resultado.actuacion,
            creador: resultado.creador
        })

        

        navigate('/created')
    }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <button onClick={handleClick} style={style}>
          <div>
              <h3>{`${resultado.apellido.toUpperCase()}, ${resultado.nombres}`}</h3>
              <h1 style={{color: palette.lightdarker}}>{resultado.idEspecial == null ? 'NULL':resultado.idEspecial}</h1>
              <p style={{textAlign: 'center'}}><strong style={{textAlign: 'center'}}>
                  {`${resultado.apellido.toUpperCase()}, ${resultado.nombres} C/ ${resultado.empresas}`}</strong></p>

                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
              
          </div>
          </div>
      </button>
      <div style={{display: 'flex', justifyContent: 'space-between', gap:'5px'}}>
          <button
        onClick={()=>handleClickEdit()}
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: palette.gris, fontSize: '9px', width: '40%'}}>Editar</button>
        <button
            onClick={()=>handleClickInfo()}
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: palette.gris, fontSize: '9px', width: '40%'}}>👁‍🗨</button>
        <button 
        onClick={()=>handleClickPdf()}
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: palette.rojo, fontSize: '9px', width: '40%'}}>PDF</button></div>
    </div>

  )
}

export default ExpedienteResultado