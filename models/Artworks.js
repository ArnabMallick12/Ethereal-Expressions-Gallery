// models/Artwork.js
const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Artist_Name: { type: String, required: true },
  Description: String,
  Artwork_image: { type: String, required: true },
  Medium: { type: String, required: true }
});

module.exports = mongoose.model('Artwork', artworkSchema);
