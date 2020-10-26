const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

var upload = multer({ storage: storage })

// createProduct function for creating new product using post method.
exports.createProduct = (req, res) =>
 {
  const product = new Product(req.body);

  product.productImagePath = req.file.path;
 
  product.save((err, product) => 
  {
    if (err) 
    {
      if(err.code === 11000 || err.code === 11001)
      {
        return res.status(400).json({
          error: "Duplicate Value " +req.body.name +",Value must be unique", 
        });
      }
      else
      {
        return res.status(400).json({
          error: "NOT able to save product in database",
          messgae : err 
        });
      }
    }
    res.json({ product });
  });
};

// getAllproduct function for read all products.
exports.getAllproduct = (req, res) => 
  {
    Product.find().exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "NO products found"
        });
      }
      res.json(product);
    });
  };

// getProductById function for read product by Id.
exports.getProductById = (req, res, next, id) => {
  Product.findById(id).populate("category").exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      res.json(product);
      // req.product = product;
      // next();
    });
};

// getCategoryById function for read category by Id.
exports.getProductCatById = (req, res, next, id) => {
  var cat_id = mongoose.Types.ObjectId(id);
    Product.find({category:cat_id}).populate("category").exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found in DB", err
        });
      }
      res.json(product);
    });
  };

// getProduct function for read product.
exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
  };

// removeProduct function for delete product using delete method.
exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, removedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({message: "Deletion was a success",removedProduct});
  });
};

// updateCategory function for update category using put.
exports.updateProduct = (req, res) => {
    
  const product = req.product;
 
  category.name = req.body.name;

  product.save((err, updatedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update product"
      });
    }
    res.json(updatedProduct);
  });
};



