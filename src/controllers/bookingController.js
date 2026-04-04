const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.bookTicket = async (req, res) => {
  const { user_id, event_id } = req.body;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [rows] = await conn.query(
      "SELECT remaining_tickets FROM events WHERE id = ? FOR UPDATE",
      [event_id]
    );

    if (rows.length === 0) throw new Error("Event not found");
    if (rows[0].remaining_tickets <= 0) throw new Error("Tickets sold out");

    await conn.query(
      "UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ?",
      [event_id]
    );

    const bookingCode = uuidv4();

    await conn.query(
      "INSERT INTO bookings (user_id, event_id, booking_code) VALUES (?, ?, ?)",
      [user_id, event_id, bookingCode]
    );

    await conn.commit();

    res.json({
      message: "Booking successful",
      bookingCode
    });
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    conn.release();
  }
};