const db = require('../helpers/database');

exports.getDataVehicles = (data, cb) => {
    db.query(`select v.id,v.name,v.category_id,c.name category,v.photo,v.location,v.price,v.qty,v.isAvailable from vehicles v 
    join categories c on v.category_id = c.id 
      where v.name like '%${data.search}%' or c.name like '%${data.search}%' 
      order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.getDataVehiclesByCategory = (data, id, cb) => {
    db.query(`select v.id,v.name,c.name category from vehicles v 
  join categories c on v.category_id = c.id 
    where v.category_id = ? 
    order by v.createdAt desc LIMIT ${data.limit} OFFSET ${data.offset}`, [id], function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.countDataVehicles = (data, cb) => {
    db.query(`select count(*) as total from vehicles v 
  join categories c on v.category_id = c.id 
    where v.name like '%${data.search}%' or c.name like '%${data.search}%'`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.countDataVehiclesByCategory = (id, cb) => {
    db.query(`select count(*) from vehicles v 
join categories c on v.category_id = c.id 
  where v.category_id = ?`, [id], function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.getDataVehicle = (id, cb) => {
    db.query('select v.id,v.name,v.category_id,c.name category,v.photo,v.location,v.price,v.qty,v.isAvailable from vehicles v join categories c on v.category_id = c.id WHERE v.id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getDataVehicleAsync = (id) => new Promise((resolve, reject) => {
    db.query('select v.id,v.name,v.category_id,c.name category,v.photo,v.location,v.price,v.qty,v.isAvailable from vehicles v join categories c on v.category_id = c.id WHERE v.id=?', [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.getDataVehicleName = (name, id, cb) => {
    db.query('select * from vehicles where name=?' + (id !== null ? 'and id!=?' : ''), [name, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getDataVehicleNameAsync = (name, id) => new Promise((resolve, reject) => {
    db.query('select * from vehicles where name=?' + (id !== null ? 'and id!=?' : ''), [name, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.insertDataVehicle = (data, cb) => {
    db.query('insert into vehicles set ?', [data], (error, results) => {
        if (error) throw error;
        cb(results);
    });
};

exports.updateDataVehicle = (id, data, cb) => {
    db.query('update vehicles set ? where id = ?', [data, id], (error, results) => {
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