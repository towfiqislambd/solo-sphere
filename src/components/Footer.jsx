import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { FaFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaDribbble } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='py-10  border-t container mx-auto px-5'>
            <a className="text-xl text-center justify-center font-semibold flex gap-2 items-center">
                <img src={logo} className="w-8" />
                SoloSphere
            </a>
            <ul className="flex gap-5 justify-center text-gray-500 mt-4">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>About</Link></li>
                <li><Link to='/'>Terms</Link></li>
                <li><Link to='/'>Privacy</Link></li>
                <li><Link to='/'>Cookies</Link></li>
            </ul>
            <div className="divider"></div>
            <div className="flex justify-between">
                <p className='text-gray-500 text-sm'>© Copyright 2024. All Rights Reserved.</p>
                <p className='flex gap-3'>
                    <FaFacebook />
                    <IoLogoLinkedin />
                    <FaDribbble />
                </p>
            </div>
        </footer>
    )
}

export default Footer;