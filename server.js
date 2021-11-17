const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// Using Routes
const useRoutes = require('./routes/routes');
useRoutes(app);

// Stripe Payment intent
const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body;
    const amountInt = Number.parseInt(amount, 10)*100
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({

        amount: amountInt,
        currency: "usd",
        payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
});


const PORT = process.env.PORT || 8000
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zl9zm.mongodb.net/Doctors_Portal`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is connected at http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.log(error);
    })
