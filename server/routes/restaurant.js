import express from "express";
import {
    createRestaurant,
    deleteRestaurant,
    getAllRestaurant,
    getOneRestaurant,
    updateRestaurant,
} from "../controllers/restaurant.js";

const router = express.Router();

router.post("/create", createRestaurant);
router.delete("/delete/:id", deleteRestaurant);
router.get("/get/:id", getOneRestaurant);
router.get("/list", getAllRestaurant);
router.put("/update/:id", updateRestaurant);

export default router;