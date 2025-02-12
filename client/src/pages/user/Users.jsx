import React, {useEffect, useState} from 'react'
import MainTable from '../../components/MainTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import axios from "axios";

const DisplayUserTable = ({ type }) => {

    const thead = ['id','name','department','options'];
    const options_name = 'user';
    const [tbody, setTbody]  = useState([]);
    const [loaded, setLoadStatus]  = useState(false);
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        async function load_data(){
            axios.get(`${api_url_prefix}/api/users/list`).then((response) => {
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

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View All Users</h1>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default DisplayUserTable
