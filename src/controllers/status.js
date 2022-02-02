/* eslint-disable no-unused-vars */
const statusModel = require('../models/status');
const validation = require('../helpers/validation');

const getAllStatus = (request, response) => {
    statusModel.getAllDataStatus((result) => {
        return response.json({
            success: true,
            message: 'List Data Status',
            results: result
        });
    });
};

const getStatus = (request, response) => {
    const { id } = request.params;
    statusModel.getDataStatus(id, (result) => {
        if (result.length > 0) {
            return response.json({
                success: true,
                message: 'Detail Data Status',
                results: result[0]
            });
        } else {
            return response.status(404).json({
                success: false,
                message: 'Data Status not found'
            });
        }
    });
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