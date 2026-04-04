// src/app.js
const express = require('express');
const app = express();
const db = require('./config/db');

// ROUTES — declare first, then you can use
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// ✅ TEMPORARY DEBUG
console.log('bookingRoutes:', bookingRoutes); // now works because bookingRoutes is declared

// MIDDLEWARE
app.use(express.json());

// TEST DB CONNECTION
app.get('/', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.send('Database connected successfully');
  } catch (err) {
    res.status(500).send('Database connection failed');
  }
});

// CONNECT ROUTES
app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);

// START SERVER
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));