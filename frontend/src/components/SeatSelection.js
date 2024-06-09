import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeatSelection = ({ screen }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axios.get(`/api/booking/seats/${screen}`)
      .then(res => setSeats(res.data))
      .catch(err => console.log(err));
  }, [screen]);

  const handleSeatClick = (seat) => {
  };

  return (
    <div className="seat-selection">
      <h2>Select Seats for {screen}</h2>
      <div className="seat-map">
        {seats.map(seat => (
          <div
            key={seat}
            className={`seat ${seat.isBooked ? 'booked' : ''} ${seat.isSelected ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatSelection;
