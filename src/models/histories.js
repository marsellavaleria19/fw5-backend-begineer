const db = require('../helpers/database');

exports.getDataHistories = (data, cb) => {
    db.query(`select h.id,u.fullName,v.name as brand,c.name as category,h.rentStartDate,h.rentEndDate,h.prepayment,s.status 
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id 
    join categories c on v.category_id = c.id 
    join status s on h.status_id = s.id 
    where u.fullName like '%${data.search}%' or v.name like '%${data.search}%' or c.name like '%${data.search}%' or s.status like '%${data.search}%'
    order by h.createdAt desc limit ${data.limit} offset ${data.offset}`, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.countDataHistories = (data, cb) => {
    db.query(`select count(*) as total
  from histories h join users u on h.user_id = u.id 
  join vehicles v on h.vehicle_id = v.id 
  join categories c on v.category_id = c.id 
  join status s on h.status_id = s.id 
  where u.fullName like '%${data.search}%' or v.name like '%${data.search}%' or c.name like '%${data.search}%' or s.status like '%${data.search}%'`, (error, result) => {
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