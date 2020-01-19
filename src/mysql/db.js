import mysql from "mysql";
const connection = mysql.createConnection({
  host: "localhost"
});
connection.connect();
