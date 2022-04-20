const db = require('../helpers/database');
const { APP_URL} = process.env;

exports.getDataVehicles = (data, cb) => {
    var filled = ["month", "location", "type", "payment_id", "category_id"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            if (item == "month") {
                resultFillter += ` and MONTH(v.createdAt)=${data.filter[item]}`;
            } else {
                resultFillter += ` and ${item}='${data.filter[item]}'`;
            }
        }
    });
    const query = db.query(`select v.id,v.name,v.category_id,c.name category,v.photo,v.location,v.price,v.qty,v.isAvailable,v.createdAt from vehicles v 
    join categories c on v.category_id = c.id 
      where v.name like '%${data.search}%' ${resultFillter}
      order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
    console.log(query.sql);
};

exports.getDataVehiclesAsync = (data) =>new Promise((resolve,reject) =>{
    var filled = [ "location_id","category_id","isAvailable"];
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

    const query = db.query(`select v.id AS id,v.name as name,v.category_id as category_id,c.name category,v.photo as photo,l.location as location,v.price as price,v.qty as qty,v.isAvailable as isAvailable,v.createdAt as createdAt 
    from vehicles v 
   join categories c on v.category_id = c.id 
   right join locations l on v.location_id = l.id
   where v.name like '%${data.name!==null ? data.name : ''}%'  ${resultFillter}
   ${sortOrderQuery}`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
    console.log(query.sql);

    //  const query = db.query(`select v.id AS id,v.name as name,v.category_id as category_id,c.name category,v.photo as photo,l.location as location,v.price as price,v.qty as qty,v.isAvailable as isAvailable,v.createdAt as createdAt 
    //  from vehicles v 
    // join categories c on v.category_id = c.id 
    // right join locations l on v.location_id = l.id
    // where v.name like '%${data.name!==null ? data.name : ''}%'  ${resultFillter}
    // ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''}  
    // LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset}`, function(error, results) {
    //      if (error) reject(error);
    //      resolve(results);
    //  });
    //  console.log(query.sql);
});

exports.getDataVehiclesByCategory = (data, id, cb) => {
    db.query(`select v.id,v.name,c.name category,concat('${APP_URL}/',v.photo) as photo,v.location,v.description,v.description,v.rate,v.isAvailable from vehicles v 
  join categories c on v.category_id = c.id 
    where v.category_id = ? 
    order by v.createdAt desc LIMIT ${data.limit} OFFSET ${data.offset}`, [id], function(error, results) {
        if (error) throw error;
        cb(results);
    });
};


exports.getDataVehiclesByCategoryAsync = (data, id) => new Promise((resolve,reject)=>{
    var filled = [ "location_id","isAvailable"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            resultFillter += ` and ${item}='${data.filter[item]}'`;
        }
    });
    db.query(`select v.id,v.name,v.category_id,c.name category,v.photo,l.location,v.price,v.qty,v.isAvailable,v.createdAt from vehicles v 
    join categories c on v.category_id = c.id 
    right join locations l on v.location_id = l.id
   where v.category_id = ? and v.name like '%${data.name!==null ? data.name : ''}%'  ${resultFillter}
   ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''}  
   LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset}`, [id], function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.countDataVehicles = (data, cb) => {
    db.query(`select count(*) as total from vehicles v 
  join categories c on v.category_id = c.id 
    where v.name like '%${data.search}%'`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.countAllDataVehiclesAsync = () => new Promise((resolve,reject)=>{
    db.query(`select count(*) as total from vehicles v 
 join categories c on v.category_id = c.id`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.countDataVehiclesAsync = (data) => new Promise((resolve,reject)=> {
    var filled = [ "location_id","category_id","isAvailable"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            resultFillter += ` and ${item}='${data.filter[item]}'`;
        }
    });
    const query =  db.query(`select count(*) as total from vehicles v 
 join categories c on v.category_id = c.id 
 right join locations l on v.location_id = l.id
 where v.name like '%${data.name!==null ? data.name : ''}%'  ${resultFillter}`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
    console.log(query.sql);
});

exports.countDataVehiclesByCategory = (id, cb) => {
    db.query(`select count(*) as total from vehicles v 
join categories c on v.category_id = c.id 
  where v.category_id = ?`, [id], function(error, results) {
        if (error) throw error;
        cb(results);
    });
};


exports.countDataVehiclesByCategoryAsync = (data,id) => new Promise((resolve,reject)=>{
    var filled = [ "location_id","category_id","isAvailable"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            resultFillter += ` and ${item}='${data.filter[item]}'`;
        }
    });
    db.query(`select count(*) as total from vehicles v 
join categories c on v.category_id = c.id 
where v.category_id = ? and v.name like '%${data.name!==null ? data.name : ''}%'  ${resultFillter}`, [id], function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.getDataVehicle = (id, cb) => {
    db.query(`select v.id,v.name,v.category_id,c.name category,concat('${APP_URL}/',v.photo) as photo,v.location,v.price,v.qty,v.isAvailable,v.rate from vehicles v join categories c on v.category_id = c.id WHERE v.id=?`, [id], (err, res) => {
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

exports.getDataVehicleMonthAsync = (data) => new Promise((resolve, reject) => {
    db.query(`select v.id,v.name,v.category_id,c.name category,concat('${APP_URL}/',v.photo) as photo,v.location,v.price,v.qty,v.isAvailable from vehicles v 
  join categories c on v.category_id = c.id 
    where MONTH(v.createdAt) = ${data.month}
    order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.insertDataVehicleAsync = (data) => new Promise((resolve, reject) => {
    db.query('insert into vehicles set ?', [data], (error, results) => {
        if (error) reject(error);
        resolve(results);
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

exports.updateDataVehicleAsync = (id, data) => new Promise((resolve, reject) => {
    var query = db.query('update vehicles set ? where id = ?', [data, id], (error, results) => {
        if (error) reject(error);
        resolve(results);
    });
    console.log(query.sql);
});

exports.deleteDataVehicle = (id, cb) => {
    db.query('delete from vehicles where id =?', [id], (error, results) => {
        if (error) throw error;
        cb(results);
    });
};

exports.deleteDataVehicleAsync = (id) => new Promise((resolve, reject) => {
    db.query('delete from vehicles where id =?', [id], (error, results) => {
        if (error) reject(error);
        resolve(results);
    });
});