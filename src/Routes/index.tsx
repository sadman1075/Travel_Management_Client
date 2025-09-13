
import CommonLayout from "@/components/Layout/ComonLayout"
import About from "@/pages/About"
import Home from "@/pages/Home"
import LoginPage from "@/pages/Login"
import RegistrationPage from "@/pages/Registration"
import Verify from "@/pages/Verify"
import { generateRoutes } from "@/utils/generateRoutes"

import { createBrowserRouter, Navigate } from "react-router"
import { adminSidebarItems } from "./adminSidebarItems"
import DashboardLayout from "@/components/Layout/DashboardLayout"
import { userSidebarItems } from "./userSidebarItems"
import UnAuthorized from "@/pages/UnAuthorized"
import { withAuth } from "@/utils/withAuth"
import type { TRole } from "@/types"
import { role } from "@/constants/role"
import Tours from "@/pages/Tours"
import ToursDetails from "@/pages/ToursDetails"

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
                Component: Tours,
                path: "/tours"
            },
            {
                Component: ToursDetails,
                path: "/tour/:id"
            },
            {
                Component: About,
                path: "/about"
            }
        ]
    },
    //dashboard layout for admin
    {
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to="/admin/analytics"></Navigate> },
            ...generateRoutes(adminSidebarItems)
        ]
    },


    // dashboard layout for user
    {
        Component: withAuth(DashboardLayout, role.user as TRole),
        path: "/user",
        children: [...generateRoutes(userSidebarItems)]
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
        Component: UnAuthorized,
        path: "/unauthorized"
    },


])