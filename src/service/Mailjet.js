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
        Subject: `Comanda pentru ${email.nameText}`,
        TextPart: `Draga Angajat al Medieval Pizza, Detalii comanda:  ${email.nameText} ${email.contactText} ${email.addressText} ${email.deliveryText} ${email.cartText}`,
        HTMLPart: `<h3>Draga Angajat al Medieval Pizza</h3> <h3>Detalii comanda: </h3> <ul> <li>Nume: ${email.nameText}</li> <li>Contact: ${email.contactText}</li> <li>Adresa: ${email.addressText}</li> <li>Detalii de livrare: ${email.deliveryText}</li> Produse: ${email.cartText}</ul>`,
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
