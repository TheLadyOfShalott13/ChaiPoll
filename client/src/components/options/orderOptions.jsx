import React from 'react'
import "../../styles/tables.css"
import { Link } from "react-router-dom";

const Options = ({ id }) => {

    return (
        <div>
            <Link to={`/ViewOrder/${id}`} >View Order</Link>
        </div>
    )
}

export default Options;