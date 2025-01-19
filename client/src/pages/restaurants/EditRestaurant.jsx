import React, { useState, useEffect } from "react";
import Navbar from '../../components/Navbar'
import axios from "axios";
import "../../styles/forms.css"
import { useParams } from "react-router-dom";

const EditRestaurant = ( {params} ) => {

    const {id} = useParams();
    const [info, setInfo] = useState({});
    const [responseRecieved, setResponseStatus] = useState(false);
    const [data, setData] = useState([]);
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL
    const url_redirect_prefix = import.meta.env.VITE_FRONTEND_URL;


    useEffect(() => {
        const loadData = async () => {
            // Till the data is fetch using API
            // the Loading page will show.
            setResponseStatus(false);

            // Await make wait until that
            // promise settles and return its result
            axios.get(`${api_url_prefix}/api/restaurants/get/${id}`).then((response) => {
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
                `${api_url_prefix}/api/restaurants/update/${id}`,
                info,
                { headers: { "Content-Type": "application/json" } }
            ).then((response) => {
                //console.log("checking response");
                //console.log(response);
                //console.log("checking request");
                //console.log(info);
            }).catch((err) => {
                console.log(err);
                setResponseStatus(true);		//error state
            });
            window.location.assign(`${url_redirect_prefix}/Restaurant`);
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
                            <h1>Edit A Restaurant: {data[0].id}</h1>
                            <div className="inputContainer">
                                <div className="input">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        id="name"
                                        value={info.name? info.name : data[0].name}
                                        placeholder="Enter Name"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        id="address"
                                        value={info.address? info.address : data[0].address}
                                        placeholder="Enter Address"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="del_mins">Delivery Time (in mins)</label>
                                    <input
                                        onChange={handleChange}
                                        type="number"
                                        id="del_mins"
                                        value={info.del_mins? info.del_mins : data[0].del_mins}
                                        placeholder="Enter Delivery Time (in mins)"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="landline">Landline</label>
                                    <input
                                        onChange={handleChange}
                                        type="number"
                                        id="landline"
                                        value={info.landline? info.landline : data[0].landline}
                                        placeholder="Enter Landline"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="whatsapp">Whatsapp Number</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        id="whatsapp"
                                        value={info.whatsapp? info.whatsapp : data[0].whatsapp}
                                        placeholder="Enter whatsapp number"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="opt_mobile">Additional Contact Number</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        id="opt_mobile"
                                        value={info.opt_mobile? info.opt_mobile : data[0].opt_mobile}
                                        placeholder="Enter Additional Contact Number"
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
                        <h1>Edit A Restaurant</h1>
                        <h1 className="feedback-header">Cannot Find Restaurant</h1>
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
                    <h1>Edit A Restaurant</h1>
                    <h1 className="feedback-header">Loading Form</h1>
                </div>
            </div>
        </div>)
    }
}

export default EditRestaurant
