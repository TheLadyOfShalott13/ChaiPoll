import React, { useState } from "react";
import Navbar from '../../components/Navbar'
import "../../styles/forms.css"

const CreateCategory = () => {

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
                await fetch("http://localhost:7700/api/category/create", {
                    method: "POST",
                    body: data,
                });
                window.location.assign('http://localhost:3000/Category');
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

                        <div className="input">
                            <label htmlFor="img">Image</label>
                            <input
                                type="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                                id="img"
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
