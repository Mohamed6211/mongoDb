require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');
    // Store the MongoDB client in app.locals
    app.locals.dbClient = client;
});

// Other setup code and middleware

// Define routes
const indexRouter = require('../routes/index');
app.use('/', indexRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
