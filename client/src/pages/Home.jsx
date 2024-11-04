import {
    useEffect,
    useMemo,
} from "react"
import Bar from "../components/BarChart.jsx"
import { io } from 'socket.io-client'

function HomePage() {
    const socket = useMemo(() =>
        io('http://localhost:5000')) ;

    useEffect(() => {

        socket.on('connect', () =>
            console.log(socket.id))

        socket.on('connect_error', () => {
            setTimeout(() =>
                socket.connect(), 5000)
        })
        return () => {
            socket.off('connect', () =>
                console.log("connected"));
            socket.off('disconnect', () =>
                console.log("connected"));
        };
    }, [])

    return (
        <>
            <img src="./assets/chailogo.png"/><h1>Real-Time Chai Polling App</h1>
            <Bar socket={socket} />
        </>
    )
}

export default HomePage
