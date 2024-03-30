const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log("début")
    const client = req.app.locals.dbClient;
    console.log(client)
    const collection = client.db('myDataBase').collection('users');
    const data = await collection.find().toArray();
    res.render('index', { data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;
