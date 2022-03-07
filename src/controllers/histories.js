/* eslint-disable no-unused-vars */
const historyModel = require('../models/histories');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const { request } = require('express');
const moment = require('moment');
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
                result.map((item) => {
                    item.rentStartDate = moment(item.rentStartDate).format('DD MMM YYYY');
                    item.rentEndDate = moment(item.rentEndDate).format('DD MMM YYYY');
                    return item;
                });
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

const getHistoriesAsync = async(request, response) => {
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
        let result = await historyModel.getDataHistories(data);
        if (result.length > 0) {

            var count = await historyModel.countDataHistories(data);
            const { total } = count[0];
            pagination = {...pagination, total: total, route: 'histories' };
            dataJson = {...dataJson, message: 'List Data Histories.', result: result, pagination };
            return showApi.showSuccessWithPagination(dataJson, pagination);
        } else {
            dataJson = {...dataJson, message: 'Data History not found.', status: 404 };
            return showApi.showError(dataJson);
        }
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
                    result.map((item) => {
                        item.rentStartDate = moment(item.rentStartDate).format('DD MMM YYYY');
                        item.rentEndDate = moment(item.rentEndDate).format('DD MMM YYYY');
                        return item;
                    });
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
        historyModel.getDataHistoryByIdUser(data.user_id, (resultUser) => {
            if (resultUser.length == 0) {
                dataJson = {...dataJson, message: resultUser.message, status: 404 };
                return showApi.showError(dataJson);
            }
        });
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

const insertHistoryAsync = async(request, response) => {
    const data = {
        user_id: request.body.idUser,
        vehicle_id: request.body.idVehicle,
        rentStartDate: request.body.startRentDate,
        rentEndDate: request.body.endRentDate,
        prepayment: request.body.prepayment,
        status_id: request.body.status,
        qty: request.body.qty
    };

    let dataJson = { response: response, message: '' };
    var error = await validation.validationDataHistories(data);
    if (error == null) {
        var result = await historyModel.insertDataHistoryAsync(data);
        if (result.affectedRows > 0) {
            historyModel.getDataHistory(result.insertId, (dataResult) => {
                dataJson = {...dataJson, message: 'Data History created successfully', result: dataResult[0] };
                return showApi.showSuccess(dataJson);
            });

        } else {
            dataJson = {...dataJson, message: 'Data History failed to create.', status: 500 };
            return showApi.showError(dataJson);
        }
    } else {
        dataJson = {...dataJson, message: 'Data History not valid.', status: 400, error: error };
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


const updateHistoryAsync = async(request, response) => {
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
                status_id: request.body.status,
                payment_id: request.body.payment_id
            };

            var error = await validation.validationDataHistories(data);
            historyModel.getDataHistory(id, async(resultDataHistory) => {
                if (resultDataHistory.length > 0) {
                    if (error == null) {
                        historyModel.updateDataHistory(id, data, (result) => {
                            if (result.affectedRows > 0) {
                                dataJson = {...dataJson, message: 'Data History updated successfully.', result: resultDataHistory[0] };
                                return showApi.showSuccess(dataJson);
                            } else {
                                dataJson = {...dataJson, message: 'Data History failed to update.', status: 500 };
                                return showApi.showError(dataJson);
                            }
                        });
                    } else {
                        dataJson = {...dataJson, message: 'Data History is not valid.', status: 400, error: error };
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
                historyModel.updateDataHistory(id, req.body, (results) => {
                    if (results.affectedRows > 0) {
                        historyModel.getDataHistory(id, (resultDataHistoryUpdate) => {
                            dataJson = {...dataJson, message: 'Data History updated successfully.', result: resultDataHistoryUpdate };
                            return showApi.showSuccess(dataJson);
                        });
                    } else {
                        dataJson = {...dataJson, message: 'Data History failed to update.', status: 500 };
                        return showApi.showError(dataJson);
                    }
                });

            } else {
                dataJson = {...dataJson, message: 'Data History not found.', status: 400 };
                return showApi.showError(dataJson);
            }
        });

    } else {
        dataJson = {...dataJson, message: 'Id must be filled.', status: 400 };
        return showApi.showError(dataJson);
    }
};

const updatePatchHistoryAsync = async(req, res) => {
    const { id } = req.params;
    let dataJson = { response: res, message: '' };
    if (id !== ' ') {
        if (!isNaN(id)) {
            console.log(req.body);
            const dataHistory = await historyModel.getDataHistoryAsync(id);
            if (dataHistory.length > 0) {
                var data = {};
                var filled = ['user_id', 'vehicle_id', 'rentStartDate', 'rentEndDate', 'prepayment', 'status_id', 'payment_id'];

                filled.forEach((value) => {
                    if (req.body[value]) {
                        data[value] = req.body[value];
                    }
                });
                const update = await historyModel.updateDataHistoryAsync(id, data);
                if (update.affectedRows > 0) {
                    const result = await historyModel.getDataHistoryAsync(id);
                    dataJson = {...dataJson, message: 'Data History updated successfully.', result: result[0] };
                    return showApi.showSuccess(dataJson);
                } else {
                    dataJson = {...dataJson, message: 'Data History failed to update.', status: 500 };
                    return showApi.showError(dataJson);
                }
            } else {
                dataJson = {...dataJson, message: 'Data History not found.', status: 400 };
                return showApi.showError(dataJson);
            }
        } else {
            dataJson = {...dataJson, message: 'Data History must be a number.', status: 400 };
            return showApi.showError(dataJson);
        }
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

module.exports = { getHistories, getHistory, insertHistory, insertHistoryAsync, updateHistory, updateHistoryAsync, updatePatchHistory, updatePatchHistoryAsync, deleteHistory };