import express from "express";
import {
    createOrderItems,
    getAllOrderedItems,
    updatePaid
} from "../controllers/ordereditems.js";

const router = express.Router();

router.post("/create", createOrderItems);
router.get("/get/:id", getAllOrderedItems);
router.put("/update/:id", updatePaid);

export default router;