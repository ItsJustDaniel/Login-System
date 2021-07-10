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

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const users = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await users
    .save()
    .then((results) => console.log(results))
    .catch((err) => console.log(err));

  res.send(users);
});

app.get("/signin", async (req, res) => {
  const result = await User.find()
    .then((result) => result)
    .catch((err) => console.log(err));

  res.send(result);
});

app.listen(process.env.PORT || 9000, () => {
  console.log("Server started on port 9000");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
