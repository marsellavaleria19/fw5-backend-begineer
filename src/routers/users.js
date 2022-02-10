const users = require('express').Router();

const {
    getUsers,
    getUser,
    // insertUser,
    insertUserAsync,
    updateUser,
    updatePatchUser,
    deleteUser
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
// users.post('/', insertUser);
users.post('/', insertUserAsync);
users.put('/:id', updateUser);
users.patch('/:id', updatePatchUser);
users.delete('/:id', deleteUser);
module.exports = users;