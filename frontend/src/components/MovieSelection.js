import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieSelection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/api/booking/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="movie-selection">
      <h2>Choose a Movie</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <p>Genre: {movie.genre}</p>
            <p>Showtimes: {movie.showtimes.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSelection;
