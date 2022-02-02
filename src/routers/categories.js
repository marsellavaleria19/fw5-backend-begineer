const categories = require('express').Router();

const { getCategories, getCategory, insertCategory, updateCategory, deleteCategory } = require('../controllers/categories');
categories.get('/', getCategories);
categories.get('/:id', getCategory);
categories.post('/', insertCategory);
categories.put('/:id', updateCategory);
categories.delete('/:id', deleteCategory);

module.exports = categories;