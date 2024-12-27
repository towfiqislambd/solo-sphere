import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import useAuth from './useAuth';

const Navbar = () => {
    const { user, signOutUser } = useAuth()
    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-medium">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/all-jobs'>All Jobs</NavLink></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl flex gap-2 items-center">
                    <img src={logo} className="w-8" />
                    SoloSphere
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/all-jobs'>All Jobs</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className="dropdown z-40">
                            <img tabIndex={0} role="button" title={user.displayName} src={user.photoURL} className="w-10 h-10 rounded-full border" />
                            <ul tabIndex={0} className="dropdown-content menu border bg-white rounded-lg z-[1] w-52 p-2 shadow -right-5">
                                <li><Link to='/add-job'>Add Job</Link></li>
                                <li><Link to='/myPostedJobs'>My Posted Jobs</Link></li>
                                <li><Link to={`/myBids/${user?.email}`}>My Bids</Link></li>
                                <li><Link to={`/bidRequests/${user?.email}`}>Bid Requests</Link></li>
                                <Link to='/login' onClick={signOutUser} className="bg-gray-600 text-center block mt-2 text-gray-200 font-medium px-3 py-1 rounded">Log Out</Link>
                            </ul>
                        </div>
                        :
                        <div className="flex gap-2">
                            <Link to='/login' className="bg-gray-800 text-gray-200 font-medium px-3 py-1 rounded">Login</Link>
                            <Link to='/register' className="bg-gray-800 text-gray-200 font-medium px-3 py-1 rounded">Register</Link>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar;