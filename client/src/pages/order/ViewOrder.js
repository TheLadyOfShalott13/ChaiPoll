import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import Navbar from '../../components/Navbar'
import VerticalTable from '../../components/VerticalTable'
import "../../styles/tables.css"
import {Link, useParams} from "react-router-dom";
import MainTable from "../../components/MainTable.jsx";
import {Button} from "react-bootstrap";
import {AuthContext} from "../../authContext.js";

const ViewOrder = ({params}) => {

    const {id} = useParams();
    const { user } = useContext(AuthContext);
    const attributes = ['id','order_datetime','restaurant_name','restaurant_address','status','payment_method','user_who_paid','user_dept'];
    const thead = ['id','menu_item_name','price','user_who_ordered','user_dept','paid_on','options'];
    const [responseRecieved, setResponseStatus] = useState(false);
    const [itemsLoaded, setitemsLoaded] = useState(false);
    const [displayPaymentOptions, setdisplayPaymentOptions] = useState(false);
    const [data, setData] = useState([]);
    const [tbody, setTbody] = useState([]);
    const option_name = 'order';
    const options_name = 'ordereditems';
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const loadOrder = async () => {
            setResponseStatus(false);

            axios.get(`${api_url_prefix}/api/order/get/${id}`).then((response) => {
                setData(response.data);
                if (response.data[0].paid_by === null)
                    setdisplayPaymentOptions(true);
                setResponseStatus(true);
                loadItems(id);
            }).catch((err) => {
                setResponseStatus(true);		//error state
            });
        };

        const loadItems = async (id) => {
            setitemsLoaded(false);

            axios.get(`${api_url_prefix}/api/ordereditems/get/${id}`).then((response) => {
                setTbody(response.data);
                setitemsLoaded(true);
            }).catch((err) => {
                setitemsLoaded(true);		//error state
            });
        };

        loadOrder().then();
    }, []);

    const paidByCOD = async () => {
        try {
            await axios.put(
                `${api_url_prefix}/api/order/update/${id}`,
                { "paid_by" : user.dataValues.id, "payment_method" : "cod" },
                { "headers": { "Content-Type": "application/json" } })
            window.location.reload();
        }
        catch (err) {
            console.log("ERROR: ")
            console.log(err)
        }
    }

    const paidByCard = async () => {
        try {
            await axios.put(
                `${api_url_prefix}/api/order/update/${id}`,
                { "paid_by" : user.dataValues.id, "payment_method" : "card" },
                { "headers": { "Content-Type": "application/json" } })
            window.location.reload();
        }
        catch (err) {
            console.log("ERROR: ")
            console.log(err)
        }
    }

    return (
        <div className="table-container">
            <Navbar/>
            <h1>View Order Details (Order ID: {id})</h1>
            <br></br><br></br>
            <h2>Order Details</h2>
            {displayPaymentOptions ? <div>
                                        <Button className="add-new" onClick={paidByCOD}>Paid By COD</Button>
                                        <Button className="add-new" onClick={paidByCard}>Paid By Card</Button>
                                     </div>
                                    : <></>}
            {responseRecieved ? data.length > 0 ?
                    <VerticalTable attributes={attributes} data={data} option={option_name}/> :
                    <h1 className="feedback-header">Cannot Find Order</h1> :
                <h1 className="feedback-header">Loading Order</h1>}

            <br></br><br></br>
            <h2>Order Items List</h2>

            {itemsLoaded ? tbody.length > 0 ? <MainTable tbody={{tbody}} thead={{thead}} options={{options_name}}/> :
                    <h1 className="feedback-header">Cannot Find Ordered Item</h1> :
                <h1 className="feedback-header">Loading Order Items</h1>}
        </div>
    )
}

export default ViewOrder
