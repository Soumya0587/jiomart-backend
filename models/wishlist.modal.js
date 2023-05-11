const mongoose = require("mongoose");
const WishlistSchema = mongoose.Schema({
  product_name: { type: String, required: true },
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
  image: [{ type: String, required: true }],
  retail_price: { type: Number, required: true },
  discounted_price: { type: Number, default: this.retail_price },
  discount: { type: Number, default: 0 },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  userId: { type: String, required: true },
  pid: { type: String, required: true },
});

const WishlistModel = mongoose.model("Wishlist", WishlistSchema);

module.exports = {
    WishlistModel,
};