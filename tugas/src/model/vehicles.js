const db = require('../helpers/database');

exports.getDataVehicles = (cb) => {
    db.query('select * from vehicles', function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.getDataVehicle = (id, cb) => {
    db.query('SELECT * FROM vehicles WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.insertDataVehicle = (data, cb) => {
    const { brand, type, rentPrice, qty } = data;
    db.query(`insert into vehicles (brand,type,rent_price,qty) 
    values(?,?,?,?)`, [brand, type, rentPrice, qty], (error, results) => {
        if (error) throw error;
        cb(results);
    });
};

exports.updateDataVehicle = (id, data, cb) => {
    const { brand, type, rentPrice, qty } = data;
    db.query(`update vehicles set 
    brand = ?,type = ?,rent_price =?,qty = ? 
    where id = ?`, [brand, type, rentPrice, qty, id], (error, results) => {
        if (error) throw error;
        cb(results);
    });
};

exports.deleteDataVehicle = (id, cb) => {
    db.query('delete from vehicles where id =?', [id], (error, results) => {
        if (error) throw error;
        cb(results);
    });
};