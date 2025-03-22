import express from 'express';
const router = express.Router();

// define the home page router
router.get('/', (req, res) => {
    res.send('This is Phones Home Page');
});

//define the phones router
router.get('/:slug', (req, res) => {
    res.send(`fetch the Phones for  ${req.params.slug}`);
});

export default router;
