import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function listFiles () {
    try {
        let files = await fsp.readdir(__dirname);
        // Iterating over the file names directly
        for (const file of files) {
            let ext = path.extname(file).slice(1); // Get the file extension without the dot

            // Skip if it's a directory
            const filePath = path.join(__dirname, file);
            const stats = await fsp.stat(filePath);
            if (stats.isDirectory()) continue;

            // Skip if the file is .js or .json
            if (ext === 'js' || ext === 'json') {
                console.log(`Skipping file: ${file}`);
                continue;
            }

            // Construct the path for the directory based on the extension
            let extDir = path.join(__dirname, ext);

            // Check if a directory for this extension exists, if not, create it
            if (!fs.existsSync(extDir)) {
                fs.mkdirSync(extDir);
                console.log(`Directory created for extension: ${ext}`);
            } else {
                console.log(`Directory already exists for extension: ${ext}`);
            }

            // Move the file to the extension directory
            const newFilePath = path.join(extDir, file);
            await fsp.rename(filePath, newFilePath);
            console.log(`Moved file: ${file} to ${extDir}`);
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
}

// Calling the listFiles function
listFiles();
