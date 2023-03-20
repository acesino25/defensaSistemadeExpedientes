import React, { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import {PDFTemplate} from '../components/pdf/PDFTemplate'
import { useExpContext } from '../context/ExpCreateContext'
import { palette } from '../themes/colors'
import { PDFNotificar } from '../components/pdf/PDFNotificar'

const ExpCreatedSuccess = () => {

  const {expCreate, SetExpCreate} = useExpContext()

  /* useState electronico */

  const [electronico, setElectronico] = useState(false)
  console.log(electronico)

  /* useState Fojas */
  const [fojas, setFojas] = useState(0)

  /* useState Empresas */

  const [empresas, setEmpresas] = useState([])

  const arrExp = expCreate.empresas.split(',')

  useEffect(()=>{
    
    const newArray = arrExp.map((element)=>{
      return {name: element, mail: ''}
    })

    setEmpresas(newArray)
    console.log(empresas)
  },[])

 
  console.log(arrExp)

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', aligntItems: 'center'}}>

        <label htmlFor="">¿Alguno es Electrónico?
          <input 
          onChange={()=>setElectronico(!electronico)}
          type="checkbox" />
        </label>

        <label htmlFor="fojas">
              Fojas:
                <input type="number" id='fojas' name='fojas' onChange={(e)=>{setFojas(e.target.value)}} />
        </label>

          {
            arrExp.map((empresa)=>{
              return (
                <label style={{border: 'solid 2px black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '1em', padding: '0.5em'}}>{empresa}
                  <input style={{padding:'2px'}} 
                  onChange={(e)=>setEmpresas(empresas.map((element)=> element.name === e.target.name ? {...element, mail: e.target.value} : element))}
                  type="text" name={empresa}></input>
                  
                  <PDFDownloadLink style={{display: 'flex', justifyContent: 'center', aligntItems: 'center', marginTop: '0.2em', marginBottom: '0.5em'}} document={<PDFNotificar datos={expCreate} setDatos={SetExpCreate} empresa={empresa} empresas={empresas} fojas={fojas} electronico={electronico} />} fileName='expediente.pdf'>
                      <button style={{fontSize: '9px', backgroundColor: palette.rojo}}><b>📩Notificar a:</b> {empresa}</button>
                  </PDFDownloadLink>
                </label>)
            })
          }

        <PDFDownloadLink style={{display: 'flex', justifyContent: 'center', aligntItems: 'center', marginTop: '2em'}} document={<PDFTemplate datos={expCreate} setDatos={SetExpCreate} empresas={empresas} electronico={electronico} />} fileName='expediente.pdf'>
            <button>PRIMER DECRETO</button>
        </PDFDownloadLink>
    </div>
  )
}

export default ExpCreatedSuccess