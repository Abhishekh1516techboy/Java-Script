import express from 'express';
const router = express.Router();

// define the home page router
router.get('/', (req, res) => {
    res.send('This is blog Home Page with express router');
});

//define the about router
router.get('/about', (req, res) => {
    res.send('This is blog about Page  with express router');
});
//define the blog router
router.get('/blogpost/:slug', (req, res) => {
    res.send(`fetch the blog for  ${req.params.slug}`);
});

export default router;
