const twilio = require("twilio");
const express = require("express");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const ngrok = require("ngrok");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

// expose localhost
(async function () {
  const url = await ngrok.connect(PORT);
  console.log(url);
})();

const app = express();

// parse body json with express middleware
app.use(express.json({ extended: false }));

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post(
  "/voice",
  // validation webhook. will only require validation when not in test environment
  // only allows requests coming from twilio
  twilio.webhook({ validate: process.env.NODE_ENV !== "test" }),
  (req, res) => {
    const city = req.body.FromCity;

    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
    twiml.say({ voice: "alice" }, `Ohhh, I love ${city}!`);
    twiml.play({}, "https://demo.twilio.com/docs/classic.mp3");

    // Render the response as XML in reply to the webhook request
    res.type("text/xml");
    res.send(twiml.toString());
  }
);

// Create an HTTP server and listen for requests on env port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
