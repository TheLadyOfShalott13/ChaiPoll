import React, {useEffect, useState} from 'react'
import MainTable from '../../components/MainTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import axios from "axios";

const DisplayOrderHistoryTable = ({ type }) => {

    const thead = ['id','order_date','order_time','restaurant','status','options'];
    const options_name = 'order';
    const [tbody,setTbody] = useState([]);
    const [dataLoad,setdataLoad] = useState(true);

    useEffect(() => {
        async function loadData(){
            axios.get(`http://localhost:7700/api/order/list`).then((response) => {
                console.log("DISPLAY RESPONSE:");
                console.log(response.data);
                setdataLoad(false);
            }).catch((err) => { //error state
                console.log("ERROR FROM GET API: ")
                console.log(err);
            });
        }

        if (dataLoad)
            loadData();

    }, []);

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View Pending Order History</h1>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default DisplayOrderHistoryTable
