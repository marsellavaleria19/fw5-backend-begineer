const db = require('../helpers/database');
exports.getDataUsers = (cb) => {
    db.query('select * from users', (err, res) => {
        if (err) throw err;
        cb(res);
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
    const { fullName, nickName, gender, photo, address, birthDate, mobileNumber, email, password } = data;
    db.query(`insert into users(fullName,nickName,gender,photo,address,
        birthDate,mobileNumber,email,password) values(?,?,?,?,?,?,?,?,?)`, [fullName, nickName, gender, photo, address, birthDate, mobileNumber, email, password], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.updateDataUser = (id, data, cb) => {
    const { fullName, nickName, gender, photo, address, birthDate, mobileNumber, email, password } = data;
    db.query(`update users set fullName = ?,nickName = ?, gender = ?,photo = ?,
                address = ?,birthDate = ?,mobileNumber = ?,email = ?,password = ? 
                where id = ?`, [fullName, nickName, gender, photo, address, birthDate, mobileNumber, email, password, id], (err, res) => {
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