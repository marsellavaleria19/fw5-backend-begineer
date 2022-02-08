/* eslint-disable no-unused-vars */
const historyModel = require('../models/histories');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const { request } = require('express');
// const { pagination } = require('../helpers/pagination');

const getHistories = (request, response) => {
    let { search, page, limit, sort, order, month } = request.query;
    sort = sort || 'h.createdAt';
    search = search || '';
    page = ((page != null && page !== '') ? parseInt(page) : 1);
    limit = ((limit != null && limit !== '') ? parseInt(limit) : 5);
    order = order || 'desc';
    let pagination = { page, limit };
    let dataJson = { response: response, message: '' };
    if (validation.validationPagination(pagination) == null) {
        const offset = (page - 1) * limit;
        let data = { search, limit, offset, sort, order };
        historyModel.getDataHistories(data, (result) => {
            if (result.length > 0) {
                historyModel.countDataHistories(data, (count) => {
                    const { total } = count[0];
                    pagination = {...pagination, total: total, route: 'histories' };
                    dataJson = {...dataJson, message: 'List Data Histories.', result: result, pagination };
                    return showApi.showSuccessWithPagination(dataJson, pagination);
                });
            } else {
                dataJson = {...dataJson, message: 'Data History not found.', status: 404 };
                return showApi.showError(dataJson);
            }

        });
    } else {
        dataJson = {...dataJson, message: 'Pagination not valid.', status: 400, error: validation.validationPagination(pagination) };
        return showApi.showError(dataJson);
    }

};

const getHistory = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    if (id !== ' ') {
        if (!isNaN(id)) {
            historyModel.getDataHistory(id, (result) => {
                if (result.length > 0) {
                    dataJson = {...dataJson, message: 'Detail Data History.', result: result[0] };
                    return showApi.showSuccess(dataJson);
                } else {
                    dataJson = { response: response, message: 'Data History not found', status: 404 };
                    return showApi.showError(dataJson);
                }
            });
        } else {
            dataJson = { response: response, message: 'Id must be a number.', status: 404 };
            return showApi.showError(dataJson);
        }

    } else {
        dataJson = { response: response, message: 'id must be filled.', status: 400 };
        return showApi.showError(dataJson);
    }

};

const insertHistory = (request, response) => {
    const data = {
        user_id: request.body.idUser,
        vehicle_id: request.body.idVehicle,
        rentStartDate: request.body.startRentDate,
        rentEndDate: request.body.endRentDate,
        prepayment: request.body.prepayment,
        status_id: request.body.status
    };

    let dataJson = { response: response, message: '' };

    if (validation.validationDataHistories(data) == null) {
        const historyByUserId = historyModel.getDataHistoryByIdUser(data.user_id, (resultUser) => {
            console.log("User:" + resultUser);
            // if (resultUser.length == 0) {
            //     dataJson = {...dataJson, message: resultUser.message, status: 404 };
            //     return showApi.showError(dataJson);
            // }
        });
        console.log("show:" + historyByUserId);
        historyModel.getDataHistoryByIdVehicle(data.vehicle_id, (resultVehicle) => {
            if (resultVehicle.length == 0) {
                dataJson = {...dataJson, message: 'Vehicle id not found.', status: 404 };
                return showApi.showError(dataJson);
            }
        });
        historyModel.insertDataHistory(data, (result) => {
            if (result.affectedRows > 0) {
                historyModel.getDataHistory(result.insertId, (dataResult) => {
                    dataJson = {...dataJson, message: 'Data History created successfully', result: dataResult };
                    return showApi.showSuccess(dataJson);
                });

            } else {
                dataJson = {...dataJson, message: 'Data History failed to create.', status: 500 };
                return showApi.showError(dataJson);
            }
        });
    } else {
        dataJson = {...dataJson, message: 'Data History failed to create.', status: 400, error: validation.validationDataHistories(data) };
        return showApi.showError(dataJson);
    }
};

