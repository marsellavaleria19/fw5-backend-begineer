const status = require('express').Router();

const { getAllStatus, getStatus, insertStatus, updateStatus, deleteStatus } = require('../controllers/status');
status.get('/', getAllStatus);
status.get('/:id', getStatus);
status.post('/', insertStatus);
status.put('/:id', updateStatus);
status.delete('/:id', deleteStatus);

module.exports = status;