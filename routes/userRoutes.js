const { createNewUser, getAllUsers, getUserByEmail, updateUser } = require('../controllers/userControllers');
const verifyAdmin = require('../middlewares/verifyAdmin');

const router = require('express').Router();

// Create New User
router.post('/create' , createNewUser);

// Get All Users
router.get('/', getAllUsers);

// get User by Email
router.get('/:email' , getUserByEmail);

// Update User
router.put('/:email' , verifyAdmin , updateUser);

module.exports = router;