/* eslint-disable no-unused-vars */
const historyModel = require('../models/histories');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
// const { pagination } = require('../helpers/pagination');

const getHistories = (request, response) => {
    let { search, page, limit } = request.query;
    search = search || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;
    const data = { search, limit, offset };
    let dataJson = { response: response, message: '' };
    let pagination = { total: 0, limit: limit, page: page };
    historyModel.getDataHistories(data, (result) => {
        historyModel.countDataHistories(data, (count) => {
            const { total } = count[0];
            pagination = {...pagination, total: total };
            dataJson = {...dataJson, message: 'List Data Histories.', result: result, pagination };
            return showApi.showSuccessWithPagination(dataJson, pagination);
        });
    });
};

const getHistory = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    historyModel.getDataHistory(id, (result) => {
        if (result.length > 0) {
            dataJson = {...dataJson, message: 'Detail Data History.', result: result[0] };
            return showApi.showSuccess(dataJson);
        } else {
            dataJson = { response: response, message: 'Data History not found', status: 404 };
            return showApi(dataJson);
        }
    });
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
        historyModel.insertDataHistory(data, (result) => {
            if (result.affectedRows > 0) {
                dataJson = {...dataJson, message: 'Data History created successfully', result: {...data, user_id: parseInt(data.user_id), vehicle_id: parseInt(data.vehicle_id) } };
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
};

const updateHistory = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    if (id !== ' ') {
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
                            dataJson = {...dataJson, message: 'Data History created successfully.', result: data };
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
        dataJson = {...dataJson, message: 'Id must be filled.', status: 400 };
        return showApi.showError(dataJson);
    }

};

const deleteHistory = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    if (id !== ' ') {
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
        dataJson = {...dataJson, message: 'Id must be filled.', status: 400 };
        return showApi.showError(dataJson);
    }

};

module.exports = { getHistories, getHistory, insertHistory, updateHistory, deleteHistory };