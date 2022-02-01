/* eslint-disable no-unused-vars */
const historyModel = require('../models/histories');
const validation = require('../helpers/validationHistory');

const getHistories = (request, response) => {
    historyModel.getDataHistories((result) => {
        return response.json({
            success: true,
            message: 'List Data Histories',
            results: result
        });
    });
};

const getHistory = (request, response) => {
    const { id } = request.params;
    historyModel.getDataHistory(id, (result) => {
        if (result.length > 0) {
            return response.json({
                success: true,
                message: 'Detail Data History',
                results: result[0]
            });
        } else {
            return response.status(404).json({
                success: false,
                message: 'Data History not found'
            });
        }
    });
};

const insertHistory = (request, response) => {
    const data = {
        idUser: request.body.idUser,
        idVehicle: request.body.idVehicle,
        startRentDate: request.body.startRentDate,
        endRentDate: request.body.endRentDate,
        prepayment: request.body.prepayment,
        paymentStatus: request.body.paymentStatus,
        rentStatus: request.body.rentStatus
    };

    if (validation.validationDataHistories(data) == null) {
        historyModel.insertDataHistory(data, (result) => {
            return response.json({
                success: true,
                message: 'Data history created successfull.',
                results: {...data, idUser: parseInt(data.idUser), idVehicle: parseInt(data.idVehicle) }
            });
        });
    } else {
        return response.status(400).json({
            success: false,
            message: 'Data history not valid.',
            error: validation.validationDataHistories(data)
        });
    }
};

const updateHistory = (request, response) => {
    const { id } = request.params;
    if (id !== ' ') {
        const data = {
            id: parseInt(id),
            idUser: request.body.idUser,
            idVehicle: request.body.idVehicle,
            startRentDate: request.body.startRentDate,
            endRentDate: request.body.endRentDate,
            prepayment: request.body.prepayment,
            paymentStatus: request.body.paymentStatus,
            rentStatus: request.body.rentStatus
        };


        historyModel.getDataHistory(id, (resultDataHistory) => {
            if (resultDataHistory.length > 0) {
                if (validation.validationDataHistories(data) == null) {
                    historyModel.updateDataHistory(id, data, (result) => {
                        if (result.affectedRows > 0) {
                            return response.json({
                                success: true,
                                message: 'Data history created successfull.',
                                results: data
                            });
                        } else {
                            return response.status(500).json({
                                success: false,
                                message: 'Data history failed to create.',
                            });
                        }
                    });
                } else {
                    return response.status(400).json({
                        success: false,
                        message: 'Data history not valid.',
                        error: validation.validationDataHistories(data)
                    });

                }
            } else {
                return response.status(404).json({
                    success: false,
                    message: 'Data history not found.',
                });
            }
        });
    } else {
        return response.status(400).json({
            success: false,
            message: 'Id must be filled.'
        });
    }

};

const deleteHistory = (request, response) => {
    const { id } = request.params;
    if (id !== ' ') {
        historyModel.getDataHistory(id, (resultDataHistory) => {
            if (resultDataHistory.length > 0) {
                historyModel.deleteDataHistory(id, (result) => {
                    if (result.affectedRows > 0) {
                        return response.json({
                            success: true,
                            message: 'Data history created successfull.',
                            results: resultDataHistory
                        });
                    } else {
                        return response.status(500).json({
                            success: false,
                            message: 'Data history failed to create.',
                        });
                    }
                });
            } else {
                return response.status(404).json({
                    success: false,
                    message: 'Data history not found.',
                });
            }
        });
    } else {
        return response.status(400).json({
            success: false,
            message: 'Id must be filled.'
        });
    }

};

module.exports = { getHistories, getHistory, insertHistory, updateHistory, deleteHistory };