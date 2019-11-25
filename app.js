const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Add Route
const userLogin = require("./api/routes/users");
const AppScreenshoot = require("./api/routes/appScreenshoot");

// Define App
const app = express();

// Define Database
mongoose.connect(
  process.env.DB_URL,
  { useCreateIndex: true, useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("MongoDB Connect Successfully");
    } else {
      console.log("Error in DB Connection: ", err);
    }
  }
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// For Support Cross Origin Request
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // '*' for any
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    return res.status(200).json({});
  }

  next();
});

app.use("/public", express.static("public"));

// Use Route
app.use("/login", userLogin);
app.use("/appscreen", AppScreenshoot);

// Defice app.js to index.js
module.exports = app;
