import express from 'express';
import mongoose from 'mongoose';
import Todo from './models/Todo.js';

const MyConnection = await mongoose.connect('mongodb://localhost:27017/todo');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());


// Route to create a new todo with POST request
app.post('/create', async (req, res) => {
    try {
        const { title, desc, isDone } = req.body; // Get data from request body
        const todo = new Todo({
            title: title || 'Default title', // Optional default values
            desc: desc || 'Default description',
            isDone: isDone || false,
        });
        await todo.save();
        res.status(201).json(todo); // Use 201 status code for successful creation
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
});

// Route to fetch all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving todos' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
