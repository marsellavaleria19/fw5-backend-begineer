const db = require('../helpers/database');
exports.getDataUsers = (data, cb) => {
    const query = db.query(`select *  from users 
  where concat(fullName,nickName,gender,address,birthDate,mobileNumber,email) like '%${data.search}%'  
  order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
    console.log(query.sql);
};

exports.countDataUsers = (data, cb) => {
    db.query(`select count(*) as total  from users 
    where concat(fullName,nickName,gender,address,birthDate,mobileNumber,email) like '%${data.search}%'`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.getDataUser = (id, cb) => {
    db.query('select * from users where id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getDataUserEmail = (email, id, cb) => {
    if (id == null) {
        db.query('select * from users where email=?', [email, id], (err, res) => {
            if (err) throw err;
            cb(res);
        });
    } else {
        db.query('select * from users where email=? and id!=?', [email, id], (err, res) => {
            if (err) throw err;
            cb(res);
        });
    }
};

exports.insertDataUser = (data, cb) => {
    db.query('insert into users set ?', [data], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.updateDataUser = (id, data, cb) => {
    db.query('update users set ? where id = ?', [data, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.deleteDataUser = (id, cb) => {
    db.query('delete from users where id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};