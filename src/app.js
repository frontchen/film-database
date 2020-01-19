import express from "express";
import api from "./api";

const app = express();
app.get("/", (req, res) => {
  api.getListItem({ m: "vod-detail-id-41849.html" }).then(data => {
    res.json(data);
  });
});
app.listen(5000);
