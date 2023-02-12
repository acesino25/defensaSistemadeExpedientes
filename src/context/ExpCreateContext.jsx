import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

export const ExpCreateExpContext = createContext()

const ExpCreateExpProvider = ({children})=>{
    const [expCreate, SetExpCreate] = useState({
        idEspecial: '',
        nombres: '',
        apellido: '',
        direccion: '',
        localidad: '',
        telefono: '',
        dni: '',
        fechaAudiencia: '',
        detalles: '',
        empresas: '',
        hipervulnerable: false,
        actuacion: false,
        creador: '1'
    })

    return(
        <ExpCreateExpContext.Provider value={{expCreate, SetExpCreate}}>
            {children}
        </ExpCreateExpContext.Provider>
    )
}

export default ExpCreateExpProvider;

export const useExpContext = () => useContext(ExpCreateExpContext);