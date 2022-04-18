const db = require('../helpers/database');

exports.getDataCategories = (data, cb) => {
    db.query(`select id,name from categories
    where name like '%${data.search!==null ? '' : data.seach}%'
    ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''} 
    LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset} `, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataCategoriesAsync = (data) => new Promise((resolve,reject)=>{
    const query = db.query(`select id,name from categories
  where name like '%${data.search!==null ? data.search : ''}%'
  ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''} 
  LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset} `, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
    console.log(query.sql);
});

exports.countDataCategories = (data, cb) => {
    db.query(`select count(*) as total from categories 
  where name like '%${data.search}%'`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.countDataCategoriesAsync = (data) => new Promise((resolve,reject)=>{
    db.query(`select count(*) as total from categories 
    where name like '%${data.search!==null ? data.search : ''}%'`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.getDataCategory = (id, cb) => {
    db.query('select id,name from categories where id=?', [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};


exports.getDataCategoryAsync = (id) => new Promise((resolve,reject)=>{
    db.query('select id,name from categories where id=?', [id], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.getDataCategoriesByName = (name, id, cb) => {
    db.query('select * from categories where name=?' + (id !== null ? 'and id!=?' : ''), [name, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getDataCategoriesByNameAsync = (name, id) => new Promise((resolve,reject)=>{
    const query = db.query('select * from categories where name=?' + (id !== null ? 'and id!=?' : ''), [name, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
    console.log(query.sql);
});

exports.insertDataCategory = (name, cb) => {
    db.query('insert into categories (name) values(?)', [name], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.insertDataCategoryAsync = (name) => new Promise((resolve,reject) =>{
    db.query('insert into categories (name) values(?)', [name], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.updateDataCategory = (id, name, cb) => {
    db.query('update categories set name=? where id=?', [name, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.updateDataCategoryAsync = (id, name) => new Promise((resolve,reject) => {
    db.query('update categories set name=? where id=?', [name, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.deleteDataCategory = (id, cb) => {
    db.query('delete from categories where id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.deleteDataCategoryAsync = (id) => new Promise((resolve,reject)=>{
    db.query('delete from categories where id=?', [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});