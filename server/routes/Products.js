const express = require("express");
const router = express.Router();

const { GetProducts } = require("../controllers/Products");

// Get Products from Products Collection
router.get("/getFromProducts", GetProducts);

module.exports = router;
