/* eslint-disable no-unused-vars */
const vehicleModel = require('../models/vehicles');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const upload = require('../helpers/upload').single('photo');
const { APP_URL } = process.env;

const getVehicles = (req, res) => {
    let { search, page, limit, sort, order } = req.query;
    sort = sort || 'v.createdAt';
    search = search || '';
    page = ((page != null && page !== '') ? parseInt(page) : 1);
    limit = ((limit != null && limit !== '') ? parseInt(limit) : 5);
    order = order || 'desc';
    let pagination = { page, limit };
    let dataJson = { response: res, message: '' };
    if (validation.validationPagination(pagination) == null) {
        const offset = (page - 1) * limit;
        let data = { search, limit, offset, sort, order };
        vehicleModel.getDataVehicles(data, results => {
            if (results.length > 0) {
                vehicleModel.countDataVehicles(data, (count) => {
                    const { total } = count[0];
                    results.map((value) => {
                        if (value.photo !== null) {
                            value.photo = `${APP_URL}/${value.photo}`;
                        }
                        return value;
                    });
                    pagination = {...pagination, total: total, route: 'vehicles' };
                    dataJson = {...dataJson, message: 'List Data Vehicles.', result: results, pagination };
                    return showApi.showSuccessWithPagination(dataJson, pagination);
                });
            } else {
                dataJson = {...dataJson, message: 'Data Vehicle not found', status: 404 };
                return showApi.showError(dataJson);
            }

        });
    } else {
        dataJson = {...dataJson, message: 'Pagination not valid', status: 400, error: validation.validationPagination(pagination) };
        return showApi.showError(dataJson);
    }

};

const getDataVehiclesByCategory = (req, res) => {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;
    const data = { limit, offset };
    const { id } = req.params;
    let dataJson = { response: res, message: '' };
    let pagination = { total: 0, limit: limit, page: page };
    vehicleModel.getDataVehiclesByCategory(data, id, (results) => {
        vehicleModel.countDataVehiclesByCategory(id, (count) => {
            const { total } = count[0];
            pagination = {...pagination, total: total };
            dataJson = {...dataJson, message: 'List Data Vehicles by category.', result: results, pagination };
            return showApi.showSuccessWithPagination(dataJson, pagination);
        });
    });
};


const getVehicle = (req, res) => {
    const { id } = req.params;
    let dataJson = { response: res, message: '' };
    vehicleModel.getDataVehicle(id, (results) => {
        if (results.length > 0) {
            dataJson = {...dataJson, message: 'Detail Vehicle', result: results[0] };
            return showApi.showSuccess(dataJson);
        } else {
            dataJson = {...dataJson, message: 'Detail Vehicle not found', status: 404 };
            return showApi.showError(dataJson);
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

    let dataJson = { response: res, message: '' };
    if (validation.validationDataVehicles(data) == null) {
        vehicleModel.getDataVehicleName(data.name, null, (result) => {
            if (result.length == 0) {
                vehicleModel.insertDataVehicle(data, (results) => {
                    if (results.affectedRows > 0) {
                        dataJson = {...dataJson, message: 'Data Vehicle created successfully.', result: {...data, price: parseInt(data.price), qty: parseInt(data.qty), isAvailable: parseInt(data.isAvailable) } };
                        return showApi.showSuccess(dataJson);
                    } else {
                        dataJson = {...dataJson, message: 'Data Vehicle failed to create', status: 500 };
                        return showApi.showError(dataJson);
                    }
                });
            } else {
                dataJson = {...dataJson, message: 'Name has already used.', status: 400 };
                return showApi.showError(dataJson);
            }
        });
    } else {
        dataJson = {...dataJson, message: 'Data Vehicle was not valid.', status: 400, error: validation.validationDataVehicles(data) };
        return showApi.showError(dataJson);
    }
};

const insertVehicleAsync = (request, response) => {
    upload(request, response, function(error) {
        let dataJson = { response: response, message: '' };

        const data = {
            name: request.body.name,
            category_id: request.body.category_id,
            location: request.body.location,
            price: request.body.price,
            qty: request.body.qty,
            isAvailable: request.body.isAvailable
        };

        var errValidation = validation.validationDataVehicles(data);
        if (request.file) {
            data.photo = request.file.path;
        }
        if (errValidation == null) {
            vehicleModel.getDataVehicleName(data.name, null, (result) => {
                if (result.length == 0) {
                    vehicleModel.insertDataVehicle(data, (results) => {
                        if (results.affectedRows > 0) {
                            vehicleModel.getDataVehicle(results.insertId, (resultVehicle) => {
                                resultVehicle.map((value) => {
                                    if (value.photo !== null) {
                                        value.photo = `${APP_URL}/${value.photo}`;
                                    }
                                    return value;
                                });
                                dataJson = {...dataJson, message: 'Data Vehicle created successfully.', result: resultVehicle };
                                return showApi.showSuccess(dataJson);
                            });

                        } else {
                            dataJson = {...dataJson, message: 'Data Vehicle failed to create', status: 500 };
                            return showApi.showError(dataJson);
                        }
                    });
                } else {
                    dataJson = {...dataJson, message: 'Name has already used.', status: 400 };
                    return showApi.showError(dataJson);
                }
            });
        } else {
            if (error) {
                errValidation = {...errValidation, photo: error.message };
            }
            dataJson = {...dataJson, message: 'Data Vehicle was not valid.', status: 400, error: errValidation };
            return showApi.showError(dataJson);
        }
    });
};

const updateVehicle = (req, res) => {
    const { id } = req.params;
    let dataJson = { response: res, message: '' };
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
                                    dataJson = {...dataJson, message: 'Data Vehicle updated successfully.', result: data };
                                    return showApi.showSuccess(dataJson);
                                } else {
                                    dataJson = {...dataJson, message: 'Data Vehicle failed to update.', status: 500 };
                                    return showApi.showError(dataJson);
                                }
                            });
                        } else {
                            dataJson = {...dataJson, message: 'Name has already used.', status: 400 };
                            return showApi.showError(dataJson);
                        }
                    });
                } else {
                    dataJson = {...dataJson, message: 'Data Vehicle was not valid.', status: 400, error: validation.validationDataVehicles(data) };
                    return showApi.showError(dataJson);
                }

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

