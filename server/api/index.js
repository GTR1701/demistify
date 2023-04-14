import express from 'express';

const router = express.Router();

export default router.post('/', (req, res) => {
    console.log(req.body);
    res.json('Hello World!');
});