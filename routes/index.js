const express = require('express');
const router = express.Router();
const path = require('path');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../models/crud');

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


// Create a new user
router.post('/api/users', async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
});

// Retrieve all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
  }
});

// Retrieve a specific user by ID
router.get('/api/users/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
  }
});

// Update a user by ID
router.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
});

// Delete a user by ID
router.delete('/api/users/:id', async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});


module.exports = router;
