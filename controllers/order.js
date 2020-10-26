const { Order, ProductCart } = require("../models/order");

// getOrderById method for read method from database using Id.
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id).populate("products.product", "name price").exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in Database"
        });
      }
      req.order = order;
      next();
    });
};

// createOrder function for creating new orders.
exports.createOrder = (req, res) => {
    const order = new Order(req.body);
    order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in Database"
      });
    }
    res.json(order);
  });
};

