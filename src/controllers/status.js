/* eslint-disable no-unused-vars */
const statusModel = require('../models/status');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');

const getAllStatus = (request, response) => {
    let dataJson = { response: response, message: '' };
    let { search, page, limit, sort, order } = request.query;
    sort = sort || 'createdAt';
    search = search || '';
    page = ((page != null && page !== '') ? parseInt(page) : 1);
    limit = ((limit != null && limit !== '') ? parseInt(limit) : 5);
    order = order || 'desc';
    let pagination = { page, limit };
    if (validation.validationPagination(pagination) == null) {
        const offset = (page - 1) * limit;
        let data = { search, limit, offset, sort, order };
        statusModel.getAllDataStatus(data, (results) => {
            if (results.length > 0) {
                statusModel.countDataStatus(data, (count) => {
                    const { total } = count[0];
                    pagination = {...pagination, total: total, route: 'status' };
                    dataJson = {...dataJson, message: 'List Data Status.', result: results, pagination };
                    return showApi.showSuccessWithPagination(dataJson, pagination);
                });
            } else {
                dataJson = {...dataJson, message: 'Data Status not found.', status: 404 };
                return showApi.showError(dataJson);
            }

        });
    } else {
        dataJson = {...dataJson, message: 'Pagination not valid.', status: 400, error: validation.validationPagination(pagination) };
        return showApi.showError(dataJson);
    }

};

const getStatus = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    if (id == !' ') {
        if (!isNaN(id)) {
            statusModel.getDataStatus(id, (result) => {
                if (result.length > 0) {
                    dataJson = {...dataJson, message: 'Detail Data Status', result: result[0] };
                    return showApi.showSuccess(dataJson);
                } else {
                    dataJson = {...dataJson, message: 'Data status not found.', status: 404 };
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

const insertStatus = (request, response) => {
    const status = request.body.status;
    if (validation.validationStatus(status) == null) {
        statusModel.getDataStatusByStatus(status, null, (resultDataStatus) => {
            if (resultDataStatus.length == 0) {
                statusModel.insertDataStatus(status, (result) => {
                    if (result.affectedRows > 0) {
                        return response.json({
                            success: true,
                            message: 'Data status created successfully.',
                            results: { status: status }
                        });
                    } else {
                        return response.status(500).json({
                            success: false,
                            message: 'Data status failed to create.',
                        });
                    }
                });
            } else {
                return response.status(400).json({
                    success: true,
                    message: 'Status has already used.'
                });
            }
        });
    } else {
        return response.status(400).json({
            success: false,
            message: 'Data status not valid.',
            error: validation.validationStatus(status)
        });
    }
};

const updateStatus = (request, response) => {
    const { id } = request.params;
    if (id !== ' ') {
        const data = {
            id: parseInt(id),
            status: request.body.status
        };

        statusModel.getDataStatus(id, (resultStatus) => {
            if (resultStatus.length > 0) {
                if (validation.validationStatus(data.status) == null) {
                    statusModel.getDataStatusByStatus(data.status, id, (resultDataStatus) => {
                        if (resultDataStatus.length == 0) {
                            statusModel.updateDataStatus(id, data.status, (result) => {
                                if (result.affectedRows > 0) {
                                    return response.json({
                                        success: true,
                                        message: 'Data status updated successfull.',
                                        results: data
                                    });
                                } else {
                                    return response.status(500).json({
                                        success: false,
                                        message: 'Data status failed to update.',
                                    });
                                }
                            });
                        } else {
                            return response.status(400).json({
                                success: true,
                                message: 'Status has already used.'
                            });
                        }
                    });

                } else {
                    return response.status(400).json({
                        success: false,
                        message: 'Data status not valid.',
                        error: validation.validationStatus(data.status)
                    });
                }
            } else {
                return response.status(404).json({
                    success: false,
                    message: 'Data status not found.',
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

const deleteStatus = (request, response) => {
    const { id } = request.params;
    if (id !== ' ') {
        statusModel.getDataStatus(id, (resultDataStatus) => {
            if (resultDataStatus.length > 0) {
                statusModel.deleteDataStatus(id, (result) => {
                    if (result.affectedRows > 0) {
                        return response.json({
                            success: true,
                            message: 'Data status deleted successfull.',
                            results: resultDataStatus
                        });
                    } else {
                        return response.status(500).json({
                            success: false,
                            message: 'Data status failed to delete.',
                        });
                    }
                });
            } else {
                return response.status(404).json({
                    success: false,
                    message: 'Data status not found.',
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

module.exports = { getAllStatus, getStatus, insertStatus, updateStatus, deleteStatus };