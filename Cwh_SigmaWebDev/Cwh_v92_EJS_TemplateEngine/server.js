import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// set ejs Template Engine...
app.set('view engine', 'ejs');

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware 
app.use((req, res, next) => {
    console.log(`${req.method}`);
    next();
});

// Serve static files like CSS, images
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    let siteName = 'Technology Fire';
    res.render('index', { siteName });
});

app.get('/blog/:slug', (req, res) => {
    let blogTitle = `${req.params.slug}`;
    let blogInfo = `${req.params.slug} is a multy national companty`;
    res.render(`blog`, { blogTitle, blogInfo });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
