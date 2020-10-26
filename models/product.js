const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50
    },
    product_description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    product_price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    product_stock: {
      type: Number,
      required: true
    },
    product_sold: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    productImagePath :{
      type:String,
      required: true
    }
  },
  { timestamps: true }
);

// exporting module for mongoose
module.exports = mongoose.model("Product", productSchema);
