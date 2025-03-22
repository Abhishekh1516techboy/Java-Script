'use server';
import fsp from 'fs/promises';

export const submitAction = async (formData) => {
    try {
        // Ensure formData is a FormData instance
        const name = formData.get("name");
        const address = formData.get("add");

        // Log for debugging purposes in Backend Terminal...
        console.log(`Name: ${name}, Address: ${address}`);

        if (!name || !address) {
            throw new Error("Missing required fields: name or address.");
        }

        // Append data to the file OR Database...
        const filePath = "./harry.txt"; // Ensure this path is valid and writable
        await fsp.appendFile(filePath, `Name: ${name}, Address: ${address}\n`);
        console.log("Data saved successfully to harry.txt");
    } catch (error) {
        console.error("Error in submitAction:", error.message);
        throw error; // Re-throw the error if needed for further handling
    }
};
