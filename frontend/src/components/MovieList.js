import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import "../App.css";
import Navbar from "./navbar/navbar";
const stripePromise = loadStripe("your-stripe-public-key");

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => {
        console.log("Backend response:", res);
        const moviesData = res.data.map((movie) => ({
          ...movie,
          showtimes: Array.isArray(movie.showtimes) ? movie.showtimes : [],
        }));
        setMovies(moviesData);
        console.log("Mapped movies data:", moviesData);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setSelectedShowtime("");
    setSelectedSeats([]);
    setShowModal(true);
  };

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  const handleBooking = () => {
    const bookingData = {
      movieId: selectedMovie.id,
      seats: selectedSeats,
      showtime: selectedShowtime,
      totalAmount: selectedSeats.length * selectedMovie.ticketPrice,
    };

    setBookingDetails(bookingData);
    setShowModal(false);
  };

  const handlePaymentSuccess = (data) => {
    console.log("Payment successful:", data);
    setBookingDetails(null);
    alert("Booking confirmed!");
  };

  return (
    <>
     <Navbar/>
    <div className="App">
     
      <h1>Movie Booking System</h1>
      {bookingDetails ? (
        <div>
          {/* <h2>Booking Confirmation</h2> */}
          <h1>Total Amount: ₹ {bookingDetails.totalAmount}</h1>
          <Elements stripe={stripePromise}>
            <Payment
              bookingData={bookingDetails}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
        </div>
      ) : (
        <div>
          <hr className="divider" />
          <div className="container-fluid p-0">
            <div className="row g-0">
              {movies.map((movie) => (
                <div key={movie.id} className="col-lg-4 col-sm-6">
                  <div
                    className="portfolio-box"
                    onClick={() => handleMovieSelect(movie)}
                  >
                    <iframe
                      src={movie.videoUrl}
                      alt={movie.title}
                      className="w-100 p-3 mt-3"
                      style={{ height: "300px" }}
                    />
                    <div className="portfolio-box-caption">
                      <div
                        className="project-category text-dark-50"
                        style={{ color: "black" }}
                      >
                        {movie.genre}
                      </div>
                      <div className="project-name" style={{ color: "black" }}>
                        {movie.title}
                      </div>
                      <div style={{ marginLeft: "-200px" }}>
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          Show Times:{" "}
                        </span>
                        {movie.showtimes.length > 0
                          ? movie.showtimes.join(", ")
                          : "No showtimes available"}
                      </div>
                      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                        book Now : ₹ {movie.ticketPrice}
                      </div>
                      <button
                        className="btn btn-primary"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        Book Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

      
          <div
            className={`modal fade ${showModal ? "show" : ""}`}
            style={{ display: showModal ? "block" : "none" }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Select Showtime and Seats
                  </h5>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {selectedMovie && (
                    <div className="showtime">
                      <h2>
                        <br /> Movies: {selectedMovie.title}
                      </h2>
                      <ul>
                        {selectedMovie.showtimes.length > 0 ? (
                          selectedMovie.showtimes.map((showtime) => (
                            <li
                              key={showtime}
                              onClick={() => handleShowtimeSelect(showtime)}
                            >
                              Showtime: {showtime}
                            </li>
                          ))
                        ) : (
                          <li>No showtimes available</li>
                        )}
                        <li> Showtime : 12am to 2am</li>
                      </ul>
                    </div>
                  )}

                  {selectedShowtime && (
                    <div className="showtime">
                      <h2>Select Seats</h2>
                      <div className="seating-chart">
                        {[...Array(20).keys()].map((seat) => (
                          <span
                            key={seat}
                            className={
                              selectedSeats.includes(seat)
                                ? "seat selected"
                                : "seat"
                            }
                            onClick={() => handleSeatSelect(seat)}
                          >
                            {seat + 1}
                          </span>
                        ))}
                      </div>
                      <button
                        className="btn btn-success"
                        onClick={handleBooking}
                      >
                        Book Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default MovieList;