const updateHistory = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    if (id !== ' ') {
        if (!isNaN(id)) {
            const data = {
                id: parseInt(id),
                user_id: request.body.idUser,
                vehicle_id: request.body.idVehicle,
                rentStartDate: request.body.startRentDate,
                rentEndDate: request.body.endRentDate,
                prepayment: request.body.prepayment,
                status_id: request.body.status
            };


            historyModel.getDataHistory(id, (resultDataHistory) => {
                if (resultDataHistory.length > 0) {
                    if (validation.validationDataHistories(data) == null) {
                        historyModel.updateDataHistory(id, data, (result) => {
                            if (result.affectedRows > 0) {
                                dataJson = {...dataJson, message: 'Data History updated successfully.', result: resultDataHistory };
                                return showApi.showSuccess(dataJson);
                            } else {
                                dataJson = {...dataJson, message: 'Data History failed to create.', status: 500 };
                                return showApi.showError(dataJson);
                            }
                        });
                    } else {
                        dataJson = {...dataJson, message: 'Data History failed to create.', status: 400, error: validation.validationDataHistories(data) };
                        return showApi.showError(dataJson);
                    }
                } else {
                    dataJson = {...dataJson, message: 'Data History not found.', status: 404 };
                    return showApi.showError(dataJson);
                }
            });
        } else {
            dataJson = {...dataJson, message: 'Id must be a number.', status: 400 };
            return showApi.showError(dataJson);
        }
    } else {
        dataJson = {...dataJson, message: 'Id must be filled.', status: 400 };
        return showApi.showError(dataJson);
    }
};

const updatePatchHistory = (req, res) => {
    const { id } = req.params;
    let dataJson = { response: res, message: '' };
    if (id !== ' ') {
        historyModel.getDataHistory(id, (resultDataHistory) => {
            if (resultDataHistory.length > 0) {
                const data = {
                    id: parseInt(id),
                    user_id: !request.body.idUser ? resultDataHistory[0].user_id : request.body.idUser,
                    vehicle_id: !request.body.idVehicle ? resultDataHistory[0].vehicle_id : request.body.idUser,
                    rentStartDate: request.body.startRentDate ? resultDataHistory[0].rentStartDate : request.body.startRentDate,
                    rentEndDate: request.body.endRentDate ? resultDataHistory[0].rentEndDate : request.body.endRentDate,
                    prepayment: request.body.prepayment ? resultDataHistory[0].prepayment : request.body.prepayment,
                    status_id: request.body.status ? resultDataHistory[0].status_id : request.body.status
                };
                historyModel.updateDataVehicle(id, data, (results) => {
                    if (results.affectedRows > 0) {
                        dataJson = {...dataJson, message: 'Data Vehicle updated successfully.', result: data };
                        return showApi.showSuccess(dataJson);
                    } else {
                        dataJson = {...dataJson, message: 'Data Vehicle failed to update.', status: 500 };
                        return showApi.showError(dataJson);
                    }
                });

            } else {
                dataJson = {...dataJson, message: 'Data Vehicle not found.', status: 400 };
                return showApi.showError(dataJson);
            }
        });

    } else {
        dataJson = {...dataJson, message: 'Id must be filled.', status: 400 };
        return showApi.showError(dataJson);
    }
};

const deleteHistory = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    if (id !== ' ') {
        if (!isNaN(id)) {
            historyModel.getDataHistory(id, (resultDataHistory) => {
                if (resultDataHistory.length > 0) {
                    historyModel.deleteDataHistory(id, (result) => {
                        if (result.affectedRows > 0) {
                            dataJson = {...dataJson, message: 'Data History deleted successfully.', result: resultDataHistory };
                            return showApi.showSuccess(dataJson);
                        } else {
                            dataJson = {...dataJson, message: 'Data History failed to delete.', status: 500 };
                            return showApi.showError(dataJson);
                        }
                    });
                } else {
                    dataJson = {...dataJson, message: 'Data History not found.', status: 404 };
                    return showApi.showError(dataJson);
                }
            });
        } else {
            dataJson = {...dataJson, message: 'Id must be a number.', status: 400 };
            return showApi.showError(dataJson);
        }

    } else {
        dataJson = {...dataJson, message: 'Id must be filled.', status: 400 };
        return showApi.showError(dataJson);
    }

};

module.exports = { getHistories, getHistory, insertHistory, updateHistory, deleteHistory };