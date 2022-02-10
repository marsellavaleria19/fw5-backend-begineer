const categories = require('express').Router();
const { verifyUser } = require('../helpers/auth');

const { getCategories, getCategory, insertCategory, updateCategory, deleteCategory } = require('../controllers/categories');
categories.get('/', getCategories);
categories.get('/:id', getCategory);
categories.post('/', verifyUser, insertCategory);
categories.put('/:id', verifyUser, updateCategory);
categories.delete('/:id', verifyUser, deleteCategory);

module.exports = categories;