-- -----------------------------
-- Database: event_db
-- -----------------------------
DROP DATABASE IF EXISTS event_db;
CREATE DATABASE event_db;
USE event_db;

-- -----------------------------
-- Table: users
-- -----------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Sample users
INSERT INTO users (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com');

-- -----------------------------
-- Table: events
-- -----------------------------
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    total_capacity INT NOT NULL,
    remaining_tickets INT NOT NULL
);

-- Sample events
INSERT INTO events (title, description, date, total_capacity, remaining_tickets) VALUES
('Tech Conference 2026', 'A conference for tech enthusiasts', '2026-05-20', 100, 100),
('Music Fest', 'Live music festival', '2026-06-15', 50, 50);

-- -----------------------------
-- Table: bookings
-- -----------------------------
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    booking_code VARCHAR(50) NOT NULL,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Sample bookings
INSERT INTO bookings (user_id, event_id, booking_code) VALUES
(1, 1, 'BOOK-A1B2C3'),
(2, 2, 'BOOK-D4E5F6');

-- Update remaining tickets after sample bookings
UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = 1;
UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = 2;

-- -----------------------------
-- Table: attendance
-- -----------------------------
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);