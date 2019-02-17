const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const user = require("./routes/api/user");
/* Initialize the express app */
const app = express();

// Connect to database
mongoose
  .connect("mongodb://localhost:27017/loginregistersystem", {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log("Could not connect to MongoDB! ", err));

/* MiddleWare */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Passport init
app.use(passport.initialize());
require("./config/passport")(passport);

/* All Route */
app.use("/api/user", user);

/* Initialize the Server */
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is listening at: http://localhost:${port}`)
);
