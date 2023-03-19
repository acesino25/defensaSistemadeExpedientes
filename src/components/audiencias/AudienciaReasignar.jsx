import React from 'react'

import { useExpContext } from '../../context/ExpCreateContext'
import { useUserContext } from '../../context/UserContext'
import AudienciaReasignarForm from './AudienciaReasignarForm'

const AudienciaReasignar = () => {

    /* useContext */

    /* User context */
    const {user} = useUserContext()
    /* Exp context */
    const {expCreate} = useExpContext()
    console.log(expCreate)

  return (
    <div>
        {
            expCreate == null ? ('Loading...') : <AudienciaReasignarForm expediente={expCreate}></AudienciaReasignarForm>
        }
    </div>
  )
}

export default AudienciaReasignar