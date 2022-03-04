const db = require('../helpers/database');
const { APP_URL } = process.env;

exports.getDataPopularVehicle = (data, cb) => {
    db.query(`select v.id,v.name,concat('${APP_URL}/',v.photo) as photo,v.location,count(*) as total 
    from histories h join vehicles v on h.vehicle_id = v.id 
    group by h.vehicle_id having name like '%${data.search}%' 
    order by ${data.sort} ${data.order} LIMIT ${data.limit}  OFFSET ${data.offset}`, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.countDataPopularVehicle = (data, cb) => {
    db.query(`SELECT count(*) as total 
    from (select v.id, v.name,v.location,count(*) as total 
          from histories h join vehicles v on h.vehicle_id = v.id 
          group by h.vehicle_id having name like '%${data.search}%') as popular`, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};