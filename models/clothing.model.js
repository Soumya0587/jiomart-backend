const mongoose = require("mongoose");

const ClothingSchema = mongoose.Schema({
  crawl_timestamp: { type: Date, default: Date.now() },
  title: { type: String, required: true },
  product_name: { type: String, required: true },
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
  image: [{ type: String, required: true }],
  retail_price: { type: Number, required: true },
  discounted_price: { type: Number, default: this.retail_price },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  colour: [{ type: String, required: true }],
  size: [{ type: String, required: true }],
  fabric:{ type: String, required: true },
  gender:{ type: String, required: true },
  pattern:{ type: String, required: true },
  season:{ type: String, required: true },
  wash_care:{ type: String, default: "Dry Clean" },
});

const ClothingModel = mongoose.model("clothing", ClothingSchema);

module.exports = { ClothingModel };
