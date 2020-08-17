import express from "express";
import routes from "./routes";
const app = express();
routes(app);
app.listen(5001);
