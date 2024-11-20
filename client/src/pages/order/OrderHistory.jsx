import React, {useEffect, useState} from 'react'
import MainTable from '../../components/MainTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import axios from "axios";

const DisplayOrderHistoryTable = ({ type }) => {

    const thead = ['id','order_datetime','restaurant_name','restaurant_address','status','options'];
    const options_name = 'order';
    const [tbody,setTbody] = useState([]);
    const [dataLoad,setdataLoad] = useState(true);
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        async function loadData(){
            axios.get(`${api_url_prefix}/api/order/list`).then((response) => {
                setTbody(response.data);
                setdataLoad(false);
            }).catch((err) => { //error state
                console.log("ERROR FROM GET API: ")
                console.log(err);
            });
        }

        if (dataLoad)
            loadData().then();

    }, [tbody, dataLoad]);

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View Order History</h1>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default DisplayOrderHistoryTable
