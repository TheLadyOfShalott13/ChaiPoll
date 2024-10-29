import express from "express";
import {
    createOrder,
    getOneOrder,
    getAllOrders,
    updatePaid,
} from "../controllers/order.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/get/:id", getOneOrder);
router.get("/list", getAllOrders);
router.put("/update/:id", updatePaid);

export default router;