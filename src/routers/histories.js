const histories = require('express').Router();
const { verifyUser } = require('../helpers/auth');
const {
    getHistories,
    getHistory,
    // insertHistory,
    insertHistoryAsync,
    // updateHistory,
    updateHistoryAsync,
    // updatePatchHistory,
    updatePatchHistoryAsync,
    deleteHistory
} = require('../controllers/histories');
histories.get('/', verifyUser, getHistories);
histories.get('/:id', getHistory);
// histories.post('/', insertHistory);
histories.post('/', verifyUser, insertHistoryAsync);
// histories.put('/:id', updateHistory);
histories.put('/:id', verifyUser, updateHistoryAsync);
histories.patch('/:id', verifyUser, updatePatchHistoryAsync);
histories.delete('/:id', verifyUser, deleteHistory);

module.exports = histories;