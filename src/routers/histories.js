const histories = require('express').Router();
const { verifyUser,verifyAdmin } = require('../helpers/auth');
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
histories.get('/', getHistoriesAsync);
// histories.get('/:id',verifyUser, getHistory);
histories.get('/:id', getHistoryAsync);
// histories.post('/', insertHistory);
histories.post('/', verifyUser, insertHistoryAsync);
// histories.put('/:id', updateHistory);
histories.put('/:id', verifyAdmin, updateHistoryAsync);
histories.patch('/:id', verifyAdmin, updatePatchHistoryAsync);
// histories.delete('/:id', verifyUser, deleteHistory);
histories.delete('/:id', verifyAdmin, deleteHistoryAsync);

module.exports = histories;