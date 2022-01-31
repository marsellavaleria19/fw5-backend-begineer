const users = require('express').Router();

const { getUsers, getUser, insertUser, updateUser, deleteUser } = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', insertUser);
users.put('/:id', updateUser);
users.delete('/:id', deleteUser);
module.exports = users;