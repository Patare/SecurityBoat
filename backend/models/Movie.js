const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  duration: Number,
  videoUrl: String,
  showtimes: [String] ,
  ticketPrice:Number,
});

module.exports = mongoose.model('movies', movieSchema);

