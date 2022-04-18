const categories = require('express').Router();
const { verifyAdmin } = require('../helpers/auth');

const { getCategoriesAsync, getCategoryAsync, insertCategoryAsync, updateCategoryAsync, deleteCategoryAsync } = require('../controllers/categories');
// categories.get('/', getCategories);
categories.get('/',getCategoriesAsync);
// categories.get('/:id', getCategory);
categories.get('/:id',getCategoryAsync);
// categories.post('/', verifyUser, insertCategory);
categories.post('/', verifyAdmin, insertCategoryAsync);
// categories.put('/:id', verifyUser, updateCategory);
categories.put('/:id', verifyAdmin, updateCategoryAsync);
// categories.delete('/:id', verifyUser, deleteCategory);
categories.delete('/:id', verifyAdmin, deleteCategoryAsync);

module.exports = categories;