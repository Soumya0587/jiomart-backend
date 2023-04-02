const express = require("express");
const { GroceryModel } = require("../models/grocery.model");
const GroceryRouter = express.Router();

GroceryRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const grocery = new GroceryModel(payload);
    await grocery.save();
    res.send({ msg: "New Grocery item Created" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = { GroceryRouter };