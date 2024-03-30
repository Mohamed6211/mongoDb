require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// MongoDB connection URI
const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    // console.log(client)
    app.locals.dbClient = client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};
connectDB();
// Other setup code and middleware

// Define routes
// const indexRouter = require('../routes/index');
// app.use('/', indexRouter);
app.get('/api/data', async (req, res) => {
    try {
        const client2 = req.app.locals.dbClient;
        const collection = client2.db('myDatabase').collection('users');
        const data = await collection.find().toArray();
        res.json(data); // Send the retrieved data as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
