import express from 'express'
const app = express();
const PORT = 3000;

//routes app.get , app.post, app.put or app.delete
app.get('/', (req, res) => {
    res.send('<h1>Express Server start<h1/>');
});

app.get('/about', (req, res) => {
    res.send('<h1>about page<h1/>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>contact page<h1/>');
});

app.get('/carear', (req, res) => {
    res.send('<h1>carear page<h1/>');
});

// dynamic routing...
app.get('/blog/:slug', (req, res) => {
    res.send(`<h1>${req.params.slug}<h1/>`);
});

app.listen(PORT, (params) => {
    console.log(`Server start on PORT http://localhost:${PORT}`)
});