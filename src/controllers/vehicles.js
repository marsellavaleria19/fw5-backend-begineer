/* eslint-disable no-unused-vars */
const vehicleModel = require('../models/vehicles');
const validation = require('../helpers/validation');
const { pagination } = require('../helpers/pagination');

const getVehicles = (req, res) => {
    let { search, page, limit } = req.query;
    search = search || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;
    const data = { search, limit, offset };
    vehicleModel.getDataVehicles(data, results => {
        vehicleModel.countDataVehicles(data, (count) => {
            const { total } = count[0];
            return res.json({
                success: true,
                message: 'List Data Vehicle',
                results: results,
                pageInfo: pagination(data, total, page, 'vehicles')
            });
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
        name: req.body.name,
        category_id: req.body.category_id,
        photo: req.body.photo,
        location: req.body.location,
        price: req.body.price,
        qty: req.body.qty,
        isAvailable: req.body.isAvailable
    };

    if (validation.validationDataVehicles(data) == null) {
        vehicleModel.getDataVehicleName(data.name, null, (result) => {
            if (result.length == 0) {
                vehicleModel.insertDataVehicle(data, (results) => {
                    if (results.affectedRows > 0) {
                        return res.json({
                            success: true,
                            message: 'Data Vehicle created successfully.',
                            results: {...data, price: parseInt(data.price), qty: parseInt(data.qty), isAvailable: parseInt(data.isAvailable) }
                        });
                    } else {
                        return res.status(500).json({
                            success: false,
                            message: 'Data Vehicle failed to create.'
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Name has already used.'
                });
            }
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Data Vehicle was not valid.',
            error: validation.validationDataVehicles(data)
        });
    }


};

const updateVehicle = (req, res) => {
    const { id } = req.params;
    if (id !== ' ') {
        const data = {
            id: parseInt(id),
            name: req.body.name,
            category_id: req.body.category_id,
            photo: req.body.photo,
            location: req.body.location,
            price: req.body.price,
            qty: req.body.qty,
            isAvailable: req.body.isAvailable
        };
        vehicleModel.getDataVehicle(id, (resultDataVehicle) => {
            if (resultDataVehicle.length > 0) {
                if (validation.validationDataVehicles(data) == null) {
                    vehicleModel.getDataVehicleName(data.name, id, (resultName) => {
                        if (resultName.length == 0) {
                            vehicleModel.updateDataVehicle(id, data, (results) => {
                                if (results.affectedRows > 0) {
                                    return res.json({
                                        success: true,
                                        message: 'Data Vehicle updated sucessfully.',
                                        results: data
                                    });
                                } else {
                                    return res.status(500).json({
                                        success: false,
                                        message: 'Data Vehicle failed to update.'
                                    });
                                }
                            });
                        } else {
                            return res.status(400).json({
                                success: false,
                                message: 'Name has already used.'
                            });
                        }
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: 'Data Vehicle was not valid.',
                        error: validation.validationDataVehicles(data)
                    });
                }

            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Data Vehicle not found.'
                });
            }
        });

    } else {
        return res.status(400).json({
            success: false,
            message: 'id must be filled.'
        });
    }
};

const deleteVehicle = (req, res) => {
    const { id } = req.params;

    if (id !== ' ') {
        vehicleModel.getDataVehicle(id, (resultDataVehicle) => {
            if (resultDataVehicle.length > 0) {
                vehicleModel.deleteDataVehicle(id, (results) => {
                    if (results.affectedRows > 0) {
                        return res.json({
                            success: true,
                            message: 'Data Vehicle deleted successfully.',
                            results: resultDataVehicle
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
    } else {
        return res.status(400).json({
            success: false,
            message: 'id must be filled'
        });
    }

};

module.exports = { getVehicles, getVehicle, insertVehicle, updateVehicle, deleteVehicle };