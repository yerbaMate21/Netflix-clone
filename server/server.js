require("dotenv").config();
const bodyParser = require("body-parser");

const express = require("express");
const mongoose = require("mongoose");
const userDetailsRoutes = require("./routes/userDetailsRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/userDetails", userDetailsRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
