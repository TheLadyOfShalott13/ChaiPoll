import * as React from 'react';
import {
    BarChart
} from '@mui/x-charts/BarChart';

export default function Bar({ socket }) {
    const [DT, setData] = React.useState([]);

    React.useEffect(() => {
        socket.on('update', (frameworks) => {

            const newData = []
            for (const key in frameworks) {
                if (frameworks.hasOwnProperty(key)) {
                    const { votes, label } = frameworks[key];
                    newData.push(votes)

                }
            }
            setData(newData)
        })

    }, [])

    const updateVote = (id) => {
        socket.emit('vote', id)
    }

    return (
        <>
            <h4>Most Popular Backend Frameworks 2024</h4>
            <div className='bar'>
                <BarChart
                    width={800}
                    height={350}
                    series={[
                        {
                            data: DT.length > 0 ?
                                DT : [0, 0, 0, 0, 0],
                            id: 'uvId', label: 'Votes'
                        },
                    ]}
                    xAxis={[{
                        data: ["Django", "Express.js",
                            "Spring Boot", "Laravel", "Flask"],
                        scaleType: 'band'
                    }]}
                />
            </div>

            <h3><u>What do you want to order?</u></h3>
            <div className='btn'>
                <button className='myButton' onClick={() => updateVote(0)}>
                    Django
                </button>
                <button className='myButton' onClick={() => updateVote(1)}>
                    Express.js
                </button>
                <button className='myButton' onClick={() => updateVote(2)}>
                    Spring Boot
                </button>
                <button className='myButton' onClick={() => updateVote(3)}>
                    Laravel
                </button>
                <button className='myButton' onClick={() => updateVote(4)}>
                    Flask
                </button>
            </div>
        </>
    );
}
