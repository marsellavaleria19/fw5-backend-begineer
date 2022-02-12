const db = require('../helpers/database');
exports.insertForgotPassword = (user_id, code) => new Promise((resolve, reject) => {
    db.query('INSERT INTO forgot_password (user_id,code) VALUES (?,?) ', [user_id, code], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.getForgotPassword = (code) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM forgot_password WHERE code=?', [code], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});

exports.updateForgotPassword = (data, id) => new Promise((resolve, reject) => {
    const query = db.query('UPDATE `forgot_password` SET ? WHERE id=?', [data, id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
    console.log(query.sql);
});