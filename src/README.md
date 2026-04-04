# Mini Event Booking System

This project is a backend application designed to manage events, user bookings, and attendance tracking. It demonstrates the use of RESTful APIs, structured project architecture, and database integration using Node.js and MySQL.

The system allows users to create events, book tickets, and track participation efficiently.

---

## Features

- Create and manage events  
- Book tickets for events  
- View user-specific bookings  
- Track attendance for events  
- RESTful API implementation  
- MySQL database integration  

---

## Tech Stack

- Backend: Node.js, Express.js  
- Database: MySQL  
- API Testing: Postman  
- API Documentation: Swagger  

---

## Project Structure

event-booking-system/
│── src/
│ ├── app.js
│ ├── routes/
│ ├── controllers/
│ └── config/
│── package.json
│── swagger.yaml
│── event_db.sql
│── README.md



---

## Prerequisites

Make sure you have the following installed:

- Node.js (v16 or above recommended)  
- MySQL Server  
- npm (comes with Node.js)  
- Postman (for API testing)  

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-link>
cd event-booking-system

2.Install dependencies
```bash
npm install
```


### Setup the Database
1.Open MySQL Workbench.
2.Import the event_db.sql file
3.Execute the script to create database and tables

Database: event_db
users
events
bookings
attendance

## Configure Environment Variables

Create a .env file in the root directory and add:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=db_password
DB_NAME=event_db
PORT=3000

## Start the Server
```bash
npm run dev
```
Server will run on [http://localhost:3000]


## API Testing
1.Using Postman
Import the endpoints manually or use the Postman collection.
Test endpoints:
GET /events → List all events
POST /events → Create an event
POST /bookings → Book tickets
GET /users/:id/bookings → Get user bookings
POST /events/:id/attendance → Record attendance

2.Using Swagger
Open Swagger Editor and paste the content of swagger.yaml to test APIs through UI.

Author

Developed by Sana Aara

This project was created as part of a technical assessment to demonstrate backend development skills and understanding of API design.