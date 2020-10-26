const express = require('express')

const router = express.Router();

// declaration of objects...
const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory} = 
      require("../controllers/category");

router.param("categoryId", getCategoryById);    // Constructor used for getting Id...


// post method used for create new categories.
router.post("/category", createCategory);

// get methods used for read category Id and all categories.
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//put method update category using category Id..
router.put("/category/:categoryId",updateCategory);

//delete method for delete category using category Id..
router.delete("/category/:categoryId",removeCategory);

// exporting router for using next purpose 
module.exports = router;