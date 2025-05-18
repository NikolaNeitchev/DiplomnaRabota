// pages/Checkout.js - Стилизирана страница за плащане със Stripe
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

function Checkout() {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ amount: 1000, currency: 'usd', orderId: id })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (result.error) {
      console.error('Payment failed:', result.error.message);
    } else {
      alert('Плащането е успешно! Ще получите имейл с потвърждение.');
      window.location.href = "/orders"; 
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center">Разплащане</h2>
        <Elements stripe={stripePromise}>
          <form onSubmit={handlePayment}>
            <div className="mb-3">
              <label className="form-label">Въведете картови данни</label>
              <div className="form-control">
                <CardElement />
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100">Плати</button>
          </form>
        </Elements>
      </div>
    </div>
  );
}

export default Checkout;
