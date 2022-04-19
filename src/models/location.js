const db = require('../helpers/database');

exports.getDataLocations = (data) => new Promise((resolve,reject)=>{
    db.query(`select id,location from locations
  where location like '%${data.search!==null ? data.search:''}%'
  ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''} 
  LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset} `, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.countDataLocations = (data) => new Promise((resolve,reject)=>{
    db.query(`select count(*) as total from locations 
where location like '%${data.search!==null ? data.search : ''}%'`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.getDataLocationAsync = (id) => new Promise((resolve,reject)=>{
    db.query('select id,location from locations where id=?', [id], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.getDataLocationByLocation = (location, id) => new Promise((resolve,reject)=>{
    const query = db.query('select * from locations where location=?' + (id !== null ? 'and id!=?' : ''), [location, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
    console.log(query.sql);
});

exports.insertDataLocation = (location) => new Promise((resolve,reject) =>{
    db.query('insert into locations (location) values(?)', [location], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.updateDataLocation = (id, location) => new Promise((resolve,reject) => {
    db.query('update locations set location=? where id=?', [location, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.deleteDataLocation = (id) => new Promise((resolve,reject)=>{
    db.query('delete from locations where id=?', [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});