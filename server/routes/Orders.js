const express = require("express");
const router = express.Router();

const { InsertOrder, GetCarts, GetOrder } = require("../controllers/Orders");

// Insert order into Orders Collection
router.post("/insertIntoOrders", InsertOrder);

// Get all Cart data from Orders Collection for a particular user by email
router.get("/getFromOrders/:email", GetCarts);

// Get particular order by id for TrackOrderPage
router.get("/readFromOrdersById/:id", GetOrder);

module.exports = router;
