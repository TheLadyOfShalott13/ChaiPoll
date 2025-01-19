/**
 * ===========importing packages==============
 */
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./config/conn.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import http from "http";
import axios from "axios";
import {Server} from "socket.io";


/**
 * ===========importing routes==============
 */
import userRoute from "./routes/user.js";
import restoRoute from "./routes/restaurant.js";
import ordereditemsRoute from "./routes/ordereditems.js";
import orderRoute from "./routes/order.js";
import menuRoute from "./routes/menu.js";
import categoryRoute from "./routes/category.js";
import pollRoute from "./routes/poll.js";


/**
 * ============initializing express app, web socket and DB syncing===============
 */
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

const api_url = `${process.env.BACKEND_URL}`;
const fetchOptions = async () => {
    try {
        const response = await axios.get(`${api_url}/api/poll/init`);
        return response.data;
    } catch (error) {
        console.error('Error fetching frameworks:', error);
        return [];
    }
};

io.on("connection", async (socket) => {
    const options = await fetchOptions();
    io.emit("update", options);
    socket.on("vote", (selectedItem, voter) => {
        if (options[selectedItem] && !options[selectedItem].voters.includes(voter)) {
            options[selectedItem].voters.push(voter);
        }
        io.emit("update", options);
    });
    socket.on("unvote", (selectedItem, voter) => {
        if (options[selectedItem]) {
            options[selectedItem].voters = options[selectedItem].voters.filter(name => name !== voter);
        }
        io.emit("update", options);
    });
});

app.use("/uploads", express.static("uploads"));
dotenv.config({path:"./config/.env"});

//insert this as arguments to sync() in order to sync the models correctly { alter: true }
sequelize.sync({ alter: true }).then(() => { console.log('user table created successfully!'); })
                .catch((error) => { console.error('Unable to create table : ', error); });

app.get('/', (req, res) => { res.send('Hello from Express!') });


/**
 * ============Adding the middlewares==============
 */
app.use(cookieParser())
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}))
app.use(morgan("common"));


/**
 * ==============allow app to use imported routes here==============
 */
app.use("/api/users", userRoute);
app.use("/api/restaurants", restoRoute);
app.use("/api/ordereditems", ordereditemsRoute);
app.use("/api/order", orderRoute);
app.use("/api/menu", menuRoute);
app.use("/api/category", categoryRoute);
app.use("/api/poll", pollRoute);

server.listen(process.env.APP_PORT, () => { console.log("Listening on port " + process.env.APP_PORT); });
