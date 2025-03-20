import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Routes
app.get('/', (req, res) => {
    res.send('Express Server Start');
});

app.post('/', (req, res) => {
    console.log('Received Data:', req.body); // Log form data
    res.json({ message: 'Data received successfully', data: req.body });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
