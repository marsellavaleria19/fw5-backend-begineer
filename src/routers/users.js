const users = require('express').Router();

const {
    //  getUsers,
    getUsersAsync,
    //  getUser,
    getUserAsync,
    // insertUser,
    insertUserAsync,
    // updateUser,
    updateUserAsync,
    // updatePatchUser,
    updatePatchUserAsync,
    // deleteUser
    deleteUserAsync,
} = require('../controllers/users');

// users.get('/', getUsers);
users.get('/', getUsersAsync);
// users.get('/:id', getUser);
users.get('/:id', getUserAsync);
// users.post('/', insertUser);
users.post('/', insertUserAsync);
// users.put('/:id', updateUser);
users.put('/:id',updateUserAsync);
// users.patch('/:id', updatePatchUser);
users.patch('/:id',updatePatchUserAsync);
// users.delete('/:id', deleteUser);
users.delete('/:id',deleteUserAsync);
module.exports = users;