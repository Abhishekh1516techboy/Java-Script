// ---------NodeJs backend Server for Hotels---------
import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './lib/dbConnect.js';
import Employee from './models/employee.js';
import Menu from './models/menu.js';

const app = express();
const port = 3000; // running PORT 3000

// Middleware to parse JSON
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// Connect to the database
dbConnect();

app.get('/', (req, res) => {
    res.send('Welcome to my Hotel RadheKrishna.');
});


app.post('/employee', async (req, res) => {

    // Body contains form data
    const data = req.body;

    try {
        // Create new newEmployee document using mongoose model 
        const newEmployee = new Employee(data);

        // Save to MongoDB
        await newEmployee.save();

        // Respond with the saved Employee
        res.status(201).json({
            message: 'Employee Data saved successfully',
            employee: newEmployee,
        });
    } catch (error) {
        console.error('Error saving Employee:', error);
        res.status(500).json({ message: 'Failed to save Employee' });
    }

});


app.get('/employee', async (req, res) => {

    try {
        // Fetch Menu from Database
        const myEmployee = await Employee.find();

        // Respond with the find Employee
        res.status(200).json({
            message: 'Employee Data found successfully',
            employee: myEmployee,
        });
    } catch (error) {
        console.error('Error finding Employee:', error);
        res.status(500).json({ message: 'Failed to find Employee' });
    }

});

// Define a GET route for fetching employee data based on a dynamic slug parameter
app.get('/employee/:slug', async (req, res) => {

    // Extract the work type from URL parameter
    const slug = req.params.slug;

    try {
        // This query searches for employees where the 'role', 'phone', or 'email' field matches the 'slug'
        const myEmployee = await Employee.find({
            // The '$or' operator is used to search for documents where any of the conditions match
            $or: [
                { role: slug },
                { phone: slug },
                { email: slug }
            ]
        });

        res.status(200).json({
            message: 'Employee Data found successfully',
            employee: myEmployee, // Array of employee documents returned from the database
        });
    } catch (error) {
        console.error('Error finding Employee:', error);
        res.status(500).json({ message: 'Failed to find Employee' });
    }
});


app.post('/menu', async (req, res) => {

    // Body contains form data
    const data = req.body;

    try {
        // Create new newMenu document using mongoose model 
        const newMenu = new Menu(data);

        // Save to MongoDB
        await newMenu.save();

        // Respond with the saved Menu
        res.status(201).json({
            message: 'Menu Data saved successfully',
            menu: newMenu,
        });
    } catch (error) {
        console.error('Error saving Menu:', error);
        res.status(500).json({ message: 'Failed to save Menu' });
    }

});


app.get('/menu', async (req, res) => {

    try {
        // Fetch Menu from Database
        const myMenu = await Menu.find();

        // Respond with the find Menu
        res.status(200).json({
            message: 'Menu Data found successfully',
            menu: myMenu,
        });
    } catch (error) {
        console.error('Error finding Menu:', error);
        res.status(500).json({ message: 'Failed to find Menu' });
    }

});


// Define a GET route for fetching Menu data based on a dynamic slug parameter
app.get('/menu/:slug', async (req, res) => {

    // Extract the menuItem from URL parameter
    const slug = req.params.slug;

    // Define valid item types for validation
    const validTypes = ["Beverage", "Snack", "Meal", "Dessert"];

    try {
        if (validTypes.includes(slug)) {
            // This query searches for Menu where the 'itemType' field matches the 'slug'
            const myMenu = await Menu.find({ itemType: slug });
            res.status(200).json({
                message: 'Menu Data found successfully',
                menu: myMenu, // Array of Menu documents returned from the database
            });
        } else {
            res.status(400).json({
                message: 'Invalid Menu itemType',
            });
        }

    } catch (error) {
        console.error('Error finding Menu:', error);
        res.status(500).json({ message: 'Failed to find Menu' });
    }

});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

