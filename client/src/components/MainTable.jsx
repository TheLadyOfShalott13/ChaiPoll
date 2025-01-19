import React, {Suspense, useState, useEffect} from 'react'
import { Table } from 'react-bootstrap';
import {useParams} from "react-router-dom";
import axios from "axios";

const MainTable = ({ tbody, thead, options, object, attribute }) => {
    const {id} = useParams();
    var table = {}
    const [selected, setSelected] = useState([]);
    const [refresh, setrefresh] = useState(true);
    table.thead = thead.thead;
    table.tbody = tbody.tbody;
    const optName = options?.options_name;
    const OptComponent = React.lazy(() => import('./options/'+optName+'Options.jsx'));

    useEffect(()=> {
        if (typeof object === 'string' && object.trim()!=='') { //only set states when object parameter has been passed
            async function example(){
                axios.get(`http://localhost:7700/api/${object}/get/${id}`).then((response) => {
                    setSelected(response.data[0][attribute]);
                    setrefresh(false)
                }).catch((err) => { //error state
                    console.log("ERROR FROM GET API: ")
                    console.log(err);
                });
            }

            //console.log("Select OPTIONS: ");
            //console.log(selected);

            //console.log("Refresh: ");
            //console.log(refresh);

            if (refresh && selected.length===0 ) { //refreshed anew, selected needs to be filled with values
                example().then(() => console.log("loading COMPLETED"));
            }

            if (!refresh) {
                const Fdata={};
                Fdata[attribute] = selected;
                fetch(`http://localhost:7700/api/${object}/update/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Fdata),
                });
                //console.log("Synced with mongoDB")
            }
        }
    },[selected, refresh, id, object, attribute]);

    const selectCheckbox = async (e) => {
        //e.preventDefault();
        if (selected.includes(e.target.value)){
            setSelected(selected.filter(id => id !== e.target.value)); //remove the ID from list
        }
        else {
            setSelected([ e.target.value,...selected], () => {
                e.target.checked = true;
            }); //add the ID to the list
        }
    };

    if (table.tbody.length > 0) {

        return (
            <Table bordered hover>
                <thead>
                <tr>
                    {table.thead.map( function(ele, i) {
                        return (<th key={i}>{ele}</th>)
                    } )}
                </tr>
                </thead>
                <tbody>
                {table.tbody.map( function(ele,j) {
                    return (<tr key={j}>{

                        table.thead.map( function(index, k) {
                            if (index==='options') {
                                ele[index] = <Suspense fallback={<div>Loading...</div>}><OptComponent id={ele.id} /></Suspense>
                            }
                            if (index==='checkbox') {
                                ele[index] = <input
                                    type="checkbox"
                                    value={ele['id']}
                                    checked={selected.includes(ele['id'])?"checked":""}
                                    onChange={selectCheckbox}
                                />
                            }
                            return(<td key={k}>{ele[index]}</td>)
                        } )
                    }</tr>)
                } )}
                </tbody>
            </Table>
        )
    }
    else {
        return (<h1 className="feedback-header">No {optName} Added Yet</h1>)
    }
}
export default MainTable