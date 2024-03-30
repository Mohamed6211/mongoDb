const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const client = req.app.locals.dbClient; // Access dbClient from app locals
        if (!client) {
            throw new Error('Database client is not available');
          }
        const collection = client.db('myDatabase').collection('users');
        const data = await collection.find().toArray();
        res.render('index', { data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;

    

  
