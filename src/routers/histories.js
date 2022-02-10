const histories = require('express').Router();

const {
    getHistories,
    getHistory,
    // insertHistory,
    insertHistoryAsync,
    // updateHistory,
    updateHistoryAsync,
    updatePatchHistory,
    deleteHistory
} = require('../controllers/histories');
histories.get('/', getHistories);
histories.get('/:id', getHistory);
// histories.post('/', insertHistory);
histories.post('/', insertHistoryAsync);
// histories.put('/:id', updateHistory);
histories.put('/:id', updateHistoryAsync);
histories.patch('/:id', updatePatchHistory);
histories.delete('/:id', deleteHistory);

module.exports = histories;