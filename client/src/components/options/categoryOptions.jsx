import React from 'react'
import "../../styles/tables.css"
import axios from 'axios';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {

    const api_url_prefix = import.meta.env.VITE_BACKEND_URL;

    const trashClick = async () => {
        try {
            await axios.delete(
                `${api_url_prefix}/api/category/delete/${id}`,
                { withCredentials: false })
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Link to={`/ViewCategory/${id}`} >
                <span data-tooltip-id="view-category-helper" data-tooltip-content="View Category">
                    <FontAwesomeIcon className="tableOptions" icon={faEye} />
                </span>
                <Tooltip id="view-category-helper"></Tooltip>
            </Link>

            <Link to={`/EditCategory/${id}`} >
                <span data-tooltip-id="edit-category-helper" data-tooltip-content="Edit Category">
                    <FontAwesomeIcon className="tableOptions" icon={faEdit} />
                </span>
                <Tooltip id="edit-category-helper"></Tooltip>
            </Link>

            <span data-tooltip-id="delete-category-helper" data-tooltip-content="Delete Category">
                <FontAwesomeIcon className="tableOptions" icon={faTrash} onClick={trashClick} />
            </span>
            <Tooltip id="delete-category-helper"></Tooltip>
        </div>
    )
}

export default Options;