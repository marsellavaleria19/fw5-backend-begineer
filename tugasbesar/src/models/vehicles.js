const db = require('../helpers/db')

exports.getDataVehicles = (cb) => {
    db.query('select * from vehicles', (error, res) => {
        if (error) throw error
        cb(res)
    })
}

exports.getDataVehicle = (id, cb) => {
    db.query('select * from vehicles where id=?', (error, res) => {
        if (error) throw error
        cb(res)
    })
}

exports.insertDataVehicle = (data, cb) => {
    const { name, idCategory, photo, location, price, stock, status } = data
    db.query(`insert into vehicles (name,idCategory,photo,location,price,stock,status) 
    values(?,?,?,?,?,?,?)`, [name, idCategory, photo, location, price, stock, status], (error, results) => {
        if (error) throw error
        cb(res)
    })
}

exports.updateDataVehicle = (id, data, cb) => {
    const { name, idCategory, photo, location, price, stock, status } = data
    db.query(`update vehicles set name = ?, idCategory= ?, photo=?, location=?,price=?,stock=?,status=?
    where id=?`, [name, idCategory, photo, location, price, stock, status, id], (error, results) => {
        if (error) throw error
        cb(results)
    })
}

exports.deleteDataVehicle = (id, cb) => {
    db.query(`delete from vehicles where id=?`, [id], (error, results) => {
        if (error) throw error
        cb(results)
    })
}