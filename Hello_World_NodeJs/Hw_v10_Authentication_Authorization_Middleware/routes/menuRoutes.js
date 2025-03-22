import express from 'express'
import Menu from '../models/Menu.js'
const router = express.Router();


router.post('/', async (req, res) => {

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


router.get('/', async (req, res) => {

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
router.get('/:slug', async (req, res) => {

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


// Update route for updating menu data in database by Id
router.put('/:id', async (req, res) => {

    const menuId = req.params.id; // Extract the menu ID from URL parameters
    const updateMenu = req.body; // Get the update data from the request body

    // Check if any update data was provided in the request
    if (Object.keys(updateMenu).length === 0) {
        return res.status(400).json({ error: "No update data provided by User" });
    }

    try {
        // Update menu document in database using Mongoose
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, updateMenu, {
            new: true,      // Return the modified document rather than original
            runValidators: true // Ensure schema validations are applied
        });

        // Returns 404 if no document matches the provided ID
        if (!updatedMenu) {
            return res.status(404).json({
                error: "Menu not found in DataBase"
            });
        }

        // Success response with status 200 and updated employee data
        res.status(200).json({
            message: 'Menu data updated successfully',
            employee: updatedMenu, // Return the updated document
        });
    } catch (error) {
        // Catch any errors during database operation
        res.status(500).json({
            error: 'Failed to update Menu',
        });
    }
});


// Delete route for permanently removing Menu data from the database by ID
router.delete('/:id', async (req, res) => {

    const menuId = req.params.id; // Captures the :id parameter from the route

    try {
        // Attempt to find and permanently delete the Menu document from the database
        const deletedMenu = await Menu.findByIdAndDelete(menuId);


        // If no document is found with the given ID, return a 404 error
        if (!deletedMenu) {
            return res.status(404).json({
                error: "Menu not found in DataBase" // Indicates the ID doesn't exist
            });
        }

        // Returns status 200 with a message and the deleted employee data
        res.status(200).json({
            message: 'Menu data deleted successfully', // Confirmation message
            employee: deletedMenu, // Return the deleted document for reference
        });
    } catch (error) {
        // Handle any errors that occur during the database operation
        res.status(500).json({
            error: 'Failed to Delete Menu', // Generic error message for client
        });
    }
});


export default router;
