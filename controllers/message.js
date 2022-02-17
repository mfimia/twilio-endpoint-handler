const MessageResponse = require("twilio").twiml.MessagingResponse;
const twilio = require("twilio");
const url = require("../utils/urlGenerator");

const authToken = process.env.TWILIO_AUTH_TOKEN;

const helloWorld = async (req, res) => {
  // get params from body request
  const params = req.body;

  //   automatic header generated in twilio requests
  const twilioSignature = req.headers["x-twilio-signature"];

  //   resolve url promise and pass it to validator function
  const requesIsValid = await url.then((resolvedUrl) => {
    return twilio.validateRequest(
      authToken,
      twilioSignature,
      `${resolvedUrl}/message`,
      params
    );
  });

  //   wait for validation and apply logic
  if (!requesIsValid) {
    console.log("unauthorized request");
    return res.status(401).send("Unauthorized");
  } else {
    try {
      console.log("Hello World!");

      // Use the Twilio Node.js SDK to build an XML response
      const twiml = new MessageResponse();
      twiml.message("Hello World!");

      // Render the response as XML in reply to the webhook request
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    } catch (error) {
      console.log("server error");
      res.send(error);
    }
  }
};

module.exports = helloWorld;
