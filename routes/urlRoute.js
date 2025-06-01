import express from "express";
import {shortenUrl, visitUrl} from "../controllers/UrlController.js";
const router = express.Router();

router.post("/shorten", shortenUrl)
router.get("/visit/:shortUrl/:id", visitUrl)

export default router;
