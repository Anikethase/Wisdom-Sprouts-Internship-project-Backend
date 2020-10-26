const express = require("express");
const router = express.Router();
var multer  = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
});

var upload = multer({ storage: storage })
const {getProductById,getProductCatById, createProduct,getAllproduct,getProduct, updateProduct, removeProduct,
  photo,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/product");


router.param("productId", getProductById);  //constructor used for :Id
router.param("categoryId", getProductCatById);  //constructor used for :Id

// post method for create new product..
router.post("/product",upload.single('productImage'),createProduct);

// get method for read products..
router.get("/product",getAllproduct);
router.get("/product/:productId", getProductById);
router.get("/productcat/:categoryId", getProductCatById);


// put method for update products..
router.put("/product/:productId", updateProduct);

// delete method for deleting product. 
router.delete("/product/:productId",removeProduct);

// exporting module which is used in controllers..
module.exports = router;
