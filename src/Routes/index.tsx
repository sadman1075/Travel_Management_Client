
import AdminLayout from "@/components/Layout/AdminLayout"
import CommonLayout from "@/components/Layout/ComonLayout"
import About from "@/pages/About"
import AddTour from "@/pages/Admin/AddTour"
import Analytics from "@/pages/Admin/Analytics"
import Home from "@/pages/Home"
import LoginPage from "@/pages/Login"
import RegistrationPage from "@/pages/Registration"
import Bookings from "@/pages/user/Bookings"
import Verify from "@/pages/Verify"
import { generateRoutes } from "@/utils/generateRoutes"

import { createBrowserRouter } from "react-router"
import { adminSidebarItems } from "./adminSidebarItems"

export const router = createBrowserRouter([
    {
        Component: CommonLayout,
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
        Component: AdminLayout,
        path: "/admin",
        children: [...generateRoutes(adminSidebarItems)]
    },
    {
        Component: AdminLayout,
        path: "/user",
        children: [
            {
                Component: Bookings,
                path: "bookings"
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