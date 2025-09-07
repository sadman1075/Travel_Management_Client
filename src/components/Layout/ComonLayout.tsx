
import Footer from "./Footer";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "@/Routes/adminSidebarItems";




export default function CommonLayout() {
 console.log(generateRoutes(adminSidebarItems));

    return (
        <div className=" flex flex-col min-h-screen">
            <Navbar />

            <div className="grow-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}