const express = require("express");
const router = express.Router();

const { GetUser, InsertUser, UpdateUser } = require("../controllers/Users");

// Get request to see if particular User is already in Users Collection
router.get("/readFromUsers/:email", GetUser);

// Insert user to Users collection
router.post("/insertIntoUsers", InsertUser);

// Update Users Collection for MyAccountPage
router.put("/updateUsers", UpdateUser);

module.exports = router;
