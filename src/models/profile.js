const db = require('../helpers/database');

exports.getDataProfile = (id, cb) => {
    db.query('select id,fullName,NickName,gender,photo,address,birthDate,mobileNumber,email from users where id=?', [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};