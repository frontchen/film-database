import mongoose from "mongoose";
import { dbconfig } from "../config";
const DB_URL = `mongodb://${dbconfig.user}:${dbconfig.password}@${dbconfig.url}`;
/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on("connected", function() {
  console.log("Mongoose connection open to " + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});

/**
 * 连接断开
 */
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose connection disconnected");
});
