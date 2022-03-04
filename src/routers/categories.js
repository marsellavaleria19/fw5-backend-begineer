const categories = require('express').Router();
const { verifyUser } = require('../helpers/auth');
const cors = require('cors');

const { getCategories, getCategory, insertCategory, updateCategory, deleteCategory } = require('../controllers/categories');
categories.get('/', cors(), getCategories);
categories.get('/:id', cors(), getCategory);
categories.post('/', verifyUser, insertCategory);
categories.put('/:id', verifyUser, updateCategory);
categories.delete('/:id', verifyUser, deleteCategory);

module.exports = categories;