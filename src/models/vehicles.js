const db = require('../helpers/database');

exports.getDataVehicles = (cb) => {
    db.query('select id,name,category,photo,location,price,qty,isAvailable from vehicles', function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.getDataVehicle = (id, cb) => {
    db.query('SELECT id,name,category,photo,location,price,qty,isAvailable FROM vehicles WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getDataVehicleName = (name, id, cb) => {
    const query = db.query('select * from vehicles where name=?' + (id !== null ? 'and id!=?' : ''), [name, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
    console.log(query.sql);
};

exports.insertDataVehicle = (data, cb) => {
    const { name, category, photo, location, price, qty, isAvailable } = data;
    db.query(`insert into vehicles (name,category,photo,location,price,qty,isAvailable) 
    values(?,?,?,?,?,?,?)`, [name, category, photo, location, price, qty, isAvailable], (error, results) => {
        if (error) throw error;
        cb(results);
    });
};

exports.updateDataVehicle = (id, data, cb) => {
    const { name, category, photo, location, price, qty, isAvailable } = data;
    db.query(`update vehicles set 
      name=?,category=?,photo=?,location=?,price=?,qty=?,isAvailable=?
    where id = ?`, [name, category, photo, location, price, qty, isAvailable, id], (error, results) => {
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