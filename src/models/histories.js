const db = require('../helpers/database');

exports.getDataHistories = (data, cb) => {
    db.query(`select h.id,u.fullName,v.name as brand,c.name as category,h.rentStartDate,h.rentEndDate,h.prepayment,s.status 
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id join categories c on v.category_id = c.id 
    join status s on h.status_id = s.id 
    where concat(u.fullName,v.name,c.name,h.rentStartDate,h.rentEndDate,h.prepayment,s.status) like '%${data.search}%' 
    order by ${data.sort} ${data.order} limit ${data.limit} offset ${data.offset}`, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.countDataHistories = (data, cb) => {
    db.query(`select count(*) as total
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id join categories c on v.category_id = c.id 
    join status s on h.status_id = s.id 
    where concat(u.fullName,v.name,c.name,h.rentStartDate,h.rentEndDate,h.prepayment,s.status) like '%${data.search}%'`, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataHistory = (id, cb) => {
    db.query(`select h.id,u.fullName,v.name as brand,c.name as category,h.rentStartDate,h.rentEndDate,h.prepayment,s.status 
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id 
    join categories c on v.category_id = c.id
    join status s on h.status_id = s.id 
    where h.id=?`, [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataHistoryByIdUser = (idUser, cb) => {
    db.query(`select * from histories where user_id=?`, [idUser], (error, results) => {
        if (error) throw error;
        cb(results);
    });
};

exports.getDataHistoryByIdVehicle = (idVehicle, cb) => {
    db.query(`select * 
from histories 
where vehicle_id=?`, [idVehicle], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataHistoryByIdStatus = (idStatus, cb) => {
    db.query(`select * 
from histories 
where h.status_id=?`, [idStatus], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.insertDataHistory = (data, cb) => {
    db.query(`insert into histories set ? `, [data], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};


exports.updateDataHistory = (id, data, cb) => {
    db.query('update histories set ? where id=?', [data, id], (error, result) => {
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