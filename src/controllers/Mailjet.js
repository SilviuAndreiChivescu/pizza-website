const { SendEmailViaMailjet } = require("../service/Mailjet");

const SendEmail = (req) => {
  const email = req.body.Email;

  SendEmailViaMailjet(email);
};

module.exports = { SendEmail };
