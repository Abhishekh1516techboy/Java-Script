import express from 'express'
import Employee from '../models/employee.js';
const router = express.Router();

// Employee Post Routes
router.post('/', async (req, res) => {

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

// Employee Get Routes
router.get('/', async (req, res) => {

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
router.get('/:slug', async (req, res) => {

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


// Update route for updating employee data in database by Id
router.put('/:id', async (req, res) => {

    const employeeId = req.params.id; // Extract the employee ID from URL parameters
    const updateEmployee = req.body; // Get the update data from the request body

    // Check if any update data was provided in the request
    if (Object.keys(updateEmployee).length === 0) {
        return res.status(400).json({ error: "No update data provided by User" });
    }

    try {
        // Update employee document in database using Mongoose
        const updatedEmployeeData = await Employee.findByIdAndUpdate(employeeId, updateEmployee, {
            new: true,      // Return the modified document rather than original
            runValidators: true // Ensure schema validations are applied
        });

        // Returns 404 if no document matches the provided ID
        if (!updatedEmployeeData) {
            return res.status(404).json({
                error: "Employee not found in DataBase"
            });
        }

        // Success response with status 200 and updated employee data
        res.status(200).json({
            message: 'Employee data updated successfully',
            employee: updatedEmployeeData, // Return the updated document
        });
    } catch (error) {
        // Catch any errors during database operation
        res.status(500).json({
            error: 'Failed to update employee',
        });
    }
});


// Delete route for permanently removing employee data from the database by ID
router.delete('/:id', async (req, res) => {

    const employeeId = req.params.id; // Captures the :id parameter from the route

    try {
        // Attempt to find and permanently delete the employee document from the database
        const deletedEmployeeData = await Employee.findByIdAndDelete(employeeId);


        // If no document is found with the given ID, return a 404 error
        if (!deletedEmployeeData) {
            return res.status(404).json({
                error: "Employee not found in DataBase" // Indicates the ID doesn't exist
            });
        }

        // Returns status 200 with a message and the deleted employee data
        res.status(200).json({
            message: 'Employee data deleted successfully', // Confirmation message
            employee: deletedEmployeeData, // Return the deleted document for reference
        });
    } catch (error) {
        // Handle any errors that occur during the database operation
        res.status(500).json({
            error: 'Failed to Delete employee', // Generic error message for client
        });
    }
});


export default router;