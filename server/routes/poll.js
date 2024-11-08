import express from "express";
import {
    createPoll,
    deletePoll,
    getAllPoll,
    getOnePoll,
    updatePoll,
    getRunningPoll,
    getInitialPollData
} from "../controllers/poll.js";

const router = express.Router();

router.post("/create", createPoll);
router.delete("/delete/:id", deletePoll);
router.get("/get/:id", getOnePoll);
router.get("/current", getRunningPoll);
router.get("/list", getAllPoll);
router.get("/init", getInitialPollData);
router.put("/update/:id", updatePoll);

export default router;