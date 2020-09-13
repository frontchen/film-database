import express from "express";
import Ip from "../controller/ip/ip";
const router = express.Router();
router.get("/", Ip.getList);
export default router;
