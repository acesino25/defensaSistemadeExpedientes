import React, { useEffect, useState } from 'react'
import { server } from '../../data/data'
import { palette } from '../../themes/colors'
import { fechaFormat } from '../../utils/fechaFormat'

const AudienciasResultado = ({fecha}) => {

    const [resultado, setResultado] = useState(null)

    useEffect(()=>{
        const procesar = () =>{
            const isoString = fecha.toISOString();
            const dateIsoString = isoString.substring(0,10)

            fetch(`http://${server}/audiencias/${dateIsoString}`, {
            method: 'GET',
            })
            .then((response) => {
                if (response.status !== 200) {
                    alert('Ha habido un error al intentar acceder a los expedientes')
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setResultado(data)
                console.log(data)
            })
            .catch((error) => {
                alert('reportar error de sistema')
            });
        }

        fecha && procesar()
    }, [fecha])

  return (
    resultado == null ?
    (<div>
        Cargando...
    </div>):(
        resultado.map((audiencia)=>{
            console.log(audiencia)
            const empresasConY = audiencia.empresas.split(", ")

            const date = new Date(audiencia.fechaAudiencia);
            const hours = date.getHours();
            const minutes = date.getMinutes();

            return <div style={{display: 'flex', backgroundColor: palette.main, 
            borderRadius: '0.2em', 
            width: '90vw', 
            padding: '1em', 
            marginTop:'1em',
            boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)'}}>
                <div style={
                    {
                    display: 'flex',
                    flexDirection: 'column', 
                    width: '90%'

                    }}>
                <h3>{`${audiencia.idEspecial} ${audiencia.apellido} ${audiencia.nombres} C/ ${new Intl.ListFormat("es").format(empresasConY)}`}</h3>
                <p>{fechaFormat(audiencia.fechaAudiencia)}</p>
            </div>
            <div>
                <p style={{fontSize: '36px', fontWeight:'bold', color: 'red'}}>{hours}:{minutes < 10 ? '0' + minutes : minutes}</p>
            </div>
            </div>
        })
    )
  )
}

export default AudienciasResultado