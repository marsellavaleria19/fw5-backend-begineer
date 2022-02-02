const db = require('../helpers/database');

exports.getAllDataStatus = (cb) => {
    db.query('select id,status from status', (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataStatus = (id, cb) => {
    db.query('select id,status from status where id=?', [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

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