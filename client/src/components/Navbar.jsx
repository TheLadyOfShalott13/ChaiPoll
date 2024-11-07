// src/customers/Navbar.jsx

import '../styles/navbar.css'
import { useContext } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../authContext"


const Navbar = () => {

    const navigate = useNavigate()

    const { user, dispatch } = useContext(AuthContext)
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        navigate("/")
    }
    return (
        <div className='navContainer'>
            <Link to="/">
                <p className='navLogo'>Chai Poll</p>
            </Link>

            <input type="checkbox" id='menu-bar' />
            <label htmlFor="menu-bar">
                <FontAwesomeIcon
                    icon={faBars}
                    className="icon" />
            </label>
            <nav className='navbar'>
                <ul>
                    <Link to="/Poll">
                        <li><p>Poll</p></li>
                    </Link>
                    <Link to="/Category">
                        <li><p>Category</p></li>
                    </Link>
                    <Link to="/Restaurant">
                        <li><p>Restaurants</p></li>
                    </Link>
                    <Link to="/OrderHistory">
                        <li><p>Order History</p></li>
                    </Link>
                    <Link to="/Users">
                        <li><p>Users</p></li>
                    </Link>
                    {user ? (<>

                                <Link to={`/user/${user._id}`}>
                                    <li onClick={handleClick}
                                        style={{ cursor: "pointer" }}>
                                        <p>Logout</p>
                                    </li>
                                    <li id="usernamename"><p>{user.name}</p></li>
                                </Link>
                            </>
                        ) :
                        (
                            <>
                                <Link to="/Register">
                                    <li><p>Register</p></li>
                                </Link>
                                <Link to="/Login">
                                    <li><p>Login</p></li>
                                </Link>
                            </>
                        )}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
