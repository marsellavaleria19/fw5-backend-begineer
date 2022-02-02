const db = require('../helpers/database');

exports.getDataVehicles = (search = '', cb) => {
    db.query(`select v.id,v.name,c.name category,v.photo,v.location,v.price,v.qty,v.isAvailable from vehicles v 
    join categories c on v.category_id = c.id 
      where v.name like '%${search}%' or c.name like '%${search}%'`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.getDataVehicle = (id, cb) => {
    db.query('select v.id,v.name,c.name category,v.photo,v.location,v.price,v.qty,v.isAvailable from vehicles v join categories c on v.category_id = c.id WHERE v.id=?', [id], (err, res) => {
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
    const { name, category_id, photo, location, price, qty, isAvailable } = data;
    db.query(`insert into vehicles (name,category_id,photo,location,price,qty,isAvailable) 
    values(?,?,?,?,?,?,?)`, [name, category_id, photo, location, price, qty, isAvailable], (error, results) => {
        if (error) throw error;
        cb(results);
    });
};

exports.updateDataVehicle = (id, data, cb) => {
    const { name, category_id, photo, location, price, qty, isAvailable } = data;
    db.query(`update vehicles set 
      name=?,category_id=?,photo=?,location=?,price=?,qty=?,isAvailable=?
    where id = ?`, [name, category_id, photo, location, price, qty, isAvailable, id], (error, results) => {
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