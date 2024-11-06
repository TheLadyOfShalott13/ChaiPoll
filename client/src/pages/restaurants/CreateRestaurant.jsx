import React, { useState } from "react";
import Navbar from '../../components/Navbar'
import "../../styles/forms.css"
import axios from "axios";

const CreateRestaurant = () => {

    const [info, setInfo] = useState({});
    const url_prefix = `http://${import.meta.env.VITE_SERVER}:${import.meta.env.VITE_API_PORT}`;
    const url_redirect_prefix = `http://${import.meta.env.VITE_SERVER}:${import.meta.env.VITE_HTTP_PORT}`;

    const handleChange = (e) => {
        setInfo(
            (prev) => ({
                    ...prev, [e.target.id]: e.target.value
                }
            ));
        //console.log(data)
    };

    const handleClick = async(e) => {
        e.preventDefault();
        try {
            axios.post(
                `${url_prefix}/api/restaurants/create`,
                info,
                { headers: { "Content-Type": "application/json" } }
            ).then((response) => {
                //console.log("checking response");
                //console.log(response);
                //console.log("checking request");
                //console.log(info);
            }).catch((err) => {
                console.log(err);
            });
            window.location.assign(`${url_redirect_prefix}/Restaurant`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="newFormContainer">
            <Navbar />
            <div className="cpContainer">
                <div className="formContainer">
                    <h1>Add A New Restaurant</h1>
                    <div className="inputContainer">
                        <div className="input">
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="name"
                                placeholder="Enter Name"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="address">Address</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="address"
                                placeholder="Enter Address"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="del_mins">Delivery Time (in mins)</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                id="del_mins"
                                placeholder="Enter Delivery Time (in mins)"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="landline">Landline</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                id="landline"
                                placeholder="Enter Landline"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="whatsapp">Whatsapp Number</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="whatsapp"
                                placeholder="Enter whatsapp number"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="opt_mobile">Additional Contact Number</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="opt_mobile"
                                placeholder="Enter Additional Contact Number"
                            />
                        </div>

                        <button className="button"
                                onClick={handleClick} type="submit">
                            Save New Entry
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRestaurant
