const db = require('../helpers/database');
const { APP_URL } = process.env;

exports.getDataProfile = (id, cb) => {
    db.query(`select id,fullName,NickName,gender,concat('${APP_URL}/',photo) as photo,address,birthDate,mobileNumber,email,role,isVerified from users where id=?`, [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};