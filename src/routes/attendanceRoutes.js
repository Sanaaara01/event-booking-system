// const express = require('express');
// const router = express.Router();
// const attendanceController = require('../controllers/attendanceController');

// router.post('/events/:id/attendance', attendanceController.markAttendance);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { markAttendance } = require('../controllers/attendanceController');

router.post('/:id/attendance', markAttendance);

module.exports = router;