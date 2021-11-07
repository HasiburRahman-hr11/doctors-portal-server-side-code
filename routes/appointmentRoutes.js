const router = require('express').Router();
const { createAppointment, getAppointments, deleteAnAppointment, getSingleAppointment, updateAppointment, cancelAppointment } = require('../controllers/appointmentControllers');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Create New Appointment
router.post('/create', createAppointment);

// Get all Appointments or Appointments by date
router.get('/', getAppointments);

// Get Single Appointment
router.get('/:id', getSingleAppointment);

// Update Appointment
router.put('/:id', verifyAdmin, updateAppointment);

// Delete an appointment (By Admin)
router.delete('/:id', verifyAdmin, deleteAnAppointment);

// Cancel User appointment  (By User)
router.put('/user-appointment/:id', cancelAppointment);

module.exports = router;