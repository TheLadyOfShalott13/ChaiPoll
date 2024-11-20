import React, {useContext, useEffect, useState} from "react"
import { BarChart } from '@mui/x-charts/BarChart';
import axios from "axios";
import {AuthContext} from "../authContext.js";

export default function Bar({ socket, restaurantId }) {
    const { user } = useContext(AuthContext);
    const [order, setOrder] = useState({});
    const [DT, setData] = useState([]);
    const [menu, setMenu]  = useState([]);
    const [loaded, setLoadStatus]  = useState(false);
    const api_url_prefix = import.meta.env.VITE_BACKEND_URL;
    const url_redirect_prefix = import.meta.env.VITE_FRONTEND_URL;

    useEffect(() => {
        async function getMenuOptions(){
            axios.get(`${api_url_prefix}/api/menu/list/${restaurantId}`).then((response) => {
                if (response.data.length>0)
                    setMenu(response.data);
                setLoadStatus(true);
            }).catch((err) => { //error state
                console.log("ERROR FROM GET API: ")
                console.log(err);
            });
        }

        if (!loaded) getMenuOptions().then(() => console.log("Menu Options Loaded"))

        socket.on('update', (options) => {
            const newData = [];
            Object.keys(options).forEach((key) => {
                newData.push(options[key].voters.length);
            })
            setOrder(options)
            setData(newData)
        })

    }, [order,DT,menu,loaded]);

    const castVote      = (id) => { socket.emit('vote', id, user.dataValues.id) }
    const withdrawVote  = (id) => { socket.emit('unvote', id, user.dataValues.id) }

    async function createOrder(){
        let order_items = [];
        axios.post(
            `${api_url_prefix}/api/order/create`,
            { "restaurant" : restaurantId },
            { headers: { "Content-Type": "application/json" } }
        ).then((response) => {
            const orderId = response.data.id;
            menu.map(function(item) {
                order[item.id].voters.map(function(voter) {
                    order_items.push({
                        "order_id": parseInt(orderId),
                        "user"    : parseInt(voter),
                        "item_id" : parseInt(item.id),
                        "price"   : parseFloat(item.price).toFixed(2)
                    });
                });
            })
            saveOrderItems(order_items);
        }).catch((err) => {
            console.log("ERROR FROM GET API: ")
            console.log(err);
        });
    }

    async function saveOrderItems(data){
        axios.post(
            `${api_url_prefix}/api/ordereditems/create`,
            data,
            { headers: { "Content-Type": "application/json" } }
        ).then((response) => {
            window.location.assign(`${url_redirect_prefix}/Category`)
        }).catch((err) => { //error state
            console.log("ERROR FROM GET API: ")
            console.log(err);
        });
    }

    return (
        <>
            <div className='bar'>
                <BarChart
                    width={1200}
                    height={500}
                    series={[
                        {
                            data: DT.length > 0 ?
                                DT : menu.map((element) => 0),
                            id: 'uvId', label: 'Votes'
                        },
                    ]}
                    xAxis={[{
                        data: menu.map((element) => `${element.name}`),
                        scaleType: 'band'
                    }]}
                />
            </div>

            <h3><u>What do you want to order?</u></h3>
            <button onClick={createOrder}>Place Order</button>
            <div className='votingOpt'>
                {
                    menu.map(function(element){
                        return (
                            <div key={element.id+"main"}>
                                <button className='voteButton' key={element.id+"vote"} onClick={() => castVote(element.id)}>
                                    Vote
                                </button>
                                <button className='unvoteButton' key={element.id+"unvote"} onClick={() => withdrawVote(element.id)}>
                                    Unvote
                                </button>
                                <h4>{element.name} [{element.category_name}]</h4>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}
