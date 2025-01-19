import React from 'react'
import "../../styles/tables.css"
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {

    return (
        <div>
            <Link to={`/ViewUser/${id}`} >
                <span data-tooltip-id="view-category-helper" data-tooltip-content="View Category">
                    <FontAwesomeIcon className="tableOptions" icon={faEye} />
                </span>
                <Tooltip id="view-category-helper"></Tooltip>
            </Link>
        </div>
    )
}

export default Options;