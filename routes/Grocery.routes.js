const express = require("express");
const { GroceryModel } = require("../models/grocery.model");
const GroceryRouter = express.Router();

// get all grocery product 

GroceryRouter.get("/all",async(req,res)=>{
  try{
    const data = await GroceryModel.find()
    res.send(data)
  }
  catch(e){
    console.log(e);
  }
})

// for search request parameter


GroceryRouter.get("/search", async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const category = {};
  const product_name ={}
  const brand = {};
  const sub_category = {};
  if (q) {
    category.category = new RegExp(q, "i");
    brand.brand = new RegExp(q, "i");
    sub_category.sub_category = new RegExp(q, "i");
    product_name.product_name = new RegExp(q, "i");

  }
  const query = { $or: [category,product_name, brand, sub_category] };
  try {
    const data = await GroceryModel.find(query);
    
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});





// for add grocery products (Admin)

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