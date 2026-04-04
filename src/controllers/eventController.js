const db = require('../config/db');

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, total_capacity } = req.body;

    if (!title || !date || !total_capacity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await db.query(
      `INSERT INTO events (title, description, date, total_capacity, remaining_tickets)
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, date, total_capacity, total_capacity]
    );

    res.status(201).json({ message: "Event created successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get Events
exports.getEvents = async (req, res) => {
  try {
    const [events] = await db.query(
      "SELECT * FROM events WHERE date > NOW()"
    );

    res.json(events);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};