const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    duration: req.body.duration,
    showtimes:req.body.showtimes,
    ticketPrice:req.body.ticketPrice,
    videoUrl: req.body.videoUrl,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("ressss",res)
  }
});



module.exports = router;
