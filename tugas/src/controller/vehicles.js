/* eslint-disable no-unused-vars */
const res = require('express/lib/response');
const vehicleModel = require('../model/vehicles');

const getVehicles = (req, res) => {
    vehicleModel.getDataVehicles(results => {
        return res.json({
            success: true,
            message: 'List Data Vehicle',
            results: results
        });
    });
};

const getVehicle = (req, res) => {
    const { id } = req.params;
    vehicleModel.getDataVehicle(id, (results) => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'Detail Vehicle',
                results: results[0]
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Detail Vehicle not found',
            });
        }
    });
};

const insertVehicle = (req, res) => {
    const data = {
        brand: req.body.brand,
        type: req.body.type,
        rentPrice: req.body.rentPrice,
        qty: req.body.qty
    };

    vehicleModel.insertDataVehicle(data, (results) => {
        if (results.affectedRows > 0) {
            return res.json({
                success: true,
                message: 'Data Vehicle entered successfully.'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Data Vehicle failed to enter.'
            });
        }
    });
};

const updateVehicle = (req, res) => {
    const { id } = req.params;
    const data = {
        brand: req.body.brand,
        type: req.body.type,
        rentPrice: req.body.rentPrice,
        qty: req.body.qty
    };

    vehicleModel.getDataVehicle(id, (results) => {
        if (results.length > 0) {
            vehicleModel.updateDataVehicle(id, data, (results) => {
                if (results.affectedRows > 0) {
                    return res.json({
                        success: true,
                        message: 'Data Vehicle updated sucessfully.'
                    });
                } else {
                    return res.status(500).json({
                        success: false,
                        message: 'Data Vehicle failed to update.'
                    });
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Data Vehicle not found.'
            });
        }
    });
};

const deleteVehicle = (req, res) => {
    const { id } = req.params;

    vehicleModel.getDataVehicle(id, (results) => {
        if (results.length > 0) {
            vehicleModel.deleteDataVehicle(id, (results) => {
                if (results.affectedRows > 0) {
                    return res.json({
                        success: true,
                        message: 'Data Vehicle deleted successfully.'
                    });
                } else {
                    return res.status(500).json({
                        success: true,
                        message: 'Data Vehicle failed to delete.'
                    });
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Data Vehicle not found.'
            });
        }
    });
};

module.exports = { getVehicles, getVehicle, insertVehicle, updateVehicle, deleteVehicle };