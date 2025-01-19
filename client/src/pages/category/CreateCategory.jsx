import React, { useState } from "react";
import Navbar from '../../components/Navbar'
import "../../styles/forms.css"
import axios from "axios";

const CreateCategory = () => {

    const [info, setInfo] = useState({});
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL;
    const url_redirect_prefix = import.meta.env.VITE_FRONTEND_URL;

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
                `${api_url_prefix}/api/category/create`,
                info,
                { headers: { "Content-Type": "application/json" } }
            ).then((response) => {
                console.log("checking response");
                console.log(response);
                console.log("checking request");
                console.log(info);
            }).catch((err) => {
                console.log(err);
            });
            window.location.assign(`${url_redirect_prefix}/Category`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="newFormContainer">
            <Navbar />
            <div className="cpContainer">
                <div className="formContainer">
                    <h1>Add A New Category</h1>
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

export default CreateCategory
