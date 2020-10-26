const Category = require("../models/category")

// createcategory function for creating new category using post.
exports.createCategory = (req, res) =>
   {
    const category = new Category(req.body);
   
    category.save((err, category) => 
    {
      if (err) 
      {
        if(err.code === 11000 || err.code === 11001)
        {
          return res.status(400).json({
            error: "Duplicate Value " +req.body.name +",Value must be unique",});
        }
        else
        {
          return res.status(400).json({
            error: "NOT able to save category in DBs",
           
          });
        }
      }
      res.json({ category });
    });
  };
  
// getCategoryById function for read category by Id.
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB"
        });
      }
      req.category = cate;
      next();
    });
  };
  
// getCategory function for read category.
exports.getCategory = (req, res) => {
    return res.json(req.category);
  };

// getAllCategory function for read all categories.
exports.getAllCategory = (req, res) => 
  {
    Category.find().exec((err, categories) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(categories);
    });
  };
  
// updateCategory function for update category using put.
exports.updateCategory = (req, res) => {
    
    const category = req.category;
   
    category.name = req.body.name;
  
    category.save((err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update category"
        });
      }
      res.json(updatedCategory);
    });
  };
  
  // removeCategory function for delete category using delete.
  exports.removeCategory = (req, res) => {

    const category = req.category;
  
    category.remove((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this category"
        });
      }
      res.json({
        message: "Successfull deleted"
      });
    });
  };