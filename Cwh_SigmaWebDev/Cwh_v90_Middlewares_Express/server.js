import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import blog from './routes/blog.js';

const app = express();
const PORT = 3000;

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files like CSS, js, and images...
app.use(express.static(path.join(__dirname, 'public')));

// blog middleware...
app.use('/blog', blog)


// Middleware to store user data during website visits...
app.use(async (req, res, next) => {
  const now = new Date();
  const localTime = now.toLocaleTimeString();
  const localDateString = now.toLocaleDateString();

  // Append tracking information to the file using fs/promises
  try {
    await fs.appendFile('tracking.txt', `${localTime} ${localDateString}\n`);
  } catch (err) {
    console.error('Error writing to tracking file:', err);
  }

  next();
});


app.get('/', (req, res) => {
  res.send('This is Middleware home');
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.send('This is Middleware contact');
});


// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
