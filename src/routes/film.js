import express from "express";
import Film from "../controller /film/film";
const router = express.Router();
router.get("/", Film.getList);
export default router;
