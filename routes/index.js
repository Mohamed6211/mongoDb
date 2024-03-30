const express = require('express');
const router = express.Router();
const path = require('path');

// router.get('/', async (req, res) => {
//   try {
//     console.log("début")
//     const client = req.app.locals.dbClient;
//     // console.log(client)
//     const collection = client.db('myDataBase').collection('users');
//     const data = await collection.find().toArray();
//     res.render('index', { data });
//     res.sendFile(path.join(__dirname, 'index.html'));
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   }
// });
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});
router.get('/api/data', async (req, res) => {
    try {
        const client2 = req.app.locals.dbClient;
    // console.log(client)
    const collection2 = client2.db('myDataBase').collection('users');
    const data2 = await collection2.find().toArray();
        res.json(data2);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

module.exports = router;
