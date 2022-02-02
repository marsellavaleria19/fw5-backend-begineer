const db = require('../helpers/database');

exports.getDataStatus = (cb) => {
    db.query('select id,name from status', (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataStatus = (id, cb) => {
    db.query('select id,name from status where id=?', [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataStatusByName = (name, id, cb) => {
    db.query('select * from status where name=?' + (id !== null ? 'and id!=?' : ''), [name, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.insertDataStatus = (name, cb) => {
    db.query('insert into status (name) values(?)', [name], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.updateDataStatus = (name, id, cb) => {
    db.query('update status set name=? where id=?', [name, id], (err, res) => {
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