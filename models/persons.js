const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating Geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number], //this expects array of number as longitude and latitude requires 2 values
    index: "2dsphere", //2d sphere is the map type
  },
});

const personSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"], //passes the message
    },
    work: {
      type: String,
      required: [true],
    },
    available: {
      type: Boolean,
      default: false,
    },
    geometry:GeoSchema
  },
  { timestamps: [true] }
);
const Person = mongoose.model("person", personSchema);
module.exports = Person;
