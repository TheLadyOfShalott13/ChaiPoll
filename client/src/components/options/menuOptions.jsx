import React from 'react'
import "../../styles/tables.css"
import axios from 'axios';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {

    const api_url_prefix = import.meta.env.VITE_BACKEND_URL;

    const trashClick = async () => {
        try {
            await axios.delete(
                `${api_url_prefix}/api/menu/delete/${id}`,
                { withCredentials: false })
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Link to={`/EditMenu/${id}`} >
                <span data-tooltip-id="edit-menu-helper" data-tooltip-content="Edit Menu">
                    <FontAwesomeIcon className="tableOptions" icon={faEdit} />
                </span>
                <Tooltip id="edit-menu-helper"></Tooltip>
            </Link>

            <span data-tooltip-id="delete-menu-helper" data-tooltip-content="Delete Menu">
                <FontAwesomeIcon className="tableOptions" icon={faTrash} onClick={trashClick} />
            </span>
            <Tooltip id="delete-menu-helper"></Tooltip>
        </div>
    )
}

export default Options;