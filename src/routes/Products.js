const express = require("express");
const router = express.Router();

const {
  GetProducts,
  InsertProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/Products");

// Get Products from Products Collection
router.get("/getFromProducts", GetProducts);

// Insert product in Products Collection
router.post("/insertIntoProducts", InsertProduct);

// Update product in Products Collection
router.put("/updateProducts", UpdateProduct);

// Delete product from Products Collection
router.delete("/deleteFromProducts/:id", DeleteProduct);

module.exports = router;
