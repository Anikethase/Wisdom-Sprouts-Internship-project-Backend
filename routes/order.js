const express = require("express");
const router = express.Router();

const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus
  } = require("../controllers/order");


// post method for creating new orders.
router.post("/order",createOrder);

// Exporting module which is used in controllers
module.exports = router;
