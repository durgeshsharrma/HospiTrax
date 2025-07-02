const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
module.exports.createCheckoutSession = async (req, res) => {
    try {
        const { amount, appointmentId } = req.body;

        console.log('Received:', { amount, appointmentId });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Doctor Appointment Booking',
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: https://hospitrax.onrender.com/payment-success?appointmentId=${appointmentId}`,
            cancel_url: `https://hospitrax.onrender.com/payment-cancel`,
        });

        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error('Stripe Error:', err.message);
        res.status(500).json({ message: 'Stripe session creation failed' });
    }
};
