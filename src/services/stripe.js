import Stripe from 'stripe';
const stripe = Stripe('sk_test_51QrOCpBlPMhMPeb3jPcy7YnzoG9pMqyJko2267Xp5jCL7Bylqg0ZMdTTFFdHC44v7D9ZHwm2IkOnfSlqPeg2vCl4006DQn2MEN');

export const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    console.log('Payment Intent created: ', paymentIntent);

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Creating payment intent failed!, ', error);
    return { error: error.message };
  }
};


