import React from 'react'
import ReactDOM from 'react-dom/client'

// Extra imports
import { RouterProvider } from 'react-router-dom'
import router from './router'

import './index.css'
import { PDFViewer } from '@react-pdf/renderer'
import ExpCreateExpProvider from './context/ExpCreateContext'
import UserProvider from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ExpCreateExpProvider>
        <RouterProvider router={router}></RouterProvider>
      </ExpCreateExpProvider>
    </UserProvider>
  </React.StrictMode>,
)
