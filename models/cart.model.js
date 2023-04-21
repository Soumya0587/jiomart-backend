const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
  product_name: { type: String, required: true },
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
  image: [{ type: String, required: true }],
  retail_price: { type: Number, required: true },
  discounted_price: { type: Number, default: this.retail_price },
  discount: { type: Number, default: 0 },
  brand: { type: String, required: true },
  rating: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  quantity: { type: Number, required: true },
  userId: { type: String, required: true },
  pid: { type: String, required: true },
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = {
  CartModel,
};
