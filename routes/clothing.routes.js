const express = require("express");
const {ClothingModel} =  require("../models/clothing.model")
const ClothingRouter = express.Router();


ClothingRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const clothing = new ClothingModel(payload);
    await clothing.save();
    res.send({ msg: "New Clothing item Created" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});



























// const cloudinary = require('cloudinary').v2;


// // Configuration 
// cloudinary.config({
//     cloud_name: "dn6cfpohc",
//     api_key: "416393748737544",
//     api_secret: "As-n0sj_9J430HFArAbkpFPvy74"
//   });

//   // Upload

//   ClothingRouter.post("/create", (req, res) => {
//     console.log(req.body);
//     const file = req.files.photo
//     cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
//         console.log(result);
//     })

//   });


  module.exports = { ClothingRouter };

  // {
  //   "title": "Slim Fit Nehru Jacket with Welt Pockets",
  //   "product_name":"Nehru Jacket",
  //   "category":"Men",
  //   "sub_category":"Ethnic Wear",
  //   "image":["https://res.cloudinary.com/dn6cfpohc/image/upload/v1680535069/slim-fit-nehru-jacket-with-welt-pockets-model-460689404_orange-0-202303291911_mfcwl9.jpg","https://res.cloudinary.com/dn6cfpohc/image/upload/v1680535123/slim-fit-nehru-jacket-with-woven-pattern-model-460689388_black-0-202301082344_yjhe8q.jpg","https://res.cloudinary.com/dn6cfpohc/image/upload/v1680535195/slim-fit-nehru-jacket-with-welt-pockets-model-460689379_purple-0-202301090224_gzojvb.jpg","https://res.cloudinary.com/dn6cfpohc/image/upload/v1680535245/slim-fit-nehru-jacket-with-woven-pattern-model-460689376_grey-0-202301091107_iodlcc.jpg"],
  //   "retail_price":1999,
  //   "discounted_price":999,
  //   "description":"Slim Fit Nehru Jacket with Woven Pattern",
  //   "brand":"KAFF",
  //   "rating":3,
  //   "stock":20,
  //   "colour":["#fb793f","#292929","#835ca1","#3e3133"],
  //   "size":["M","L","XL","XXL"],
  //   "fabric":"Cotton blend",
  //   "gender":"Men",
  //   "pattern":"Woven",
  //   "season":"Regular"
  // }