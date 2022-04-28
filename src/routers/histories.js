const histories = require('express').Router();
const { verifyUser,verifyAdmin,verifyAll } = require('../helpers/auth');
const {
    //  getHistories,
    getHistoriesAsync,
    getHistoriesByUserIdAsync,
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
histories.get('/',verifyAdmin, getHistoriesAsync);
histories.get('/user/:id',verifyUser,getHistoriesByUserIdAsync);
// histories.get('/:id',verifyUser, getHistory);
histories.get('/:id', getHistoryAsync);
// histories.post('/', insertHistory);
histories.post('/', verifyUser, insertHistoryAsync);
// histories.put('/:id', updateHistory);
histories.put('/:id', verifyAll, updateHistoryAsync);
histories.patch('/:id', verifyAll, updatePatchHistoryAsync);
// histories.delete('/:id', verifyUser, deleteHistory);
histories.delete('/:id', verifyAll, deleteHistoryAsync);

module.exports = histories;