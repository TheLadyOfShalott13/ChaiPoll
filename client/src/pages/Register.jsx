import React from "react";
import Navbar from "../components/Navbar";
import "../styles/register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const [info, setInfo] = useState({});
    const departments = [
        { value: "Tech",        label: "Tech"},
        { value: "Marketing",   label: "Marketing"},
        { value: "Onboarding",  label: "Onboarding"},
        { value: "Finance",     label: "Finance"},
        { value: "Growth",      label: "Growth"},
        { value: "Call Center", label: "Call Center"},
    ]

    const handleChange = (e) => {
        setInfo(
            (prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };


    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:7700/api/users/register",
                info, { withcredentials: false })

            navigate("/login");
        } catch (err) {
            console.log(err)
        }

    };
    return (
        <div className="register">
            <Navbar />
            <div className="registerCard">
                <div className="center">
                    <h1>Join Us Now! :-)</h1>
                    <form>
                        <div className="formInput">
                            <div className="txt_field">
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    name="name"
                                    onChange={handleChange}
                                    id="name"
                                    required />
                            </div>
                            <div className="txt_field">
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    onChange={handleChange}
                                    id="email"
                                    required />
                            </div>
                            <div className="txt_field">
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    onChange={handleChange}
                                    id="password"
                                    required />
                            </div>
                            <div className="txt_field">
                                <input
                                    type="text"
                                    placeholder="Enter Phone"
                                    name="phone"
                                    onChange={handleChange}
                                    id="phone"
                                    required />
                            </div>
                            <div>
                                <Select
                                    className="registerDept"
                                    options={departments}
                                    onChange={ (e)=> info["department"] = e.value }
                                    id="giftee">
                                </Select>
                            </div>
                        </div>
                        <div className="login_button">
                            <button className="button"
                                    onClick={handleClick}>
                                Register
                            </button>
                        </div>
                        <div className="signup_link">
                            <p>
                                Already Registered?&nbsp;
                                <Link to="/login">Login Now</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Register;
