// Example usage
// async function main() {
//     await connect();

//     // Insert a document
//     const insertedId = await insertDocument('myDataBase', 'users', { nom: 'John Doe', password: 30 });

//     // Find documents
//     const documents = await findDocuments('myDataBase', 'users', { password: { $gte: 25 } });

//     // Update a document
//     const updatedCount = await updateDocument('myDataBase', 'users', { nom: 'John Doe' }, { password: 31 });

//     // Delete a document
//     // const deletedCount = await deleteDocument('myDataBase', 'users', { nom: 'John Doe' });

//     await close();
// }

// main().catch(console.error);

const { connect, getDb } = require('./db');

async function connectToDatabase() {
    await connect();
}

async function getUsers() {
    const db = getDb();
    const users = await db.collection('users').find().toArray();
    return users;
}

async function getUserById(id) {
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: id });
    return user;
}

async function createUser(userData) {
    const db = getDb();
    const result = await db.collection('users').insertOne(userData);
    return result.ops[0];
}

async function updateUser(id, userData) {
    const db = getDb();
    const result = await db.collection('users').updateOne({ _id: id }, { $set: userData });
    return result.modifiedCount > 0 ? userData : null;
}

async function deleteUser(id) {
    const db = getDb();
    const result = await db.collection('users').deleteOne({ _id: id });
    return result.deletedCount > 0;
}

module.exports = {
    connectToDatabase,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
