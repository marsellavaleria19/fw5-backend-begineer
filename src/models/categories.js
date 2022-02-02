const db = require('../helpers/database');

exports.getDataCategories = (cb) => {
    db.query('select id,name from categories', (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataCategory = (id, cb) => {
    db.query('select id,name from categories where id=?', [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataCategoriesByName = (name, id, cb) => {
    db.query('select * from categories where name=?' + (id !== null ? 'and id!=?' : ''), [name, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.insertDataCategory = (name, cb) => {
    db.query('insert into categories (name) values(?)', [name], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.updateDataCategory = (id, name, cb) => {
    db.query('update categories set name=? where id=?', [name, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.deleteDataCategory = (id, cb) => {
    db.query('delete from categories where id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};