import React, { useEffect, useMemo, useState } from "react"
import '../styles/index.css';
import Bar from "../components/BarChart.jsx"
import { io } from 'socket.io-client'
import Navbar from "../components/Navbar.jsx";
import axios from "axios";

function HomePage() {

    const [RestaurantData, setRestaurant]  = useState([]);
    const [pollStatus, setPollStatus]  = useState(false);
    const [RestaurantID, setRestaurantID]  = useState(0);
    const url_prefix = `http://${import.meta.env.VITE_SERVER}:${import.meta.env.VITE_API_PORT}`;

    useEffect(() => {
        async function checkRunningPoll(){
            axios.get(`${url_prefix}/api/poll/current`).then((response) => {
                if (response.data.length>0) {
                    setRestaurantID(response.data[0].restoId);
                    setRestaurant(response.data[0]);
                }
                setPollStatus(true);
            }).catch((err) => { //error state
                console.log("ERROR FROM GET API: ")
                console.log(err);
            });
        }

        if (!pollStatus) {

            checkRunningPoll().then(() => console.log("Poll Check COMPLETED"));

            if (RestaurantID > 0){
                socket.on('connect', () =>
                    console.log("SOCKET ID: " + socket.id))

                socket.on('connect_error', () => {
                    setTimeout(() =>
                        socket.connect(), 5000)
                })
                return () => {
                    socket.off('connect', () =>
                        console.log("connected"));
                    socket.off('disconnect', () =>
                        console.log("disconnected"));
                };
            }
        }
    }, []);

    const socket = useMemo(() =>
        io(url_prefix),[url_prefix]) ;

    if (RestaurantID > 0) {
        return (
            <>
                <Navbar />
                <div className="bodyContainer">
                    <h1>Currently Polling for - <u>{RestaurantData.restaurant_name} ({RestaurantData.restaurant_address})</u></h1>
                    <Bar socket={socket} restaurantId={RestaurantID}/>
                </div>
            </>
        )
    }else {
        return (
            <>
                <Navbar />
                <div className="bodyContainer">
                    <h1>Real-Time Chai Polling App</h1>
                    <h4>Searching for running polls...</h4>
                </div>
            </>
        )
    }
}

export default HomePage
