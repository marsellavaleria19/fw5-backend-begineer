const histories = require('express').Router();

const { getHistories, getHistory, insertHistory, updateHistory, updatePatchHistory, deleteHistory } = require('../controllers/histories');
histories.get('/', getHistories);
histories.get('/:id', getHistory);
histories.post('/', insertHistory);
histories.put('/:id', updateHistory);
histories.patch('/:id', updatePatchHistory);
histories.delete('/:id', deleteHistory);

module.exports = histories;