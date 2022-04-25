const db = require('../helpers/database');

exports.getDataVehicleImages = (data) =>new Promise((resolve,reject) =>{
    var filled = [ "vehicle_id"];
    var sortOrderQuery = null;
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            resultFillter += ` and ${item}='${data.filter[item]}'`;
        }
    });

    if(data.dataPages.sort!==null && data.dataPages.order!==null){
        sortOrderQuery = `order by ${data.dataPages.sort} ${data.dataPages.order}
        LIMIT ${data.dataPages.limit.toString()} OFFSET ${data.dataPages.offset.toString()}`;
    }else{
        sortOrderQuery = `LIMIT ${data.dataPages.limit.toString()} OFFSET ${data.dataPages.offset.toString()}`; 
    }

    db.query(`select vi.id,vi.photo,vi.vehicle_id,v.name,vi.isPrimary
    from vehicle_images vi 
   join vehicles v on vi.vehicle_id = v.id 
   where v.name like '%${data.name!==null ? data.name : ''}%'  ${resultFillter}
   ${sortOrderQuery}`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.countDataVehicleImages = (data) => new Promise((resolve,reject)=>{
    var filled = [ "vehicle_id"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            resultFillter += ` and ${item}='${data.filter[item]}'`;
        }
    });

    const query = db.query(`select count(*) as total
    from vehicle_images vi 
    join vehicles v on vi.vehicle_id = v.id 
    where v.name like '%${data.name!==null ? data.name : ''}%' ${resultFillter}`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
    console.log(query.sql);
});

exports.getDataVehicleImagesByVehicleId = (data,id) =>new Promise((resolve,reject) =>{
    var sortOrderQuery = null;
   
    if(data.dataPages.sort!==null && data.dataPages.order!==null){
        sortOrderQuery = `order by ${data.dataPages.sort} ${data.dataPages.order}
     LIMIT ${data.dataPages.limit.toString()} OFFSET ${data.dataPages.offset.toString()}`;
    }else{
        sortOrderQuery = `LIMIT ${data.dataPages.limit.toString()} OFFSET ${data.dataPages.offset.toString()}`; 
    }

    db.query(`select vi.id,vi.photo,vi.vehicle_id,v.name 
    from vehicle_images vi 
   join vehicles v on vi.vehicle_id = v.id 
   where vi.vehicle_id=? and v.name like '%${data.name!==null ? data.name : ''}%'
   ${sortOrderQuery}`,[id], function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.countDataVehicleImageByVehicleId = (data,id) => new Promise((resolve,reject)=> {
    db.query(`select count(*) as total
   from vehicle_images vi 
   join vehicles v on vi.vehicle_id = v.id 
   where vi.vehicle_id=? and v.name like '%${data.name!==null ? data.name : ''}%'`,[id], function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.checkPhotoPrimary = (id) => new Promise((resolve,reject)=> {
    db.query(`select vi.id,vi.photo,vi.vehicle_id,v.name 
   from vehicle_images vi 
  join vehicles v on vi.vehicle_id = v.id 
  where vi.vehicle_id=? and vi.isPrimary=1`,[id], function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.getDataVehicleImage = (id) => new Promise((resolve, reject) => {
    db.query(`select vi.id,vi.photo,vi.vehicle_id,v.name,vi.isPrimary
    from vehicle_images vi 
    join vehicles v on vi.vehicle_id = v.id
    WHERE vi.id=?`, [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.insertDataVehicleImage = (data) => new Promise((resolve, reject) => {
    db.query('insert into vehicle_images set ?', [data], (error, results) => {
        if (error) reject(error);
        resolve(results);
    });
});

exports.updateDataVehicleImage = (id, data) => new Promise((resolve, reject) => {
    console.log(id,data);
    var query = db.query('update vehicle_images set ? where id = ?', [data, id], (error, results) => {
        if (error) reject(error);
        resolve(results);
    });
    console.log(query.sql);
});

exports.deleteDataVehicleImage = (id) => new Promise((resolve, reject) => {
    db.query('delete from vehicle_images where id =?', [id], (error, results) => {
        if (error) reject(error);
        resolve(results);
    });
});