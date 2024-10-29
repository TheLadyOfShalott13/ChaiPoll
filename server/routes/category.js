import express from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/create", createCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/get/:id", getOneCategory);
router.get("/list", getAllCategory);
router.put("/update/:id", updateCategory);

export default router;