const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();

// Installing and setting up Mongoose:
const DB = process.env.MONGO_URI.replace("<password>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("success"));

// Create a person with this prototype:
let peopleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
let Person = mongoose.model("Person", peopleSchema);

// Create and Save a Record of a Model:
let zahra = new Person({
  name: "zahra",
  age: 34,
  favoriteFoods: ["pizza", "spaghetti"],
});
zahra.save((err, data) => {
  if (err) console.log(err);
});

// Create Many Records with model.create()
let arrayOfPeople = [
  {
    name: "John",
    age: 8,
    favoriteFoods: ["chocolate", "rice"],
  },
  {
    name: "Mary",
    age: 17,
    favoriteFoods: ["toast", "pizza"],
  },
  {
    name: "Kris",
    age: 35,
    favoriteFoods: ["prawns", "lobster", "tuna"],
  },
  { name: "Hannah", age: 24, favoriteFoods: ["curry", "toast"] },
  { name: "Mark", age: 52, favoriteFoods: ["Roast Chicken", "Fried Rice"] },
];
Person.create(arrayOfPeople, (err, data) => {
  if (err) console.log(err);
});

// Use model.find() to Search Your Database
Person.find({ name: "zahra" }, (err, data) => {
  if (err) console.log(err);
  console.log(data);
});

// Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({ favoriteFoods: { $all: ["tuna"] } }, (err, data) => {
  if (err) console.log(err);
  console.log(data);
});

//Use model.findById() to Search Your Database By _id
Person.findById("60e963cb896c9d36e04447b5", (err, data) => {
  if (err) console.log(err);
  console.log(data);
});

// Perform Classic Updates by Running Find, Edit, then Save
Person.findById("60e963cb896c9d36e04447b5", (err, result) => {
  if (err) console.log(err);
  result.favoriteFoods.push("hamburger");
  result.save((err, data) => {
    console.log(data);
  });
});

// Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate({ name: "Kris" }, { age: 20 }, (err, data) => {
  if (err) console.log(err);
  console.log(data);
});

// Delete One Document Using model.findByIdAndRemove
Person.findOneAndRemove({ name: "Hannah" }, (err, data) => {
  if (err) console.log(err);
  console.log(data);
});

// MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.remove({ name: "Mary" }, (err, data) => {
  if (err) console.log(err);
  console.log(data);
});

// Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: { $all: ["pizza"] } })
  .sort({ age: "asc" })
  .limit(1)
  .select("name")
  .exec((err, data) => {
    if (err) console.log(err);
    console.log(data);
  });

// to start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});