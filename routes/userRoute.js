import express from "express";
import {login, signup} from "../controllers/UserController.js";
const router = express.Router();

router.post("/register", signup);
router.post("/login", login);


export default router;
