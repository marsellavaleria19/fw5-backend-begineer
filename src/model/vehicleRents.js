const db = require('../helpers/database')

exports.getDataVehicleRents = (cb) => {
    db.query('select * from vehicle_rent', function(error, results) {
        if (error) throw error;
        cb(results)
    })
}

exports.getDataVehicleRent = (id, cb) => {
    db.query('SELECT * FROM vehicle_rent WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res)
    })
}

exports.insertDataVehicleRent = (data, cb) => {
    const { customerName, vehicleNumber, vehicleType, rentDate, rentTotal } = data
    db.query(`insert into vehicle_rent (customer_name,vehicle_number,vehicle_type,rent_date,rent_total) 
    values(?,?,?,?,?)`, [customerName, vehicleNumber, vehicleType, rentDate, rentTotal], (error, results) => {
        if (error) throw error;
        cb(results)
    })
}

exports.updateDataVehicleRent = (id, data, cb) => {
    const { customerName, vehicleNumber, vehicleType, rentDate, rentTotal } = data
    db.query(`update vehicle_rent set 
    customer_name = ?,vehicle_number = ?,
    vehicle_type =?,rent_date = ?,rent_total = ? 
    where id = ?`, [customerName, vehicleNumber, vehicleType, rentDate, rentTotal, id], (error, results) => {
        if (error) throw error;
        cb(results)
    })
}

exports.deleteDataVehicleRent = (id, cb) => {
    db.query(`delete from vehicle_rent where id =?`, [id], (error, results) => {
        if (error) throw error;
        cb(results)
    })
}