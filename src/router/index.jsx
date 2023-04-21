import { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import TemporizadorPagina from "../components/temporizador/TemporizadorPagina";
import LayoutMain from "../layout/layoutMain";
import Actuaciones from "../pages/Actuaciones";
import Admin from "../pages/Admin";
import AdminContador from "../pages/AdminContador";
import AdminCrearUsuario from "../pages/AdminCrearUsuario";
import AdminFechasAudiencia from "../pages/AdminFechasAudiencia";
import AudienciaReasignarPage from "../pages/AudienciaReasignarPage";
import Audiencias from "../pages/Audiencias";
import ConsultarExpediente from "../pages/ConsultarExpediente";
import CreateExp from "../pages/CreateExp";
import ExpCreatedSuccess from "../pages/ExpCreatedSuccess";

import Home from "../pages/Home";
import Temporizador from "../pages/Temporizador";
import UserLogin from "../pages/UserLogin";


const router = createBrowserRouter(
    [
    {
        path: "/",
        element: <LayoutMain></LayoutMain>,
        children:[
            {
                index: true,
                element: <Home></Home>
            },{
                path: '/crear',
                element: <CreateExp />
            },{
                path: '/created',
                element: <ExpCreatedSuccess />
            },{
                path: '/consultar',
                element: <ConsultarExpediente></ConsultarExpediente>
            },{
                path: '/login',
                element: <UserLogin></UserLogin>
            },{
                path: '/audiencias',
                element: <Audiencias></Audiencias>
            },{
                path: '/actuaciones',
                element: <Actuaciones></Actuaciones>
            },{
                path: '/home',
                element: <Home />
            }
        ]
    },{
        path: "/admin",
        element: <LayoutMain></LayoutMain>,
        children:[
            {
                index: true,
                element: <Admin></Admin>
            },{
                path: '/admin/fechas',
                element: <AdminFechasAudiencia></AdminFechasAudiencia>
            },{
                path: '/admin/usuarios',
                element: <AdminCrearUsuario></AdminCrearUsuario>
            },{
                path: '/admin/contador',
                element: <AdminContador></AdminContador>
            },{
                path: '/admin/temporizador',
                element: <Temporizador></Temporizador>
            },{
                path: '/admin/reasignarAudiencia',
                element: <AudienciaReasignarPage></AudienciaReasignarPage>
            }
        ]
    }
])

export default router