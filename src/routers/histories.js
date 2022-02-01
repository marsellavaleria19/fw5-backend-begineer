const histories = require('express').Router();

const { getHistories, getHistory, insertHistory, updateHistory, deleteHistory } = require('../controllers/histories');
histories.get('/', getHistories);
histories.get('/:id', getHistory);
histories.post('/', insertHistory);
histories.put('/:id', updateHistory);
histories.delete('/:id', deleteHistory);

module.exports = histories;