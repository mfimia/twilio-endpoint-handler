const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// parse url encoded body data with express middleware
app.use(bodyParser.urlencoded({ extended: false }));

// import routes
app.use("/voice", require("./routes/voice"));
app.use("/message", require("./routes/message"));

// Create an HTTP server and listen for requests on env port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
