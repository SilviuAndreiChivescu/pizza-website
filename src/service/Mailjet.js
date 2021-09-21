const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const SendEmailViaMailjet = (email) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.SENDER,
          Name: "Medieval Pizza",
        },
        To: [
          {
            Name: "Angajat al Medieval Pizza",
            Email: process.env.RECEIVER,
          },
        ],
        Subject: `Order for ${email.nameText}`,
        TextPart: `Dear employee, order details:  ${email.nameText} ${email.contactText} ${email.addressText} ${email.deliveryText} ${email.cartText}`,
        HTMLPart: `<h3>Dear employee</h3> <h3>Order details: </h3> <ul> <li>Name: ${email.nameText}</li> <li>Contact: ${email.contactText}</li> <li>Address: ${email.addressText}</li> <li>Delivery details: ${email.deliveryText}</li> Cart: ${email.cartText}</ul>`,
      },
    ],
  });
  request.catch((err) => {
    console.log(
      `Email status code: ${err.statusCode}. Check if API keys are set`
    );
  });
};

module.exports = { SendEmailViaMailjet };
