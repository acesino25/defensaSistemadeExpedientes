import React from 'react'

const ExpedientesRecientes = () => {
    
    wretch("http://127.0.0.1:8000/expedientes/10")
    .get()
    .notFound(error => { /* ... */ })
    .unauthorized(error => { /* ... */ })
    .error(418, error => { /* ... */ })
    .res(response => {
        
        console.log(response)

    })
    .catch(error => { /* uncaught errors */ })

  return (
    <div>
        
    </div>
  )
}

export default ExpedientesRecientes