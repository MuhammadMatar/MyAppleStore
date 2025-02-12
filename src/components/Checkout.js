import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form, Spinner } from 'react-bootstrap';
import { db, doc, setDoc } from '../services/firebase';
import { createPaymentIntent } from '../services/stripe';
import { fetchCart, updateCart } from '../services/cart'

const stripePromise = loadStripe('pk_test_51QrOCpBlPMhMPeb39KBuLFdXGa8SuJ22MBVGU2px4r5B0W5o1Fi6TYC9qINuJdiposFfbF94ADEneiizYCZxH7DA00S3XqdzFS');

const Checkout = ({ user, cartItems, clientSecret, setCartItems, setLoading, setError }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(undefined);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    setTotalAmount(total);
  }, [cartItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret || isProcessing)
      return;

    setIsProcessing(true);
    setPaymentError('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
      // confirmParams: {
      //   // return_url: 'http://localhost:3000/products',
      // },
    });

    if (error) {
      setPaymentError(error.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      try {
        await setDoc(doc(db, 'orders', user.uid), {
          userId: user.uid,
          cartItems,
          totalAmount,
          paymentStatus: 'success',
          createdAt: new Date(),
        });

        setPaymentSuccess(true);
        await updateCart(user, []);
        await fetchCart(user, setCartItems, setLoading, setError)
      } catch (err) {
        setPaymentError('Payment failed!');
      }
    }

    setIsProcessing(false);
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      {paymentSuccess ? (
        <div className="alert alert-success">
          Payment successful!.
        </div>
      ) : (<></>)}

      {paymentError ? (
        <div className="alert alert-danger">
          {paymentError}
        </div>
      ) : (<></>)}

      {!paymentSuccess ? (
        <div className="row">
          <div className="col-md-6">
            <h3>Order Summary</h3>
            <ul className="list-group">
              {cartItems.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
            <hr />
            <h4>Total: ${totalAmount}</h4>
          </div>

          <div className="col-md-6">
            <h3>Payment Details</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Credit or Debit Card</Form.Label>
                <PaymentElement />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100" disabled={isProcessing || paymentSuccess}>
                {isProcessing ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Pay Now'
                )}
              </Button>
            </Form>
          </div>
        </div>
      ) : (<></>)}
    </div>

  );
};

const CheckoutPage = ({ user, cartItems, setCartItems, setLoading, setError }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await createPaymentIntent(cartItems.reduce((acc, item) => acc + item.price, 0));

      if (response.error) {
        console.error('Error stripe client secret:', response.error);
      } else {
        setClientSecret(response.clientSecret);
      }
    };

    fetchClientSecret();
  }, [cartItems]);

  const options = clientSecret ? { clientSecret } : null;

  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <Checkout user={user} cartItems={cartItems} clientSecret={clientSecret} setCartItems={setCartItems} setLoading={setLoading} setError={setError} />
        </Elements>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          {user ? (
            <>
              {cartItems.length === 0 ? (
                <p className="ms-3">Your cart is Empty!</p>

              ) : (
                <>
                  <div className="spinner-border spinner-border-lg text-warning"/>
                  <p className="ms-3">Loading payment details...</p>
                </>
              )}
            </>
          ) : (
            <p className="ms-3">Please log in...</p>
          )}
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
