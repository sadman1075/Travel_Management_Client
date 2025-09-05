
import Footer from "./Footer";
import { Outlet } from "react-router";
import Navbar from "./Navbar";




export default function CommonLayout() {
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