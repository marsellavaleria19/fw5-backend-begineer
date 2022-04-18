const db = require('../helpers/database');

exports.getDataPaymentTypes = (data) => new Promise((resolve,reject)=>{
    db.query(`select id,payment from payment_types
 where payment like '%${data.search!==null ? '' : data.seach}%'
 ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''} 
 LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset} `, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.countDataPaymentTypes = (data) => new Promise((resolve,reject)=>{
    db.query(`select count(*) as total from payment_types 
where payment like '%${data.search}%'`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.getDataPaymentType = (id) => new Promise((resolve,reject)=>{
    db.query('select id,payment from payment_types where id=?', [id], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.getDataPaymentTypeByPaymentType = (payment, id) => new Promise((resolve,reject)=>{
    const query = db.query('select * from payment_types where payment=?' + (id !== null ? 'and id!=?' : ''), [payment, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
    console.log(query.sql);
});

exports.insertDataPaymentType = (payment) => new Promise((resolve,reject) =>{
    db.query('insert into payment_types (payment) values(?)', [payment], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.updateDataPaymentType = (id,payment) => new Promise((resolve,reject) => {
    db.query('update payment_types set payment=? where id=?', [payment, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.deleteDataPaymentTypes = (id) => new Promise((resolve,reject)=>{
    db.query('delete from payment_types where id=?', [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});