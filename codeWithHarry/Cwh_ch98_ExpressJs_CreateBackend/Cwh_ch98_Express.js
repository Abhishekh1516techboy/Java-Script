const express = require('express')
const path = require('path')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','./index.html'));
    // res.send("Home Page")
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'public' ,'./about.html'));
    // res.send('About Section!')
})

app.get('/contact', (req, res) => {
    res.send('Contact section!')
})

app.get('/blog', (req, res) => {
    res.send('Blog\'s section!')
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})