import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../../components/Navbar'
import VerticalTable from '../../components/VerticalTable'
import "../../styles/tables.css"
import { useParams } from "react-router-dom";

const ViewUser = ({params}) => {

    const {id} = useParams();
    const attributes = ['id','name','email','phone','department'];
    const [responseRecieved, setResponseStatus] = useState(false);
    const [data, setData] = useState([]);
    const option_name = 'user';
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const loadData = async () => {
            // Till the data is fetch using API
            // the Loading page will show.
            setResponseStatus(false);

            // Await make wait until that
            // promise settles and return its result
            axios.get(`${api_url_prefix}/api/users/get/${id}`).then((response) => {
                setData(response.data);
                setResponseStatus(true);
            }).catch((err) => {
                console.log(err);
                setResponseStatus(true);		//error state
            });
            console.log('Completed');
        };

        // Call the function
        if (!responseRecieved) loadData();
    }, []);

    return (
        <div className="table-container">
            <Navbar />
            <h1>View A User</h1>
            {	responseRecieved ? data.length>0 ? <img className="viewImage" src={`http://localhost:7700/uploads/${data[0].imgName}`} alt={data[0].imgName} ></img> : <h1 className="feedback-header">Cannot Find Image</h1> : <h1 className="feedback-header">Loading Image</h1> }
            {	responseRecieved ? data.length>0 ? <VerticalTable attributes={attributes} data={data} option={option_name} /> : <h1 className="feedback-header">Cannot Find Item</h1> : <h1 className="feedback-header">Loading Table</h1> }
        </div>
    )
}

export default ViewUser
