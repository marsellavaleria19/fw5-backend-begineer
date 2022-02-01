const db = require('../helpers/database');

exports.getDataHistories = (cb) => {
    db.query('select id,idUser,idVehicle,startRentDate,endRentDate,prepayment,paymentStatus,rentStatus from histories', (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataHistory = (id, cb) => {
    db.query('select id,idUser,idVehicle,startRentDate,endRentDate,prepayment,paymentStatus,rentStatus from histories where id=?', [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.insertDataHistory = (data, cb) => {
    const { idUser, idVehicle, startRentDate, endRentDate, prepayment, paymentStatus, rentStatus } = data;
    db.query(`insert into histories (idUser,idVehicle,startRentDate,endRentDate,prepayment,paymentStatus,rentStatus)
  values(?,?,?,?,?,?,?)`, [idUser, idVehicle, startRentDate, endRentDate, prepayment, paymentStatus, rentStatus], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};


exports.updateDataHistory = (id, data, cb) => {
    const { idUser, idVehicle, startRentDate, endRentDate, prepayment, paymentStatus, rentStatus } = data;
    db.query(`update histories set idUser = ?,idVehicle = ?,startRentDate = ?,endRentDate = ?,prepayment = ?,paymentStatus = ?,rentStatus = ?
  where id=?`, [idUser, idVehicle, startRentDate, endRentDate, prepayment, paymentStatus, rentStatus, id], (error, result) => {
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