
import AdminLayout from "@/components/Layout/AdminLayout"
import CommonLayout from "@/components/Layout/ComonLayout"
import Home from "@/pages/Home/Home"

import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
    {
        Component: CommonLayout,
        path: "/",
        children: [
            {
                Component: Home,
                path: "/"
            }
        ]
    },
    {
        Component: AdminLayout,
        path: "/admin-layout"
    }

])