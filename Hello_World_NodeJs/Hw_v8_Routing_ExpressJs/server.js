// ---------NodeJs backend Server for Hotels---------
import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './lib/dbConnect.js';
import employeeRoutes from './routes/employeeRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

const app = express();

dotenv.config(); // Load environment variables from .env file
const port = 3000; // running PORT 3000


app.use(express.json()); // Middleware to parse JSON


dbConnect(); // Connect to the database

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to my Hotel RadheKrishna.');
});

// Use the Router
app.use("/employee", employeeRoutes);
app.use("/menu", menuRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

