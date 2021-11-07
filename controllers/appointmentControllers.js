const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Create New Appointment
exports.createAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();

        res.status(201).json(newAppointment);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Get Appointments
exports.getAppointments = async (req, res) => {
    const date = req.query.date;
    try {
        let appointments;

        if (req.query.date) {
            appointments = await Appointment.find({ date: date })
        } else {
            appointments = await Appointment.find();
        }
        res.status(200).json(appointments);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Delete an appointment (By Admin)
exports.deleteAnAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.user.email) {
            const user = await User.findOne({ email: req.user.email });

            if (user && user.role === 'admin') {
                const isAppointment = await Appointment.findById(id);
                if (!isAppointment) {
                    return res.status(500).json({ message: 'Appointment not found.' });
                }
                await Appointment.findByIdAndDelete(id);
                res.status(200).json({ message: 'Appointment deleted successfully' })
            } else {
                res.status(403).json({
                    message: 'You are not allowed to perform this action.'
                })
            }
        } else {
            res.status(404).json({
                message: 'You are not allowed to perform this action.'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}



// Cancel User Appointment (By User)
exports.cancelAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const isAppointment = await Appointment.findById(id);
        if (!isAppointment) {
            return res.status(500).json({ message: 'Appointment not found.' });
        }
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status: 'canceled' });
        res.status(200).json(updatedAppointment)

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Get Single Appointment
exports.getSingleAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}



// Update an Appointment
exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.user.email) {
            const user = await User.findOne({ email: req.user.email });

            if (user && user.role === 'admin') {
                const appointment = await Appointment.findById(id);
                if (!appointment) {
                    return res.status(400).json({ message: 'Appointment not found' })
                }

                const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });

                res.status(200).json(updatedAppointment);
            } else {
                res.status(403).json({
                    message: 'You are not allowed to perform this action.'
                })
            }
        } else {
            res.status(404).json({
                message: 'You are not allowed to perform this action.'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}