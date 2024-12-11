// import express
const express = require("express");
const mongoose = require("mongoose");

// create the express app
const app = express();

// middleware to handle JSON request
app.use(express.json());

// connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ecom")
  .then(() => {
    // if mongodb is successfully connected
    console.log("MongoDB is connected");
  })

  .catch((error) => {
    console.log(error);
  });

// root route
app.get("/", (req, res) => {
  res.send("Happy Coding!");
});

// import all the routes
const productRouter = require("./routes/product");

app.use("/products", productRouter);

// start the server
app.listen(5555, () => {
  console.log("Server is running at http://localhost:5555");
});
