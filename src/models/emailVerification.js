const db = require('../helpers/database');
exports.insertEmailVerification = (code, user_id) => new Promise((resolve, reject) => {
    db.query('INSERT INTO email_verification (user_id,code) VALUES (?,?) ', [code, user_id], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.getEmailVerificationByCode = (code) => new Promise((resolve, reject) => {
    db.query('select * from email_verification where code=?', [code], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.updateEmailVerification = (data, id) => new Promise((resolve, reject) => {
    db.query('UPDATE `email_verification` SET ? WHERE id=?', [data, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});