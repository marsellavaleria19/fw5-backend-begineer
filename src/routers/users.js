const users = require('express').Router();
const {verifyAll,verifyAdmin} = require('../helpers/auth');

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
users.post('/',verifyAdmin, insertUserAsync);
// users.put('/:id', updateUser);
users.put('/:id',verifyAll, updateUserAsync);
// users.patch('/:id', updatePatchUser);
users.patch('/:id',verifyAll, updatePatchUserAsync);
// users.delete('/:id', deleteUser);
users.delete('/:id',verifyAdmin, deleteUserAsync);
module.exports = users;