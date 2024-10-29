import React from 'react'
import useFetch from '../../useFetch'
import { Link } from "react-router-dom";
import MainTable from '../../components/MainTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Button} from "react-bootstrap";

const DisplayOrderHistoryTable = ({ type }) => {

    const thead = ['id','order_date','order_time','restaurant','status','options'];
    const options_name = 'order';
    const tbody  = useFetch(`order/list`)?.data

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
