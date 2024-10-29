/**
 * ===========importing packages==============
 */
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "sequelize";
import cookieParser from "cookie-parser";
import cors from "cors"


/**
 * ===========importing routes==============
 */
import userRoute from "./routes/user.js";
import restoRoute from "./routes/restaurant.js";
import ordereditemsRoute from "./routes/ordereditems.js";
import orderRoute from "./routes/order.js";
import menuRoute from "./routes/menu.js";
import categoryRoute from "./routes/category";


/**
 * ============initializing express app and DB syncing===============
 */
const app = express();
app.use("/uploads", express.static("uploads"));
dotenv.config({path:"./config/.env"});

sequelize.sync().then(() => { console.log('user table created successfully!'); })
                .catch((error) => { console.error('Unable to create table : ', error); });

app.get('/', (req, res) => { res.send('Hello from Express!') });


/**
 * ============Adding the middlewares==============
 */
app.use(cookieParser())
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
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

app.listen(process.env.APP_PORT, () => { console.log("Listening on port " + process.env.APP_PORT); });
