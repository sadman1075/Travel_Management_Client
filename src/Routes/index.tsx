
import AdminLayout from "@/components/Layout/AdminLayout"
import CommonLayout from "@/components/Layout/ComonLayout"
import About from "@/pages/About"
import Home from "@/pages/Home"
import LoginPage from "@/pages/Login"
import RegistrationPage from "@/pages/Registration"
import Verify from "@/pages/Verify"

import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
    {
        Component:CommonLayout,
        path: "/",
        children: [
            {
                Component: Home,
                path: "/"
            },
            {
                Component: About,
                path: "/about"
            }
        ]
    },
    {
        Component: LoginPage,
        path: "/login"
    },
    {
        Component: RegistrationPage,
        path: "/registration"
    },
    {
        Component: Verify,
        path: "/verify"
    },
    {
        Component: AdminLayout,
        path: "/admin-layout"
    }

])