import express from "express";
import { employerGetAllApplication, jobSeekerDeleteApplication, jobSeekerGetAllApplication, postApplication } from "../controllers/applicationController.js";
import { isAuthorised } from "../middleware/auth.js";

const router = express.Router();

router.get("/employer/getAll", isAuthorised, employerGetAllApplication);
router.get("/jobSeeker/getAll", isAuthorised, jobSeekerGetAllApplication);
router.post("/jobSeeker/postApplication", isAuthorised, postApplication);
router.delete("/delete/:id", isAuthorised, jobSeekerDeleteApplication);


export default router;