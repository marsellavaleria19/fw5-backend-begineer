const res = require('express/lib/response')
const vehicleRentModel = require('../model/vehicleRents')

const getVehicleRents = (req, res) => {
    vehicleRentModel.getDataVehicleRents(results => {
        console.log(results)
        return res.json({
            success: true,
            message: 'List Vehicle Rent',
            results: results
        })
    })
}

const getVehicleRent = (req, res) => {
    const { id } = req.params
    vehicleRentModel.getDataVehicleRent(id, results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'Detail Vehicle Rent',
                results: results[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Detail Vehicle Rent tidak ditemukan',
            })
        }
    })
}

const insertVehicleRent = (req, res) => {
    const data = {
        customerName: req.body.customerName,
        vehicleNumber: req.body.vehicleNumber,
        vehicleType: req.body.vehicleType,
        rentDate: req.body.rentDate,
        rentTotal: req.body.rentTotal
    }
    var validation = validasi(data)
    if (validation == null) {
        vehicleRentModel.insertDataVehicleRent(data, results => {
            return res.json({
                success: true,
                message: '.'
            })
        })
    } else {
        return res.status(500).json({
            success: false,
            message: 'Data yang dimasukkan tidak valid.',
            error: validation
        })
    }

}

const updateVehicleRent = (req, res) => {
    const { id } = req.params
    const data = {
        customerName: req.body.customerName,
        vehicleNumber: req.body.vehicleNumber,
        vehicleType: req.body.vehicleType,
        rentDate: req.body.rentDate,
        rentTotal: req.body.rentTotal
    }
    var validation = validasi(data)
    if (validation == null) {
        vehicleRentModel.updateDataVehicleRent(id, data, results => {
            return res.json({
                success: true,
                message: 'Data berhasil diubah.'
            })
        })
    } else {
        return res.status(500).json({
            success: false,
            message: 'Data yang dimasukkan tidak valid.',
            error: validation
        })
    }
}

const deleteVehicleRent = (req, res) => {
    const { id } = req.params
    vehicleRentModel.deleteDataVehicleRent(id, results => {
        return res.json({
            success: true,
            message: 'Data berhasil dihapus.'
        })
    })

}

const validasi = (data) => {
    var hasil = null
    if (data.customerName == null || data.customerName == "") {
        hasil = { customerName: "Nama customer harus diisi" }
    }
    if (data.vehicleNumber == null || data.vehicleNumber == "") {
        hasil = {...hasil, vehicleNumber: "Nomor kendaraan harus diisi" }
    }
    if (data.vehicleType == null || data.vehicleType == "") {
        hasil = {...hasil, vehicleType: "Brand kendaraan harus diisi" }
    }
    if (data.rentDate == null || data.rentDate == "") {
        hasil = {...hasil, rentDate: "Tanggal rental harus diisi." }
    }
    if (data.rentTotal == null || data.rentTotal == "") {
        hasil = {...hasil, rentTotal: "Total rental harus diisi" }
    } else if (data.rentTotal == '0') {
        hasil = {...hasil, rentTotal: "Total rental harus lebih dari 0" }
    }
    return hasil
}

module.exports = { getVehicleRents, getVehicleRent, insertVehicleRent, updateVehicleRent, deleteVehicleRent }