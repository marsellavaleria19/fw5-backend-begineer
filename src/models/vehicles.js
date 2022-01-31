const db = require('../helpers/database');

exports.getDataVehicles = (cb) => {
    db.query('select name,category,photo,location,price,qty,isAvaiable from vehicles', function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.getDataVehicle = (id, cb) => {
    db.query('SELECT name,category,photo,location,price,qty,isAvailable FROM vehicles WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getDataVehicleName = (name, cb) => {
    db.query('select * from vehicles where name=?', [name], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.insertDataVehicle = (data, cb) => {
    const { name, category, photo, location, price, stock, isAvailable } = data;
    db.query(`insert into vehicles (name,category,photo,location,price,qty,isAvailable) 
    values(?,?,?,?,?,?,?)`, [name, category, photo, location, price, stock, isAvailable], (error, results) => {
        if (error) throw error;
        cb(results);
    });
};

exports.updateDataVehicle = (id, data, cb) => {
    const { name, category, photo, location, price, stock, status } = data;
    db.query(`update vehicles set 
      name=?,category=?,photo=?,location=?,price=?,qty=?,isAvailable=?
    where id = ?`, [name, category, photo, location, price, stock, status], (error, results) => {
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