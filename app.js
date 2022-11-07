const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const db = require("./confi/connection");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.listen(8000);
app.use(express.static("public"));
app.use("/image", express.static(path.join(__dirname + "public/image")));
app.use("/css", express.static(path.join(__dirname + "public/css")));
app.use("/javascript",express.static(path.join(__dirname + "public/javascript")));
app.use(cookieParser());
db.connect((err) => {
  if (err) console.log("connection error");
  else console.log("database connected successfully");
});
app.use(
  sessions({
    secret: "123",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 300000 },
  })
);
app.use((req, res, next) => {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});
app.use("/", userRouter);
app.use("/admin", adminRouter);
