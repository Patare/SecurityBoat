import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieManagement.css';
import Sidebar from '../navbar/Sidebar';
function MovieManagement() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    duration: '',
    showtimes: '',
    ticketPrice:'',
    videoUrl: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error('Error fetching movies:', err));
  }, []);

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const embedUrl = convertToEmbedUrl(newMovie.videoUrl);

    axios.post('http://localhost:5000/movies', {
      ...newMovie,
      videoUrl: embedUrl,
    })
      .then(res => {
        setMovies([...movies, res.data]);
        setNewMovie({
          title: '',
          genre: '',
          duration: '',
          showtimes: '',
          ticketPrice:'',
          videoUrl: '',
        });
      })
      .catch(err => console.error('Error adding movie:', err));
  };

  const convertToEmbedUrl = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  return (
    <>
    <Sidebar/>
   
    <div className="movie-management">
      <h2>Movie Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="title" placeholder="Title" value={newMovie.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="text" name="genre" placeholder="Genre" value={newMovie.genre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="text" name="duration" placeholder="Duration" value={newMovie.duration} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="text" name="showtimes" placeholder="Showtimes" value={newMovie.showtimes} onChange={handleChange} />
        </div>

        <div className="form-group">
          <input type="number" name="ticketPrice" placeholder="ticketPrice" value={newMovie.ticketPrice} onChange={handleChange} />
        </div>

        <div className="form-group">
          <input type="text" name="videoUrl" placeholder="Video URL" value={newMovie.videoUrl} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn">Add Movie</button>
      </form>       
        {movies.map(movie => (
        <div className="card" style={{width: "18rem",marginTop:"20px"}} key={movie.id} >
        {movie.videoUrl && (
                  <iframe
                    width="100%"
                    height="100%"
                    src={movie.videoUrl}
                    title={movie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
  <div className="card-body">
    <h5 className="card-title">movies : {movie.title}</h5>
    <p className="card-text">Discription : {movie.genre}</p>
    {/* <a href="#" className="btn btn-primary">{movie.duration}</a> */}
    <p className="card-text">Showtime : {movie.showtimes}</p>
    <p className="card-text">Ticket Price :₹ {movie.ticketPrice}</p>
  </div>
</div>
 ))}
   
    </div>
    </>
  );
}

export default MovieManagement;
