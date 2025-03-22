import express from 'express';
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    const now = new Date();
    const localTime = now.toLocaleTimeString();
    const localDateString = now.toLocaleDateString();
    console.log(`${localTime} ${localDateString}`)
    next()
})

// define the home page route
router.get('/', (req, res) => {
    res.send('Birds home Page')
})

// define the about route
router.get('/about', (req, res) => {
    res.send('About birds')
})

export default router;


