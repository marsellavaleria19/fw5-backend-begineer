const users = require('express').Router()
const { getUsers, getUser, insertUser, updateUser, deleteUser } = require('../controllers/users')

users.get('/', getUsers)
users.get('/:id', getUser)
users.post('/add', insertUser)
users.put('/update/:id', updateUser)
users.delete('/delete/:id', deleteUser)

module.exports = users