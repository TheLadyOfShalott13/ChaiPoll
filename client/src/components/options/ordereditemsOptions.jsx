import React from 'react'
import "../../styles/tables.css"
import axios from 'axios';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from 'react-tooltip'

const Options = ({ id }) => {

    const api_url_prefix = import.meta.env.VITE_BACKEND_URL;

    const setPaid = async () => {
        try {
            await axios.put(
                `${api_url_prefix}/api/ordereditems/update/${id}`,
                { "paid_on" : new Date().toISOString() },
                { "headers": { "Content-Type": "application/json" } })
                .then((response)=>{
                    console.log("UPDATE SUCCESSFUL: ");
                    console.log(response);
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
            <span data-tooltip-id="paid-helper" data-tooltip-content="Set Item as Paid">
                <FontAwesomeIcon className="tableOptions" icon={faHandHoldingDollar} onClick={setPaid} />
            </span>
            <Tooltip id="paid-helper"></Tooltip>
        </div>
    )
}

export default Options;