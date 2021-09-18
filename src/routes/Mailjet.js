const express = require("express");
const router = express.Router();

const { SendEmail } = require("../controllers/Mailjet");

// Post request to send email via Mailjet
router.post("/sendEmail", SendEmail);

module.exports = router;
