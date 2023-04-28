const express = require("express");
const AddressModel = require("../models/Address.modal");


const AddressRouter = express.Router();

AddressRouter.get("/:userid", async (req, res) => {
  const userId = req.params.userid;

    try {
      const userAddress = await AddressModel.find({ userId });
      res.send(userAddress);
    } catch (error) {
      res.send({ message: "Cannot get users address", error: error.message });
    }
});

AddressRouter.post("/add", async (req, res) => {

  const userId=req.body.userId
  const data=await AddressModel.find({userId})
 if(data.length>0){
  res.send({"msg":"Your Address already present"})
 }else{
  try{

  
  const userAddress = new AddressModel(req.body);
  await userAddress.save();
  res.json(userAddress);
} catch (error) {
  res.send({ message: "Cannot add Address", error: error.message });
}
 }
 
  });

AddressRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await AddressModel.findByIdAndDelete({_id:id});
    res.send({ message: "Address has been deleted successfully from the db" });
  } catch (error) {
    res.send({ message: "Cannot delete the Address from the cart", error: error.message });
  }
});
AddressRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload=req.body
  try {
    await AddressModel.findByIdAndUpdate({_id:id},payload);
    res.send({ message: "Address has been updated successfully from the db" });
  } catch (error) {
    res.send({ message: "Cannot update the Address from the cart", error: error.message });
  }
});

module.exports={AddressRouter}