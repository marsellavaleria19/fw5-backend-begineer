const db = require('../helpers/database');

exports.getDataPopularVehicle = (cb) => {
    db.query('SELECT v.id,v.name,v.location, count(*) as total FROM `histories` h join vehicles v on v.id = h.idVehicle group by h.idVehicle', (error, result) => {
        if (error) throw error;
        cb(result);
    });
};