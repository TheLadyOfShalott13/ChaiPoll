import React, { useState } from "react";
import Navbar from '../../components/Navbar'
import "../../styles/forms.css"

const CreateRestaurant = () => {

    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);

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
        if (file) {
            const data = new FormData();
            Object.keys(info).forEach((key)=> {
                data.append(key,info[key]);
                //console.log('DATA VALUE OF '+ key + ': ' + data.get(key))
            });
            data.append("img",file);
            data.append("imgName",file.name);
            try {
                await fetch("http://localhost:7700/api/restaurant/create", {
                    method: "POST",
                    body: data,
                });
                window.location.assign('http://localhost:3000/Restaurant');
            } catch (err) {
                console.log(err);
            }
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
