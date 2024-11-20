import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Link, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import MainTable from "../../components/MainTable.jsx";

const ViewMenu = ({params}) => {

    const {id} = useParams();
    const thead = ['id','name','price','category_name','restaurant_name','restaurant_address','options'];
    const [responseRecieved, setResponseStatus] = useState(false);
    const [tbody, setTbody] = useState([]);
    const options_name = 'menu';
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const loadData = async () => {
            setResponseStatus(false);
            axios.get(`${api_url_prefix}/api/menu/list/${id}`).then((response) => {
                setTbody(response.data);
                setResponseStatus(true);
            }).catch((err) => {
                setResponseStatus(true);
            });
            console.log('Completed');
        };

        if (!responseRecieved) loadData().then();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View All Menu Items</h1>
                    <Button className="add-new">
                        <Link to="/CreateMenu">Add New Menu</Link>
                    </Button>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default ViewMenu
