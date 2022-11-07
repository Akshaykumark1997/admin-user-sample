const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const db = require("./confi/connection");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.listen(8000);
app.use(express.static("public"));
app.use("/image", express.static(path.join(__dirname + "public/image")));
app.use("/css", express.static(path.join(__dirname + "public/css")));
app.use(
  "/javascript",
  express.static(path.join(__dirname + "public/javascript"))
);

db.connect((err) => {
  if (err) console.log("connection error");
  else console.log("database connected successfully");
});
app.use("/", userRouter);
app.use("/admin", adminRouter);
