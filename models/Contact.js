const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  street: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  zip: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  }
});

module.exports = mongoose.model("Contact", schema);
