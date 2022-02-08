/* eslint-disable no-unused-vars */
const categoryModel = require('../models/categories');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');

const getCategories = (request, response) => {
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
        categoryModel.getDataCategories(data, results => {
            if (results.length > 0) {
                categoryModel.countDataCategories(data, (count) => {
                    const { total } = count[0];
                    pagination = {...pagination, total: total, route: 'categories' };
                    dataJson = {...dataJson, message: 'List Data Category.', result: results, pagination };
                    return showApi.showSuccessWithPagination(dataJson, pagination);
                });
            } else {
                dataJson = {...dataJson, message: 'Data Category not found.', status: 404 };
                return showApi.showError(dataJson);
            }
        });

    } else {
        dataJson = { response: response, message: 'Pagination was not valid.', error: validation.validationPagination(pagination), status: 400 };
        showApi.showError(dataJson);
    }

};

const getCategory = (request, response) => {
    const { id } = request.params;
    let dataJson = {
        response: response,
        message: ''
    };
    categoryModel.getDataCategory(id, (result) => {
        if (result.length > 0) {
            dataJson = {...dataJson, message: 'Detail data category.', result: result[0] };
            return showApi.showSuccess(dataJson);
        } else {
            dataJson = {...dataJson, message: 'Data category not found', status: 404 };
            return showApi.showError(dataJson);
        }
    });
};

const insertCategory = (request, response) => {
    const name = request.body.name;
    let dataJson = {
        response: response,
        message: ''
    };
    if (validation.validationName(name) == null) {
        categoryModel.getDataCategoriesByName(name, null, (resultDataCategory) => {
            if (resultDataCategory.length == 0) {
                categoryModel.insertDataCategory(name, (result) => {
                    if (result.affectedRows > 0) {
                        dataJson = {...dataJson, message: 'Data category created successfully.', result: { name: name } };
                        return showApi.showSuccess(dataJson);
                    } else {
                        dataJson = {...dataJson, message: 'Data category failed to create', status: 500 };
                        return showApi.showError(dataJson);
                    }

                });
            } else {
                dataJson = {...dataJson, message: 'Name has already used.' };
                return showApi.showError(dataJson);
            }
        });
    } else {
        dataJson = {...dataJson, message: 'Data category not valid.', status: 400, error: validation.validationName(name) };
        return showApi.showError(dataJson);
    }
};

const updateCategory = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    if (id !== ' ') {
        const data = {
            id: parseInt(id),
            name: request.body.name
        };
        categoryModel.getDataCategory(id, (resultDataCategories) => {
            if (resultDataCategories.length > 0) {
                if (validation.validationName(data.name) == null) {
                    categoryModel.getDataCategoriesByName(data.name, id, (resultDataCategory) => {
                        if (resultDataCategory.length == 0) {
                            categoryModel.updateDataCategory(id, data.name, (result) => {
                                if (result.affectedRows > 0) {
                                    dataJson = {...dataJson, message: 'Data category updated successfully', data };
                                    return showApi.showSuccess(dataJson);
                                } else {
                                    dataJson = {...dataJson, message: 'Data category failed to update', status: 500 };
                                    return showApi.showError(dataJson);
                                }
                            });
                        } else {
                            dataJson = {...dataJson, message: 'Name has already used', status: 400 };
                            return showApi.showError(dataJson);
                        }
                    });

                } else {
                    dataJson = {...dataJson, message: 'Data category not valid.', status: 400, error: validation.validationName(data) };
                    return showApi.showError(dataJson);
                }
            } else {
                dataJson = {...dataJson, message: 'Data category not found', status: 404 };
                return showApi.showError(dataJson);
            }
        });
    } else {
        dataJson = {...dataJson, message: 'Data category not found', status: 400 };
        return showApi.showError(dataJson);
    }

};

const deleteCategory = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    if (id !== ' ') {
        categoryModel.getDataCategory(id, (resultDataCategory) => {
            if (resultDataCategory.length > 0) {
                categoryModel.deleteDataCategory(id, (result) => {
                    if (result.affectedRows > 0) {
                        dataJson = {...dataJson, message: 'Data category deleted successfully.', results: resultDataCategory };
                        return showApi.showSuccess(dataJson);
                    } else {
                        dataJson = {...dataJson, message: 'Data cetegory failed to delete', status: 500 };
                        return showApi.showError(dataJson);
                    }
                });
            } else {
                dataJson = {...dataJson, message: 'Data cetegory not found', status: 404 };
                return showApi.showError(dataJson);
            }
        });
    } else {
        dataJson = {...dataJson, message: 'Id must be filled', status: 400 };
        return showApi.showError(dataJson);
    }

};

module.exports = { getCategories, getCategory, insertCategory, updateCategory, deleteCategory };