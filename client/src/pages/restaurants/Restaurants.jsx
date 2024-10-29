import React from 'react'
import useFetch from '../../useFetch'
import { Link } from "react-router-dom";
import MainTable from '../../components/MainTable'
import Navbar from '../../components/Navbar'
import "../../styles/tables.css"
import {Button} from "react-bootstrap";

const DisplayRestaurantTable = ({ type }) => {

    const thead = ['id','name','address','del_mins','landline','whatsapp','options'];
    const options_name = 'restaurant';
    const tbody  = useFetch(`restaurant/list`)?.data

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <div className="title-and-options">
                    <h1>View All Restaurants</h1>
                    <Button className="add-new">
                        <Link to="/CreateRestaurant">Add New Restaurant</Link>
                    </Button>
                </div>
                <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/>
            </div>
        </div>
    )
}

export default DisplayRestaurantTable
