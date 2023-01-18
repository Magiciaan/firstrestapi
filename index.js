const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

//connecting to mongo
const DBrui =
  "mongodb+srv://Datamanagement:gKqq46vSnvymlnWk@cluster0.nkzwg3y.mongodb.net/Person?retryWrites=true&w=majority";
mongoose.connect(DBrui);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use("/api", require("./routes/api.js"));
//using /api before each site so localhost:0/home has to be localhost:0/api/home
//also used require in same place without keeping a const on above to shorten the code

//this runs when next is used on routing when an error occurs and has to be below the routing above
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(422);
  res.send(err.message);
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
app.use(express.static("views"));
