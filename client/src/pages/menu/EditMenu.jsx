import React, { useState, useEffect } from "react";
import Navbar from '../../components/Navbar'
import axios from "axios";
import "../../styles/forms.css"
import { useParams } from "react-router-dom";
import Select from "react-select";

const EditMenu = ( {params} ) => {

    const {id} = useParams();
    const [info, setInfo] = useState({});
    const [responseRecieved, setResponseStatus] = useState(false);
    const [data, setData] = useState([]);
    const [categoryOptions, setCategory] = useState([]);
    const [categoryOptionsLoaded, setCategoryOptions] = useState(false);
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL
    const url_redirect_prefix = import.meta.env.VITE_FRONTEND_URL


    useEffect(() => {
        const loadData = async () => {
            setResponseStatus(false);
            axios.get(`${api_url_prefix}/api/menu/get/${id}`).then((response) => {
                setData(response.data);
                setResponseStatus(true);
            }).catch((err) => {
                setResponseStatus(true);		//error state
            });
        };

        if (!responseRecieved) loadData().then();

        async function getCategoryOptions() {
            axios.get(`${api_url_prefix}/api/category/list`).then((response) => {
                if (response.data.length > 0) {
                    response.data.map(function (c, i) {
                        categoryOptions[i] = {value: c.id, label: c.name}
                    });
                    setCategoryOptions(true);
                }
            }).catch((err) => { //error state
                console.log("ERROR FROM CATEGORY LIST API: ")
                console.log(err);
            });
        }

        if (!categoryOptionsLoaded) getCategoryOptions().then();

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
            await axios.put(`${api_url_prefix}/api/menu/update/${id}`,
                info, { headers: { "Content-Type": "application/json" }
                });
            window.location.assign(`${url_redirect_prefix}/ViewMenu/${id}`);
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
                            <h1>Edit A Menu: {data[0].id}</h1>
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

                                <div className="input">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        onChange={handleChange}
                                        value={info.price? info.price : data[0].price}
                                        type="number"
                                        id="price"
                                        placeholder="Enter Price"
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="category">Category</label>
                                    <Select
                                        options={categoryOptions}
                                        onChange={(e) => info["category"] = e.value}
                                        id="category"
                                        defaultValue={{ "value": data[0].category, "label": data[0].category_name}}
                                    ></Select>
                                </div>

                                <div className="input">
                                <label htmlFor="restaurant">Restaurant</label>
                                    <input
                                        type="number"
                                        id="restaurant"
                                        value={id}
                                        readOnly={true}
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
                        <h1>Edit A Menu</h1>
                        <h1 className="feedback-header">Cannot Find Menu</h1>
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
                    <h1>Edit A Menu</h1>
                    <h1 className="feedback-header">Loading Form</h1>
                </div>
            </div>
        </div>)
    }
}

export default EditMenu
