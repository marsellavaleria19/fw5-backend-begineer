const histories = require('express').Router();
const { verifyUser } = require('../helpers/auth');
const {
    //  getHistories,
    getHistoriesAsync,
    //  getHistory,
    getHistoryAsync,
    // insertHistory,
    insertHistoryAsync,
    // updateHistory,
    updateHistoryAsync,
    // updatePatchHistory,
    updatePatchHistoryAsync,
    //  deleteHistory
    deleteHistoryAsync
} = require('../controllers/histories');
// histories.get('/', verifyUser, getHistories);
histories.get('/', verifyUser, getHistoriesAsync);
// histories.get('/:id',verifyUser, getHistory);
histories.get('/:id', verifyUser, getHistoryAsync);
// histories.post('/', insertHistory);
histories.post('/', verifyUser, insertHistoryAsync);
// histories.put('/:id', updateHistory);
histories.put('/:id', verifyUser, updateHistoryAsync);
histories.patch('/:id', verifyUser, updatePatchHistoryAsync);
// histories.delete('/:id', verifyUser, deleteHistory);
histories.delete('/:id', verifyUser, deleteHistoryAsync);

module.exports = histories;