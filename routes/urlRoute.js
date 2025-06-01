import express from "express";
import {shortenUrl, visitUrl} from "../controllers/UrlController.js";
const router = express.Router();

router.post("/shorten", shortenUrl)
router.get("/:shortUrl", visitUrl)

export default router;
