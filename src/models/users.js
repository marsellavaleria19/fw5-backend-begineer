const db = require('../helpers/database');
exports.getDataUsers = (data, cb) => {
    db.query(`select *  from users 
  where concat(fullName,nickName,gender,address,birthDate,mobileNumber,email) like '%${data.search}%'  
  order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.getDataUsersAsync = (data) => new Promise((resolve,reject)=>{
    var filled = ["role","gender","isVerified","birthDate"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            resultFillter += ` and ${item}='${data.filter[item]}'`;
        }
    });

    const query = db.query(`select *  from users 
    where fullName like '%${data.name!==null ? data.name : ''}%'  ${resultFillter}
   ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''}  
   LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset}`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
    console.log(query.sql);
});

exports.countDataUsers = (data, cb) => {
    db.query(`select count(*) as total  from users 
    where concat(fullName,nickName,gender,address,birthDate,mobileNumber,email) like '%${data.search}%'`, function(error, results) {
        if (error) throw error;
        cb(results);
    });
};

exports.countDataUsersAsync = (data) => new Promise((resolve,reject)=>{
    var filled = ["role","gender","isVerified","birthDate"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            resultFillter += ` and ${item}='${data.filter[item]}'`;
        }
    });
    db.query(`select count(*) as total  from users 
    where fullName like '%${data.name!==null ? data.name : ''}%'  ${resultFillter}`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});

exports.getDataUser = (id, cb) => {
    db.query('select * from users where id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getDataUserAsync = (id) => new Promise((resolve, reject) => {
    db.query('select * from users where id=?', [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

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

exports.getDataUserEmailAsync = (email, id) => new Promise((resolve, reject) => {
    if (id == null) {
        db.query('select * from users where email=?', [email], (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    } else {
        db.query('select * from users where email=? and id!=?', [email, id], (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    }
});

exports.getDataUserUsernameAsync = (username, id) => new Promise((resolve, reject) => {
    if (id == null) {
        db.query('select * from users where username=?', [username], (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    } else {
        db.query('select * from users where username=? and id!=?', [username, id], (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    }
});


exports.insertDataUser = (data, cb) => {
    db.query('insert into users set ?', [data], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.insertDataUserAsync = (data) => new Promise((resolve, reject) => {
    db.query('insert into users set ?', [data], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.updateDataUser = (id, data, cb) => {
    db.query('update users set ? where id = ?', [data, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.updateDataUserAsync = (id, data) => new Promise((resolve, reject) => {
    db.query('update users set ? where id = ?', [data, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.deleteDataUser = (id, cb) => {
    db.query('delete from users where id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.deleteDataUserAsync = (id) => new Promise((resolve, reject) => {
    db.query('delete from users where id=?', [id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});