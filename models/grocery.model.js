const mongoose = require("mongoose")

const GrocerySchema = mongoose.Schema({
    crawl_timestamp :{type:Date , default : Date.now()},
    product_name: { type: String, required: true },
    category:{ type: String, required: true },
    sub_category:{ type: String, required: true },
    image: [{ type: String, required: true }],
    retail_price: { type: Number, required: true },
    discounted_price: { type: Number, default: this.retail_price },
    discount: { type: Number, default: 0 },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, default: 0 },
    stock: { type: Number, required: true },
  features:[{ type: String, required: true }],
  food_type:{ type: String, required: true },
  net_quantity:{ type: Number, default: 1 },
})

const GroceryModel = mongoose.model("grocery",GrocerySchema)

module.exports = { GroceryModel };