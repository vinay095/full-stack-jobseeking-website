import express, { Router } from "express";
import { deleteJob, getAllJobs, getMyJobs, postJob, updateJob } from "../controllers/jobController.js";
import { isAuthorised } from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllJobs", getAllJobs);
router.post("/postJob", isAuthorised, postJob);
router.get("/getMyJobs", isAuthorised, getMyJobs);
router.put("/update/:id", isAuthorised, updateJob);
router.delete("/delete/:id", isAuthorised, deleteJob);




export default router;