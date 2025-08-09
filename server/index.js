const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const app = express();
// middlewares
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/CRUD")
  .then(() => console.log("MongoDB Connected"));

//Routes
// Create User...
app.post("/createUser", (req, res) => {
  User.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

//Update Users....
app.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate({ _id: id }, { ...req.body })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// Fetch Users... GetUsers...
app.get("/", (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/update/:id", (req, res) => {
  User.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// Delete request
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(8000, () => console.log("Server started at port 8000"));
