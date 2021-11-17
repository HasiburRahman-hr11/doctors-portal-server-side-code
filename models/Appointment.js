const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    email: String,
    phone: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    paymentInfo: {
        type: Object
    },
    status: {
        type: String,
        default: 'pending'
    },
    address: String

}, { timestamps: true });

const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;