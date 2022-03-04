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