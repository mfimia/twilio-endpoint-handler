const ngrok = require("ngrok");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

// generate url to expose localhost with ngrok module
const url = new Promise((resolve, _) => {
  (async function () {
    const ngrokUrl = await ngrok.connect(PORT);
    console.log("server url:", ngrokUrl);
    resolve(ngrokUrl);
  })();
});

module.exports = url;
