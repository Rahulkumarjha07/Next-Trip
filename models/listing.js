const mongoose = require('mongoose');

const schema = mongoose.Schema

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: {
    filename: String,
    url: String
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;