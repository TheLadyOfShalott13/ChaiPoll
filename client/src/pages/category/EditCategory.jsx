import React, { useState, useEffect } from "react";
import Navbar from '../../components/Navbar'
import axios from "axios";
import "../../styles/forms.css"
import { useParams } from "react-router-dom";

const EditCategory = ( {params} ) => {

    const {id} = useParams();
    const [info, setInfo] = useState({});
    const [responseRecieved, setResponseStatus] = useState(false);
    const [data, setData] = useState([]);
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL;
    const url_redirect_prefix = import.meta.env.VITE_FRONTEND_URL;

    useEffect(() => {
        const loadData = async () => {
            // Till the data is fetch using API
            // the Loading page will show.
            setResponseStatus(false);

            // Await make wait until that
            // promise settles and return its result
            axios.get(`${api_url_prefix}/api/category/get/${id}`).then((response) => {
                setData(response.data);
                setResponseStatus(true);
            }).catch((err) => {
                console.log(err);
                setResponseStatus(true);		//error state
            });
            console.log('Completed');
        };

        // Call the function
        loadData();
    }, []);

    const handleChange = (e) => {
        setInfo(
            (prev) => ({
                    ...prev, [e.target.id]: e.target.value
                }
            ));
    };

    const handleClick = async(e) => {
        e.preventDefault();
        try {
            axios.put(
                    `${api_url_prefix}/api/category/update/${id}`,
                    info,
                    { headers: { "Content-Type": "application/json" } }
                ).then((response) => {
                    //console.log("checking response");
                    //console.log(response);
            }).catch((err) => {
                console.log(err);
                setResponseStatus(true);		//error state
            });
            window.location.assign(`${url_redirect_prefix}/Category`);
        } catch (err) {
            console.log(err);
        }
    }


    if (responseRecieved) {
        if (data.length>0) {
            return (
                <div className="newFormContainer">
                    <Navbar />
                    <div className="cpContainer">
                        <div className="formContainer">
                            <h1>Edit A Category: {data[0].id}</h1>
                            <div className="inputContainer">
                                <div className="input">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        onChange={handleChange}
                                        value={info.name? info.name : data[0].name}
                                        type="text"
                                        id="name"
                                        placeholder="Enter Name"
                                    />
                                </div>

                                <button className="button"
                                        onClick={handleClick} type="submit">
                                    Save New Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (<div className="newFormContainer">
                <Navbar />
                <div className="cpContainer">
                    <div className="formContainer">
                        <h1>Edit A Category</h1>
                        <h1 className="feedback-header">Cannot Find Category</h1>
                    </div>
                </div>
            </div>)
        }
    }
    else {
        return (<div className="newFormContainer">
            <Navbar />
            <div className="cpContainer">
                <div className="formContainer">
                    <h1>Edit A Category</h1>
                    <h1 className="feedback-header">Loading Form</h1>
                </div>
            </div>
        </div>)
    }
}

export default EditCategory
