import React, { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import {PDFTemplate} from '../components/pdf/PDFTemplate'
import { useExpContext } from '../context/ExpCreateContext'

const ExpCreatedSuccess = () => {

  const {expCreate, SetExpCreate} = useExpContext()

  return (
    <div>

        <PDFDownloadLink document={<PDFTemplate datos={expCreate} setDatos={SetExpCreate} />} fileName='expediente.pdf'>
            <button>Download</button>
        </PDFDownloadLink>
    </div>
  )
}

export default ExpCreatedSuccess