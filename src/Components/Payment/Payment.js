import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51Q0TEXRvwjj18J6TooOsxJF8J8IweJyuMZdyc2p8M2bGJEihjAdAwbfUpavDZVfN9j5AAxUbOVt6JvjbHQSczIC600myHW2EBv');

const CheckoutForm = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [amount, setAmount] = useState(0);
  const [packageDetails, setPackageDetails] = useState({ name: '', description: '' });

  // Get the backend URL from environment variable
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const storedAmount = sessionStorage.getItem('paymentAmount');
    const storedPackageName = sessionStorage.getItem('selectedPackageName');
    const storedPackageDescription = sessionStorage.getItem('selectedPackageDescription');

    if (storedAmount) setAmount(parseInt(storedAmount, 10)); 
    if (storedPackageName && storedPackageDescription) {
      setPackageDetails({
        name: storedPackageName,
        description: storedPackageDescription,
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!cardholderName.trim()) {
      toast.error("Please enter the cardholder's name");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/payments/payment-intent`, {
        amount,
        cardholderName,
      });

      const { clientSecret } = response.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName,
          },
        },
      });

      if (error) {
        toast.error('Payment failed: ' + error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast.success(`Payment of $${(amount / 100).toFixed(2)} successful!`, {
          position: "top-right", 
          autoClose: 3000,
        });

        // Clear session data after payment
        sessionStorage.removeItem('paymentAmount');
        sessionStorage.removeItem('selectedPackageName');
        sessionStorage.removeItem('selectedPackageDescription');

        const userPackages = JSON.parse(localStorage.getItem('userPackages')) || [];
        const newPackage = {
          id: sessionStorage.getItem('selectedPackageId'), 
          name: packageDetails.name,
          description: packageDetails.description,
          price: amount,
          date: new Date().toISOString(),
        };

        userPackages.push(newPackage);
        localStorage.setItem('userPackages', JSON.stringify(userPackages));

        await axios.post(`${backendUrl}/api/packages/purchase`, {
          userId: sessionStorage.getItem('userId'),
          packageId: sessionStorage.getItem('selectedPackageId'),
          name: packageDetails.name,
          description: packageDetails.description,
          price: amount,
        });

        // Redirect based on the amount
        setTimeout(() => {
          if (amount === 1000) {
            window.location.href = 'https://tech-e-voice-frontend-1srb.vercel.app/';
          } else if (amount === 4999) {
            window.location.href = 'https://tech-e-voice-frontend.vercel.app/';
          } else if (amount === 10000) {
            window.location.href = 'http://localhost:5173';
          } else {
            window.location.href = '/';
          }
        }, 3000);
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h4 className="Container-Payment">Complete Your Payment</h4> 
      <div className="form-group-1-1-1 mb-3">
        <label className="form-label-Pay" htmlFor="cardholderName">Cardholder Name</label>
        <input
          type="text"
          id="cardholderName"
          className="form-control-pay"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
        />
      </div>
      <div className="form-group-1-1-1 mb-3">
        <label className="form-label-Pay" htmlFor="cardDetails">Card Details</label>
        <CardElement
          id="cardDetails"
          className="form-control-pay"
          options={{
            style: {
              base: { fontSize: '16px', color: '#495057', '::placeholder': { color: '#aab7c4' } },
              invalid: { color: '#dc3545' },
            },
          }}
        />
      </div>
      <div className="Packages-Details">
        <p><strong>Package Name:</strong> {packageDetails.name}</p>
        <p><strong>Description:</strong> {packageDetails.description}</p>
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`} 
      </button>
    </form>
  );
};

const Payment = () => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => setShowModal(false);

  return (
    <div className="container payment-container">
      {showModal && (
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            {/* <Modal.Title>Payment</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <Elements stripe={stripePromise}>
              <CheckoutForm onClose={handleClose} />
            </Elements>
          </Modal.Body>
        </Modal>
      )}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default Payment;
