import { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "../layout/layoutMain";
import Admin from "../pages/Admin";
import AdminCrearUsuario from "../pages/AdminCrearUsuario";
import AdminFechasAudiencia from "../pages/AdminFechasAudiencia";
import ConsultarExpediente from "../pages/ConsultarExpediente";
import CreateExp from "../pages/CreateExp";
import ExpCreatedSuccess from "../pages/ExpCreatedSuccess";

import Home from "../pages/Home";
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
            }
        ]
    }
])

export default router