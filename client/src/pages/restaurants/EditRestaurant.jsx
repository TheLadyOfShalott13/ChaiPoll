import React, { useState, useEffect } from "react";
import Navbar from '../../components/Navbar'
import axios from "axios";
import "../../styles/forms.css"
import { useParams } from "react-router-dom";

const EditRestaurant = ( {params} ) => {

    const {id} = useParams();
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const [responseRecieved, setResponseStatus] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            // Till the data is fetch using API
            // the Loading page will show.
            setResponseStatus(false);

            // Await make wait until that
            // promise settles and return its result
            axios.get(`http://localhost:3000/restaurant/get/${id}`).then((response) => {
                setData(response.data);
                setResponseStatus(true);
            }).catch((err) => {
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
        const Fdata = new FormData();
        Object.keys(info).forEach((key)=> {
            Fdata.append(key,info[key]);
            //console.log('DATA VALUE OF '+ key + ': ' + data.get(key))
        });
        if (file){
            Fdata.append("img",file);
            Fdata.append("imgName",file.name);
        }
        try {
            await fetch(`http://localhost:7700/api/restaurant/update/${id}`, {
                method: "PUT",
                body: Fdata,
            });
            window.location.assign('http://localhost:3000/Restaurant');
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
