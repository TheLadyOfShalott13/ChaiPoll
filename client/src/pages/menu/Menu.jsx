import React from 'react'
import useFetch from '../../useFetch'
import { Link } from "react-router-dom";
import MainTable from '../../components/MainTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Button} from "react-bootstrap";

const DisplayMenuTable = ({ type }) => {

    const thead = ['id','name','options'];
    const options_name = 'menu';
    const tbody  = useFetch(`menu/list`)?.data

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

export default DisplayMenuTable
