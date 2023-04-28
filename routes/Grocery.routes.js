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

// get by grocery product by ID


GroceryRouter.get("/:id", async (req, res) => {
  try {
    const data = await GroceryModel.findById(req.params.id);
    if (data) {
      res.send(data);
    } else {
      res.send("Data not found");
    }
    
  } catch (error) {
    console.log(error);
  }
});

// for search request parameter

GroceryRouter.get("/", async(req, res) => {

  let {category,sub_category,brand,sortBy,select,page,limit,c_value}=req.query
  let queryObject = {}
  
  
  let category_tree = {}
  let sub_category_tree = {};
  let product_name_tree={}
  if (c_value) {
    console.log("q:"+c_value);
    category_tree.category = new RegExp(c_value, "i");
    sub_category_tree.sub_category = new RegExp(c_value, "i");
    product_name_tree.product_name = new RegExp(c_value, "i");

  }
  queryObject = { $or: [category_tree, sub_category_tree, product_name_tree] };
  if(category){
    queryObject.category={ $regex : category, $options : "i"}
  }
 
  // if(brand){
  //   queryObject.brand={ $regex : brand, $options : "i"}
  // }
  if (brand) {
    queryObject.brand = { $in: brand };
  }
  if(sub_category){
    queryObject.sub_category={ $regex : sub_category, $options : "i"}
  }
  let apiData 
  // if(c_value){
    // apiData=GroceryModel.find(newquery)
  // }else{
    apiData=GroceryModel.find(queryObject)
  // }
   
  // if(sort){
  //   let sortFix = sort.split(",").join(" ")
  //   apiData = apiData.sort(sortFix)
  // }
  if(select){
    let selectFix = select.split(",").join(" ")
    apiData = apiData.select(selectFix)
  }
  let sort = {};
  if (sortBy) {
    sort["discounted_price"] = sortBy === "asc" ? 1 : "dsc" ? -1 : "" || 1;
  }

  let pageNumber = page || 1;
  let pageLimit = limit || 30;
  let pagination = pageNumber * pageLimit - pageLimit || 0;
console.log(queryObject);
// console.log(newquery);

// let myData = await apiData
// res.send(myData)
try {
  let data = await apiData
    .sort(sort)
    .skip(pagination)
    .limit(pageLimit);
  if (data) {
    res.send(data);
  } else {
    res.send("Data not found");
  }
} catch (error) {
  console.log(error);
}
  // let { q } = req.query;
  
  // const category = {};
  // const product_name ={}
  // const brand = {};
  // const sub_category = {};
  // if (q) {
  //   console.log("q:"+q);
  //   category.category = new RegExp(q, "i");
  //   brand.brand = new RegExp(q, "i");
  //   sub_category.sub_category = new RegExp(q, "i");
  //   product_name.product_name = new RegExp(q, "i");

  // }
  // const query = { $or: [category,product_name, brand, sub_category] };
  // try {
  //   const data = await GroceryModel.find(query);
    
  //   res.send(data);
  // } catch (error) {
  //   console.log(error);
  // }
});

GroceryRouter.get("/all", async(req, res) => {
  const { q } = req.query;
  
  const category = {}
  const sub_category = {};
  if (q) {
    console.log("q:"+q);
    category.category = new RegExp(q, "i");
    sub_category.sub_category = new RegExp(q, "i");

  }
  const query = { $or: [category, sub_category] };
  try {
    const data = await GroceryModel.find(query);
    
    res.send(data);
  } catch (error) {
    console.log(error);
  }
})



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


// for admin only
// update data

GroceryRouter.patch("/:id", async (req, res) => {
  try {
    const data = await GroceryModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("update success");
  } catch (error) {
    console.log(error);
  }
});

// delete data

GroceryRouter.delete("/:id", async (req, res) => {
  try {
    const data = await GroceryModel.findByIdAndDelete(req.params.id);
    res.send("delete success");
  } catch (error) {
    console.log(error);
  }
});



module.exports = { GroceryRouter };