import express from "express";
import {
    createMenu,
    deleteMenu,
    getMenu,
    getOneMenu,
    updateMenu,
} from "../controllers/menu.js";

const router = express.Router();

router.post("/create", createMenu);
router.delete("/delete/:id", deleteMenu);
router.get("/get/:id", getOneMenu);
router.get("/list/:id", getMenu);
router.put("/update/:id", updateMenu);

export default router;