const mongoose = require("mongoose")
// console.log(mongoose.version);
const OrderSchema = mongoose.Schema({
  images: [{ type: String, required: true }],
    products: [{ type: String, required: true }],
    total: { type: Number, required: true },
    date:{ type: String, required: true },//automatic
    userId: { type: String, required: true },
    count: { type: Number, required: true },
    status:{ type: String, required: true },//automatic
    payment:{ type: String, required: true }
  });
  
  const OrderModel = mongoose.model("delivery", OrderSchema);
  
  module.exports = {
    OrderModel,
  };