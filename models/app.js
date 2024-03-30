// // app.js

// const express = require('express');
// const connectDB = require('./db');
// const app = express();
// const PORT = process.env.PORT || 3001;

// // Connect to MongoDB
// connectDB()
//   .then(client => {
//     // Define routes after database connection is established
//     const indexRouter = require('./routes/index');
//     app.use('/', indexRouter);
//   })
//   .catch(error => {
//     console.error('Error initializing app:', error);
//   });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
