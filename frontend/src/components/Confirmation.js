import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const { movie, seats, totalPrice } = location.state;

  return (
    <div>
      <h2>Booking Confirmation</h2>
      <p>Movie: {movie.title}</p>
      <p>Seats: {seats.join(', ')}</p>
      <p>Total Price: ${totalPrice}</p>
    </div>
  );
};

export default Confirmation;

