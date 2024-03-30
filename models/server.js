require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

// MongoDB connection URI
const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    console.log(client)
    app.locals.dbClient = client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};
connectDB();
// Other setup code and middleware

// Define routes
const indexRouter = require('../routes/index');
app.use('/', indexRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
