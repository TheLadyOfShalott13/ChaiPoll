import React from 'react'
import "../../styles/tables.css"
import axios from 'axios';
import {faTrash, faEdit, faEye, faCheckToSlot, faBellConcierge} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {

    const api_url_prefix = import.meta.env.VITE_BACKEND_URL

    const trashClick = async () => {
        try {
            await axios.delete(
                `${api_url_prefix}/api/restaurants/delete/${id}`,
                { withCredentials: false })
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    const createPoll = async () => {
        try {
            await axios.post(
                `${api_url_prefix}/api/poll/create`,
                { restoId: id, pollStart: "2024-11-07 00:00:00" },
                { headers: { "Content-Type": "application/json" } })
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

            <Link to={`/ViewMenu/${id}`} >
                <span data-tooltip-id="view-menu-helper" data-tooltip-content="View Menu">
                    <FontAwesomeIcon className="tableOptions" icon={faBellConcierge} />
                </span>
                <Tooltip id="view-menu-helper"></Tooltip>
            </Link>

            <span data-tooltip-id="poll-restaurant-helper" data-tooltip-content="Create Poll">
                <FontAwesomeIcon className="tableOptions" icon={faCheckToSlot} onClick={createPoll} />
            </span>
            <Tooltip id="poll-restaurant-helper"></Tooltip>
        </div>
    )
}

export default Options;