const express = require('express');
const connectDB = require('./db');
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB()
  .then(client => {
    // Define routes after database connection is established
    const indexRouter = require('../routes/index');
    app.use('/', indexRouter);
  })
  .catch(error => {
    console.error('Error initializing app:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// const { MongoClient } = require('mongodb');
// console.log('Before dotenv config');
// require('dotenv').config();
// console.log('After dotenv config');


// console.log('MongoDB Node.js driver version:', MongoClient.version);
// console.log(process.env.MONGODB_URI);
// console.log(process.env.MONGODB_URI); // Check if the MongoDB URI is printed in the console

// // MongoDB connection string
// const uri = process.env.MONGODB_URI;

// // Create a new MongoClient
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Connect to the MongoDB database
// async function connectToDatabase() {
//     try {
//         await client.connect();
//         console.log('Connected to the MongoDB database');
//     } catch (error) {
//         console.error('Error connecting to the MongoDB database:', error);
//     }
// }

// // Call the connectToDatabase function to establish the connection
// connectToDatabase();


// const express = require('express');

// const bodyParser = require('body-parser');
// const dbRoutes = require('../routes/dbRoutes'); 
// // Create an Express application
// const app = express();

// app.use(bodyParser.json());

// // Mount routes
// app.use('/api', dbRoutes); // Mount the routes from dbRoutes under the '/api' path
// // Define a route
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });
// // Start the server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });





// const crud = require('./crud');

// app.post('/insert', async (req, res) => {
//     // Call the insertDocument function from crud.js
//     const result = await crud.insertDocument(req.body);
//     res.json(result);
// });

// // Route to find documents
// app.get('/find', async (req, res) => {
//     // Call the findDocuments function from crud.js
//     const documents = await crud.findDocuments();
//     res.json(documents);
// });

// // Route to update a document
// app.put('/update/:id', async (req, res) => {
//     // Call the updateDocument function from crud.js
//     const result = await crud.updateDocument(req.params.id, req.body);
//     res.json(result);
// });

// // Route to delete a document
// app.delete('/delete/:id', async (req, res) => {
//     // Call the deleteDocument function from crud.js
//     const result = await crud.deleteDocument(req.params.id);
//     res.json(result);
// });

// // Start the server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
