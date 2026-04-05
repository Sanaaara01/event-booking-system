// const db = require('../config/db');

// exports.markAttendance = async (req, res) => {
//   const { id } = req.params; // event_id
//   const { bookingCode } = req.body;

//   try {
//     // Check booking exists
//     const [booking] = await db.execute(
//       'SELECT * FROM bookings WHERE booking_code = ? AND event_id = ?',
//       [bookingCode, id]
//     );

//     if (booking.length === 0) {
//       return res.status(400).json({ error: 'Invalid booking code' });
//     }

//     const userId = booking[0].user_id;

//     // Insert attendance
//     await db.execute(
//       'INSERT INTO attendance (user_id, event_id) VALUES (?, ?)',
//       [userId, id]
//     );

//     res.json({
//       message: 'Attendance recorded successfully',
//       ticketsChecked: 1
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const db = require('../config/db');

// POST /events/:id/attendance
const markAttendance = async (req, res) => {
  const { id: event_id } = req.params;  // event id from URL
  const { code } = req.body;            // booking code from request

  if (!code) {
    return res.status(400).json({ success: false, message: 'Booking code required' });
  }

  try {
    // Validate the booking code belongs to this event
    const [bookings] = await db.query(
      'SELECT * FROM bookings WHERE booking_code = ? AND event_id = ?',
      [code, event_id]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ success: false, message: 'Invalid booking code' });
    }

    const booking = bookings[0];

    // Count total bookings for this event
    const [countResult] = await db.query(
      'SELECT COUNT(*) as total FROM bookings WHERE event_id = ?',
      [event_id]
    );

    // Log attendance
    await db.query(
      'INSERT INTO event_attendance (user_id, event_id) VALUES (?, ?)',
      [booking.user_id, event_id]
    );

    res.json({
      success: true,
      message: 'Attendance marked',
      tickets_booked: countResult[0].total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { markAttendance };