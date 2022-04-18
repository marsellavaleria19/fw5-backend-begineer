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

exports.getDataPopularVehicleAsync = (data) => new Promise((resolve,reject)=>{
    db.query(`select v.id,v.name,v.photo,l.location,count(*) as total 
   from histories h join vehicles v on h.vehicle_id = v.id
   join locations l on v.location_id = l.id 
   group by h.vehicle_id having name like '%${data.search}%' 
   ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''}  
   LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset}`, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.countDataPopularVehicle = (data, cb) => {
    db.query(`SELECT count(*) as total 
    from (select v.id, v.name,v.location,count(*) as total 
          from histories h join vehicles v on h.vehicle_id = v.id 
          group by h.vehicle_id having name like '%${data.search}%') as popular`, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.countDataPopularVehicleAsync = (data) => new Promise((resolve,reject)=>{
    db.query(`SELECT count(*) as total 
   from (select v.id, v.name,v.location,count(*) as total 
         from histories h join vehicles v on h.vehicle_id = v.id 
         group by h.vehicle_id having name like '%${data.search}%') as popular`, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});