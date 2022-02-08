const db = require('../helpers/database');

exports.getDataPopularVehicle = (data, month, cb) => {
    db.query(`select v.id, v.name,v.location,count(*) as total 
    from histories h join vehicles v on h.vehicle_id = v.id 
    where month(h.createdAt)=? 
    group by h.vehicle_id having concat(name,location) like '%${data.search}%'
    order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, [month], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.countDataPopularVehicle = (data, month, cb) => {
    db.query(`SELECT count(*) as total 
    from (select v.id, v.name,v.location,count(*) as total 
          from histories h join vehicles v on h.vehicle_id = v.id 
          where month(h.createdAt)= ?
          group by h.vehicle_id having concat(name,location) like '%${data.search}%') as popular`, [month], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};