const updateVehicleAsync = (req, res) => {
    upload(req, res, async(error) => {
        const { id } = req.params;
        let dataJson = { response: res, message: '' };
        if (id !== ' ') {
            const data = {
                id: parseInt(id),
                name: req.body.name,
                category_id: req.body.category_id,
                location: req.body.location,
                price: req.body.price,
                qty: req.body.qty,
                isAvailable: req.body.isAvailable
            };

            var errValidation = validation.validationDataVehicles(data);
            if (req.file) {
                data.photo = req.file.path;
            }

            try {
                const resultDataVehicle = await vehicleModel.getDataVehicleAsync(id);
                if (resultDataVehicle.length > 0) {
                    if (errValidation == null) {
                        vehicleModel.updateDataVehicle(id, data, (results) => {
                            if (results.affectedRows > 0) {
                                dataJson = {...dataJson, message: 'Data Vehicle updated successfully.', result: data };
                                return showApi.showSuccess(dataJson);
                            } else {
                                dataJson = {...dataJson, message: 'Data Vehicle failed to update.', status: 500 };
                                return showApi.showError(dataJson);
                            }
                        });
                    } else {
                        try {
                            const checkSameName = await vehicleModel.getDataVehicleNameAsync(data.name, id);
                            errValidation = {...errValidation, name: "Name has already used" };
                        } catch (error) {
                            dataJson = {...dataJson, message: 'Vehicle error', status: 500, error: error };
                            return showApi.showError(dataJson);
                        }

                        if (error) {
                            errValidation = {...errValidation, photo: error.message };
                        }
                        dataJson = {...dataJson, message: 'DataVehicle not valid.', status: 400, error: errValidation };
                        return showApi.showError(dataJson);
                    }
                }
            } catch (error) {
                dataJson = {...dataJson, message: 'Vehicle error', status: 500, error: error };
                return showApi.showError(dataJson);
            }
        } else {
            dataJson = {...dataJson, message: 'Id must be filled.', status: 400 };
            return showApi.showError(dataJson);
        }

    });

};


const updatePatchVehicle = (req, res) => {
    const { id } = req.params;
    let dataJson = { response: res, message: '' };
    if (id !== ' ') {
        vehicleModel.getDataVehicle(id, (resultDataVehicle) => {
            if (resultDataVehicle.length > 0) {
                vehicleModel.updateDataVehicle(id, req.body, (results) => {
                    if (results.affectedRows > 0) {
                        vehicleModel.getDataVehicle(id, (resultDataVehicleUpdate) => {
                            dataJson = {...dataJson, message: 'Data Vehicle updated successfully.', result: resultDataVehicleUpdate };
                            return showApi.showSuccess(dataJson);
                        });
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

const deleteVehicle = (req, res) => {
    const { id } = req.params;
    let dataJson = { response: res, message: '' };
    if (id !== ' ') {
        vehicleModel.getDataVehicle(id, (resultDataVehicle) => {
            if (resultDataVehicle.length > 0) {
                vehicleModel.deleteDataVehicle(id, (results) => {
                    if (results.affectedRows > 0) {
                        dataJson = {...dataJson, message: 'Data Vehicle deleted successfully.', result: resultDataVehicle };
                        return showApi.showSuccess(dataJson);
                    } else {
                        dataJson = {...dataJson, message: 'Data Vehicle failed to delete.', status: 500 };
                        return showApi.showError(dataJson);
                    }
                });
            } else {
                dataJson = {...dataJson, message: 'Data Vehicle not found.', status: 404 };
                return showApi.showError(dataJson);
            }
        });
    } else {
        dataJson = {...dataJson, message: 'id must be filled', status: 400 };
        return showApi.showError(dataJson);
    }

};

module.exports = { getVehicles, getVehicle, getDataVehiclesByCategory, insertVehicle, insertVehicleAsync, updateVehicle, updateVehicleAsync, updatePatchVehicle, deleteVehicle };