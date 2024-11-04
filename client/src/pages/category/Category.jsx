import React from 'react'
import { Link } from "react-router-dom";
import MainTable from '../../components/MainTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Button} from "react-bootstrap";

const DisplayCategoryTable = ({ type }) => {

    const thead = ['id','name','options'];
    const options_name = 'category';
    const tbody  = []
    //const tbody  = useFetch(`category/list`)?.data

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View All Categories</h1>
                    <Button className="add-new">
                        <Link to="/CreateCategory">Add New Category</Link>
                    </Button>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default DisplayCategoryTable
