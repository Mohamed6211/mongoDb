const { connect, close, insertDocument, findDocuments, updateDocument, deleteDocument } = require('./db');
// Example usage
async function main() {
    await connect();

    // Insert a document
    const insertedId = await insertDocument('myDataBase', 'users', { nom: 'John Doe', password: 30 });

    // Find documents
    const documents = await findDocuments('myDataBase', 'users', { password: { $gte: 25 } });

    // Update a document
    const updatedCount = await updateDocument('myDataBase', 'users', { nom: 'John Doe' }, { password: 31 });

    // Delete a document
    // const deletedCount = await deleteDocument('myDataBase', 'users', { nom: 'John Doe' });

    await close();
}

main().catch(console.error);
