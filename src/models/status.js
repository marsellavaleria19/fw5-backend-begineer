const db = require('../helpers/database');

exports.getAllDataStatus = (data, cb) => {
    db.query(`select id,status from status
    where status like '%${data.search}%'
    order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.countDataStatus = (data, cb) => {
    db.query(`select count(*) as total from status 
where status like '%${data.search}%'`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.getAllDataStatusAsync = (data) => new Promise((resolve,reject)=>{
    const query = db.query(`select id,status from status
 where status like '%${data.search!==null ? data.search:''}%'
 ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''} 
 LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset} `, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
    console.log(query.sql);
});

exports.countDataStatusAsync = (data) => new Promise((resolve,reject)=>{
    db.query(`select count(*) as total from status 
where status like '%${data.search}%'`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.getDataStatus = (id, cb) => {
    db.query('select id,status from status where id=?', [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataStatusAsync = (id) => new Promise((resolve, reject) => {
    db.query('select id,status from status where id=?', [id], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});


exports.getDataStatusByStatus = (status, id, cb) => {
    db.query('select * from status where status=?' + (id !== null ? 'and id!=?' : ''), [status, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getDataStatusByStatusAsync = (status, id) => new Promise((resolve,reject)=>{
    db.query('select * from status where status=?' + (id !== null ? 'and id!=?' : ''), [status, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.insertDataStatus = (status, cb) => {
    db.query('insert into status (status) values(?)', [status], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.updateDataStatus = (id, status, cb) => {
    db.query('update status set status=? where id=?', [status, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.deleteDataStatus = (id, cb) => {
    db.query('delete from status where id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};


exports.insertDataStatusAsync = (status) => new Promise((resolve,reject) =>{
    db.query('insert into status (status) values(?)', [status], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.updateDataStatusAsync = (id, status) => new Promise((resolve,reject) => {
    db.query('update status set status=? where id=?', [status, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.deleteDataStatusAsync = (id) => new Promise((resolve,reject)=>{
    db.query('delete from status where id=?', [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});