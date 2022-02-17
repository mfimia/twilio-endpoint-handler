const VoiceResponse = require("twilio").twiml.VoiceResponse;
const twilio = require("twilio");
const url = require("../utils/urlGenerator");

const authToken = process.env.TWILIO_TOKEN;

const helloWorld = async (req, res) => {
  const params = req.body;

  const twilioSignature = req.headers["x-twilio-signature"];

  const requesIsValid = await url.then((resolvedUrl) => {
    return twilio.validateRequest(
      authToken,
      twilioSignature,
      `${resolvedUrl}/voice`,
      params
    );
  });

  if (!requesIsValid) {
    return res.status(401).send("Unauthorized");
  } else {
    try {
      const city = req.body.FromCity;

      // Use the Twilio Node.js SDK to build an XML response
      const twiml = new VoiceResponse();
      twiml.say({ voice: "alice" }, `Ohhh, I love ${city}!`);
      twiml.play({}, "https://demo.twilio.com/docs/classic.mp3");

      // Render the response as XML in reply to the webhook request
      res.type("text/xml");
      res.send(twiml.toString());
    } catch (error) {
      res.send(error);
    }
  }
};

module.exports = helloWorld;
