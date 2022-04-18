const paymentTypes = require('express').Router();
const { verifyAdmin } = require('../helpers/auth');

const {getPaymentTypes,getPaymentType,insertPaymentType,updatePaymentType,deletePaymentType} = require('../controllers/paymentTypes');
paymentTypes.get('/', getPaymentTypes);
paymentTypes.get('/:id', getPaymentType);
paymentTypes.post('/', verifyAdmin, insertPaymentType);
paymentTypes.put('/:id', verifyAdmin, updatePaymentType);
paymentTypes.delete('/:id', verifyAdmin, deletePaymentType);

module.exports = paymentTypes;