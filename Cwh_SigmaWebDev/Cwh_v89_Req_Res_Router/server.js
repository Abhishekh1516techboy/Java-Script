import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import blog from './routes/blog.js';
import phones from './routes/phones.js';

const app = express();
const PORT = 3000;

// import routes...
app.use('/blog', blog);
app.use('/phones', phones);

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files like CSS, js, and images...
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for / route
app.get('/', (req, res) => {
    console.log("This is a /home GET request.");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve about.html for /about route
app.get('/about', (req, res) => {
    console.log("This is a /about GET request.");
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Start the server on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
