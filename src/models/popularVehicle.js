const db = require('../helpers/database');

exports.getDataPopularVehicle = (month, cb) => {
    db.query(`select v.id, v.name,v.location,count(*) as total 
    from histories h join vehicles v on h.vehicle_id = v.id 
    where month(h.createdAt)=? 
    group by h.vehicle_id
    order by total desc`, [month], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};