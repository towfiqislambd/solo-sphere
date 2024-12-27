import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div className="container mx-auto px-5">
            <Toaster />
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default Root;