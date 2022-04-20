const db = require('../helpers/database');

exports.insertDataRefreshToken = (data) => new Promise((resolve, reject) => {
    db.query('insert into refresh_token set ?', [data], (error, results) => {
        if (error) reject(error);
        resolve(results);
    });
});

exports.getDataRefreshTokenByToken = (token,id) => new Promise((resolve,reject)=>{
    const query = db.query('select * from refresh_token where token=? and user_id=?', [token,id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
    console.log(query.sql);
});

exports.deleteRefreshToken = (token,id) => new Promise((resolve,reject)=>{
    db.query('delete from refresh_token where token=? and user_id=?', [token,id], (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});