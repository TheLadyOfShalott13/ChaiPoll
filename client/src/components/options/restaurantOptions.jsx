import React from 'react'
import "../../styles/tables.css"
import axios from 'axios';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {

    const trashClick = async () => {
        try {
            await axios.delete(
                `http://localhost:7700/api/restaurant/delete/${id}`,
                { withCredentials: false })
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Link to={`/ViewRestaurant/${id}`} >
                <span data-tooltip-id="view-restaurant-helper" data-tooltip-content="View Restaurant">
                    <FontAwesomeIcon className="tableOptions" icon={faEye} />
                </span>
                <Tooltip id="view-restaurant-helper"></Tooltip>
            </Link>

            <Link to={`/EditRestaurant/${id}`} >
                <span data-tooltip-id="edit-restaurant-helper" data-tooltip-content="Edit Restaurant">
                    <FontAwesomeIcon className="tableOptions" icon={faEdit} />
                </span>
                <Tooltip id="edit-restaurant-helper"></Tooltip>
            </Link>

            <span data-tooltip-id="delete-restaurant-helper" data-tooltip-content="Delete Restaurant">
                <FontAwesomeIcon className="tableOptions" icon={faTrash} onClick={trashClick} />
            </span>
            <Tooltip id="delete-restaurant-helper"></Tooltip>
        </div>
    )
}

export default Options;