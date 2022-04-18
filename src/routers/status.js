const status = require('express').Router();
const { verifyAdmin } = require('../helpers/auth');

const { 
    // getAllStatus,
    getAllStatusAsync, 
    // getStatus,
    getStatusAsync, 
    // insertStatus,
    insertStatusAsync, 
    // updateStatus,
    updateStatusAsync, 
    // deleteStatus,
    deleteStatusAsync } = require('../controllers/status');
// status.get('/', getAllStatus);
status.get('/', getAllStatusAsync);
// status.get('/:id', getStatus);
status.get('/:id', getStatusAsync);
// status.post('/', verifyAdmin, insertStatus);
status.post('/', verifyAdmin, insertStatusAsync);
// status.put('/:id', verifyAdmin, updateStatus);
status.put('/:id', verifyAdmin, updateStatusAsync);
// status.delete('/:id', verifyAdmin, deleteStatus);
status.delete('/:id', verifyAdmin, deleteStatusAsync);

module.exports = status;