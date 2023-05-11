const {WishlistModel} = require("../models/wishlist.modal")
const express = require("express");

const WishlistRouter = express.Router();

WishlistRouter.get("/:userid",async(req,res)=>{
    const userId = req.params.userid;

    try {
      let data = await WishlistModel.find({ userId: userId });
      res.json(data);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })

  WishlistRouter.post("/add", async (req, res) => {
    const { userId, pid } = req.body;
  
  try {
    let data = await WishlistModel.find({ userId: userId, pid });
    if (data.length) {
      return res.status(400).send("Item Already exist in the Wishlist");
    }

    let newWishlistItem = new WishlistModel(req.body);
    await newWishlistItem.save();
    res.send("Item added to Wishlist");
  } catch (error) {
    res.status(400).send(error.message);
  }
  });

  WishlistRouter.delete("/:id", async (req, res) => {
    const wishlistId = req.params.id;
    try {
        await WishlistModel.findByIdAndDelete({_id:wishlistId})
        res.send("Deleted Successfully")
    } catch (error) {
        res.send(error.message)
    }
  });
module.exports = { WishlistRouter };
