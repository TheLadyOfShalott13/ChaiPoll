import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import MainTable from '../../components/MainTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Button} from "react-bootstrap";
import axios from "axios";

const DisplayPollTable = ({ type }) => {

    const thead = ['id','restaurant_name','restaurant_address','pollStart','pollEnd','status','options'];
    const options_name = 'poll';
    const [tbody, setTbody]  = useState([]);
    const [loaded, setLoadStatus]  = useState(false);
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        async function load_data(){
            axios.get(`${api_url_prefix}/api/poll/list`).then((response) => {
                setTbody(response.data);
                setLoadStatus(true)
            }).catch((err) => { //error state
                console.log("ERROR FROM GET API: ")
                console.log(err);
            });
        }

        if (!loaded)
            load_data().then(() => console.log("loading COMPLETED"));
    }, [tbody]);

    //==========For debugging purposes==============//
    //console.log("SHOWING TBODY================");
    //console.log(tbody);
    //console.log("DISPLAYING STATUS");
    //console.log(loaded);

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View All Polls</h1>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default DisplayPollTable