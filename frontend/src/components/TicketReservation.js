import React, { useState } from 'react';
import SeatSelection from './SeatSelection';

const TicketReservation = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketCount, setTicketCount] = useState(1);

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const handleTicketCountChange = (e) => {
    setTicketCount(e.target.value);
  };

  const handleReservation = () => {
  
  };

  return (
    <div className="ticket-reservation">
      <SeatSelection screen="Screen 1" onSeatSelection={handleSeatSelection} />
      <h3>Ticket Reservation</h3>
      <label htmlFor="ticketCount">Number of Tickets:</label>
      <input type="number" id="ticketCount" value={ticketCount} onChange={handleTicketCountChange} />
      <button onClick={handleReservation}>Reserve Tickets</button>
    </div>
  );
}

export default TicketReservation;

