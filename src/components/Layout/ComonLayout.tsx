
import Footer from "./Footer";
import { Outlet } from "react-router";
import Navbar from "./Navbar";




export default function CommonLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="grow-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}