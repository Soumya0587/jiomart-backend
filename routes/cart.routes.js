const {CartModel} = require("../models/cart.model")
const express = require("express");

const CartRouter = express.Router();
CartRouter.get("/:userid",async(req,res)=>{
    const userId = req.params.userid;

    try {
      let data = await CartModel.find({ userId: userId });
      res.json(data);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  CartRouter.get("/:id",async(req,res)=>{
    const {id}=req.params

    try {
        let data=await CartModel.findOne({_id:id})
        res.json(data)
        
    }catch(err){
        res.status(400).send(err.message)
    }
  })
  CartRouter.post("/add", async (req, res) => {
    const { userId, pid } = req.body;
  
  try {
    let data = await CartModel.find({ userId: userId, pid });
    if (data.length) {
      return res.status(400).send("Item Already exist in the Cart");
    }

    let newCartItem = new CartModel(req.body);
    await newCartItem.save();
    res.send("Item added to cart");
  } catch (error) {
    res.status(400).send(error.message);
  }
  });

  CartRouter.patch("/:id", async (req, res) => {
    const { userId, _id } = req.body;
  const cartId = req.params.id;

  try {
    await CartModel.findByIdAndUpdate({ _id: cartId }, req.body);
    res.send("Updated Successfully")
  } catch (error) {
    res.send(error.message)
  }
  });

  CartRouter.delete("/:id", async (req, res) => {
    const cartId = req.params.id;
    try {
        await CartModel.findByIdAndDelete({_id:cartId})
        res.send("Deleted Successfully")
    } catch (error) {
        res.send(error.message)
    }
  });
  CartRouter.delete("/delete/all/:userid", async (req, res) => {
    const userId = req.params.userid;
    
    try {
        await CartModel.deleteMany({userId})
        res.send("All Items Deleted Successfully")
    } catch (error) {
        res.send(error.message)
    }
  });

module.exports = { CartRouter };
