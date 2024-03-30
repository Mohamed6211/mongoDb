
require('dotenv').config();

const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://melmzouri:sinuscardi171546@mydatabase.pa7lxse.mongodb.net/?retryWrites=true&w=majority&appName=myDataBase&ssl=true&authSource=admin";

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://melmzouri:sinuscardi171546@mydatabase.pa7lxse.mongodb.net/?retryWrites=true&w=majority&appName=myDataBase&ssl=true&authSource=admin";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
// serverApi: {
//   version: ServerApiVersion.v1,
//   strict: true,
//   deprecationErrors: true,
// }
// });

// // async function run() {
// // try {
// //   // Connect the client to the server	(optional starting in v4.7)
// //   await client.connect();
// //   // Send a ping to confirm a successful connection
// //   await client.db("admin").command({ ping: 1 });
// //   console.log("Pinged your deployment. You successfully connected to MongoDB!");
// // } finally {
// //   // Ensures that the client will close when you finish/error
// //   await client.close();
// // }
// // }
// // run().catch(console.dir);


// async function connect() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }

// // Function to close the MongoDB connection
// async function close() {
//     try {
//         await client.close();
//         console.log('Disconnected from MongoDB');
//     } catch (error) {
//         console.error('Error disconnecting from MongoDB:', error);
//     }
// }

// // Function to insert a document into a collection
// async function insertDocument(dbName, collectionName, document) {
//     try {
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//         const result = await collection.insertOne(document);
//         console.log('Document inserted:', result.insertedId);
//         return result.insertedId;
//     } catch (error) {
//         console.error('Error inserting document:', error);
//     }
// }

// // Function to find documents in a collection
// async function findDocuments(dbName, collectionName, query) {
//     try {
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//         const cursor = await collection.find(query);
//         const documents = await cursor.toArray();
//         console.log('Found documents:', documents);
//         return documents;
//     } catch (error) {
//         console.error('Error finding documents:', error);
//     }
// }

// // Function to update a document in a collection
// async function updateDocument(dbName, collectionName, query, update) {
//     try {
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//         const result = await collection.updateOne(query, { $set: update });
//         console.log('Document updated:', result.modifiedCount);
//         return result.modifiedCount;
//     } catch (error) {
//         console.error('Error updating document:', error);
//     }
// }

// // Function to delete a document from a collection
// async function deleteDocument(dbName, collectionName, query) {
//     try {
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//         const result = await collection.deleteOne(query);
//         console.log('Document deleted:', result.deletedCount);
//         return result.deletedCount;
//     } catch (error) {
//         console.error('Error deleting document:', error);
//     }
// }

// module.exports = {
//     connect,
//     close,
//     insertDocument,
//     findDocuments,
//     updateDocument,
//     deleteDocument
// };

// db.js

