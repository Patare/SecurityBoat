const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const  movieRoutes =require('./routes/movieRoutes')
const menuRoutes = require('./routes/menuRoutes');
const path = require('path');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);


app.use('/movies', movieRoutes);
app.use('/menu', menuRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

 
  app.post('/api/book', (req, res) => {
    const { movieId, seats, showtime } = req.body;
    res.json({ success: true, message: 'Booking confirmed!', details: req.body });
  })
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
