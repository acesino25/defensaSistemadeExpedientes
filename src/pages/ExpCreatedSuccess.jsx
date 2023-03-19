import React, { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import {PDFTemplate} from '../components/pdf/PDFTemplate'
import { useExpContext } from '../context/ExpCreateContext'

const ExpCreatedSuccess = () => {

  const {expCreate, SetExpCreate} = useExpContext()

  /* useState electronico */

  const [electronico, setElectronico] = useState(false)
  console.log(electronico)

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

        <label htmlFor="">¿Electrónico?
          <input 
          onChange={()=>setElectronico(!electronico)}
          type="checkbox" />
        </label>

          {
            arrExp.map((empresa)=>{
              return (
                <label>{empresa}
                  <input 
                  onChange={(e)=>setEmpresas(empresas.map((element)=> element.name === e.target.name ? {...element, mail: e.target.value} : element))}
                  type="text" name={empresa}></input>
                </label>)
            })
          }

        <PDFDownloadLink style={{display: 'flex', justifyContent: 'center', aligntItems: 'center', marginTop: '2em'}} document={<PDFTemplate datos={expCreate} setDatos={SetExpCreate} empresas={empresas} electronico={electronico} />} fileName='expediente.pdf'>
            <button>Download</button>
        </PDFDownloadLink>
    </div>
  )
}

export default ExpCreatedSuccess