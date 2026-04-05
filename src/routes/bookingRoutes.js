// const express = require('express');
// const router = express.Router();
// const bookingController = require('../controllers/bookingController');

// // Make sure bookTicket exists and is a function
// router.post('/', bookingController.bookTicket);

// module.exports = router; // THIS IS CRITICAL

const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');

router.post('/', createBooking);

module.exports = router;