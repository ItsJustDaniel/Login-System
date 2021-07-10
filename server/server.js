const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const User = require("./models/users");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://Daniel-Li:DA01n13l@cluster0.n46c8.mongodb.net/login-system",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("does this work?");
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  const users = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  users
    .save()
    .then((results) => res.send(results))
    .catch((err) => console.log(err));
});

app.get("/signin", (req, res) => {
  User.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT || 9000, () => {
  console.log("Server started on port 9000");
});
