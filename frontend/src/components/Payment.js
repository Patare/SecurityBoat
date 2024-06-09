import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import './Payment.css';

function Payment({ bookingData, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const paymentMethodData = {
      type: selectedPaymentMethod,
      card: cardElement,
    };

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        bookingData.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: 'Customer Name',
            },
          },
        }
      );

      if (error) {
        console.error(error);
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent);
      }
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <div className="payment-options">
        <div
          className={`payment-option ${selectedPaymentMethod === 'card' ? 'selected' : ''}`}
          onClick={() => setSelectedPaymentMethod('card')}
        >
          <h3>Credit/Debit Card</h3>
          <div className="card-element">
            <CardElement />
          </div>
        </div>
        <div
          className={`payment-option ${selectedPaymentMethod === 'google_pay' ? 'selected' : ''}`}
          onClick={() => setSelectedPaymentMethod('google_pay')}
        >
          <h3>Google Pay</h3>
          <img src='gp.png' 
          width="80%" height="70%"/>
        </div>
        <div
          className={`payment-option ${selectedPaymentMethod === 'phonepe' ? 'selected' : ''}`}
          onClick={() => setSelectedPaymentMethod('phonepe')}
        >
          <h3>PhonePe</h3>
          <img src='phonepay.png'
           width='80%' height="70%"/>
        </div>
      </div>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

export default Payment;
