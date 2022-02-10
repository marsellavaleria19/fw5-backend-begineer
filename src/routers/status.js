const status = require('express').Router();
const { verifyUser } = require('../helpers/auth');

const { getAllStatus, getStatus, insertStatus, updateStatus, deleteStatus } = require('../controllers/status');
status.get('/', getAllStatus);
status.get('/:id', getStatus);
status.post('/', verifyUser, insertStatus);
status.put('/:id', verifyUser, updateStatus);
status.delete('/:id', verifyUser, deleteStatus);

module.exports = status;