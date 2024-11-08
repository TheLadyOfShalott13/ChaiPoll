import React, {useEffect, useState} from "react"
import { BarChart } from '@mui/x-charts/BarChart';
import axios from "axios";

export default function Bar({ socket, restaurantId }) {
    const [DT, setData] = useState([]);
    const [menu, setMenu]  = useState([]);
    const [loaded, setLoadStatus]  = useState(false);
    const url_prefix = `http://${import.meta.env.VITE_SERVER}:${import.meta.env.VITE_API_PORT}`;

    useEffect(() => {
        async function getMenuOptions(){
            axios.get(`${url_prefix}/api/menu/list/${restaurantId}`).then((response) => {
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
            const newData = []
            for (const key in options) {
                if (options.hasOwnProperty(key)) {
                    const { votes, label } = options[key];
                    newData.push(votes)

                }
            }
            setData(newData)
        })

    }, []);

    const castVote      = (id) => { socket.emit('vote', id) }
    const withdrawVote  = (id) => { socket.emit('unvote', id) }

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
            <div className='votingOpt'>
                {
                    menu.map(function(element){
                        return (
                            <div>
                                <button className='voteButton' key={element.id} onClick={() => castVote(element.id)}>
                                    Vote
                                </button>
                                <button className='unvoteButton' key={element.id} onClick={() => withdrawVote(element.id)}>
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
