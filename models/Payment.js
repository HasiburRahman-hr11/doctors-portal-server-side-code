const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({

}, { timestamps: true });

const Payment = model('Payment', paymentSchema);

module.exports = Payment;