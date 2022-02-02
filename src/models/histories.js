const db = require('../helpers/database');

exports.getDataHistories = (search = '', cb) => {
    db.query(`select h.id,u.fullName,v.name as brand,c.name as category,h.rentStartDate,h.rentEndDate,h.prepayment,s.status 
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id 
    join categories c on v.category_id = c.id 
    join status s on h.status = s.id 
    where u.fullName like '%${search}%' or v.name like '%${search}%' or c.name like '%${search}%' or status like '%${search}%'`, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataHistory = (id, cb) => {
    db.query(`select h.id,u.fullName,v.name as brand,c.name as category,h.rentStartDate,h.rentEndDate,h.prepayment,s.status 
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id 
    join categories c on v.category_id = c.id
    join status s on h.status = s.id 
    where h.id=?`, [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.insertDataHistory = (data, cb) => {
    const { idUser, idVehicle, startRentDate, endRentDate, prepayment, status } = data;
    db.query(`insert into histories (user_id,vehicle_id,rentStartDate,rentEndDate,prepayment,status)
  values(?,?,?,?,?,?)`, [idUser, idVehicle, startRentDate, endRentDate, prepayment, status], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};


exports.updateDataHistory = (id, data, cb) => {
    const { idUser, idVehicle, startRentDate, endRentDate, prepayment, status } = data;
    db.query(`update histories set user_id = ?,vehicle_id = ?,rentStartDate = ?,rentEndDate = ?,prepayment = ?,status = ?
  where id=?`, [idUser, idVehicle, startRentDate, endRentDate, prepayment, status, id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.deleteDataHistory = (id, cb) => {
    db.query('delete from histories where id=?', [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};