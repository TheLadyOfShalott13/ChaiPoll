import React from 'react'
import "../../styles/tables.css"
import axios from 'axios';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {

    const api_url_prefix = import.meta.env.VITE_BACKEND_URL;

    const closePoll = async () => {
        try {
            await axios.put(
                `${api_url_prefix}/api/poll/update/${id}`,
                { "pollEnd" : new Date().toISOString() },
                { "headers": { "Content-Type": "application/json" } })
                .then((response)=>{
                    //console.log("UPDATE SUCCESSFUL: ");
                    //console.log(response);
                })
            window.location.reload();
        }
        catch (err) {
            console.log("ERROR: ")
            console.log(err)
        }
    }


    return (
        <div>
            <span data-tooltip-id="delete-poll-helper" data-tooltip-content="Close Poll">
                <FontAwesomeIcon className="tableOptions" icon={faCalendarCheck} onClick={closePoll} />
            </span>
            <Tooltip id="delete-poll-helper"></Tooltip>
        </div>
    )
}

export default Options;