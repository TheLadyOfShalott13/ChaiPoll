import React, {useEffect, useState} from "react";
import Navbar from '../../components/Navbar'
import "../../styles/forms.css"
import {useParams} from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const CreateMenu = () => {

    const {id} = useParams();
    const [info, setInfo] = useState({"restaurant":id});
    const [categoryOptions, setCategory] = useState([]);
    const [categoryOptionsLoaded, setCategoryOptions] = useState(false);
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL
    const url_redirect_prefix = import.meta.env.VITE_FRONTEND_URL

    useEffect(()=> {

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

    },[]);

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
            await axios.post(`${api_url_prefix}/api/menu/create`,
                info, { headers: { "Content-Type": "application/json" }
            });
            window.location.assign(`${url_redirect_prefix}/ViewMenu/${id}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="newFormContainer">
            <Navbar />
            <div className="cpContainer">
                <div className="formContainer">
                    <h1>Add A New Menu Item</h1>
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
                            <label htmlFor="price">Price</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                id="price"
                                placeholder="Enter Price"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="category">Category</label>
                            <Select options={categoryOptions} onChange={ (e)=> info["category"] = e.value } id="category"></Select>
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
                            Save New Entry
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMenu
