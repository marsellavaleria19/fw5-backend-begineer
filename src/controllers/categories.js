/* eslint-disable no-unused-vars */
const categoryModel = require('../models/categories');
const validation = require('../helpers/validationName');

const getCategories = (request, response) => {
    categoryModel.getDataCategories((result) => {
        return response.json({
            success: true,
            message: 'List Data Categories',
            results: result
        });
    });
};

const getCategory = (request, response) => {
    const { id } = request.params;
    categoryModel.getDataCategory(id, (result) => {
        if (result.length > 0) {
            return response.json({
                success: true,
                message: 'Detail Data Category',
                results: result[0]
            });
        } else {
            return response.status(404).json({
                success: false,
                message: 'Data Category not found'
            });
        }
    });
};

const insertCategory = (request, response) => {
    const name = request.body.name;
    if (validation.validationName(name) == null) {
        categoryModel.getDataCategoriesByName(name, null, (resultDataCategory) => {
            if (resultDataCategory.length == 0) {
                categoryModel.insertDataCategory(name, (result) => {
                    return response.json({
                        success: true,
                        message: 'Data category created successfully.',
                        results: { name: name }
                    });
                });
            } else {
                return response.status(400).json({
                    success: true,
                    message: 'Name has already used.'
                });
            }
        });
    } else {
        return response.status(400).json({
            success: false,
            message: 'Data category not valid.',
            error: validation.validationName(name)
        });
    }
};

const updateCategory = (request, response) => {
    const { id } = request.params;
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
                                    return response.json({
                                        success: true,
                                        message: 'Data category updated successfull.',
                                        results: data
                                    });
                                } else {
                                    return response.status(500).json({
                                        success: false,
                                        message: 'Data category failed to create.',
                                    });
                                }
                            });
                        } else {
                            return response.status(400).json({
                                success: true,
                                message: 'Name has already used.'
                            });
                        }
                    });

                } else {
                    return response.status(400).json({
                        success: false,
                        message: 'Data category not valid.',
                        error: validation.validationName(data)
                    });
                }
            } else {
                return response.status(404).json({
                    success: false,
                    message: 'Data category not found.',
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

const deleteCategory = (request, response) => {
    const { id } = request.params;
    if (id !== ' ') {
        categoryModel.getDataCategory(id, (resultDataCategory) => {
            if (resultDataCategory.length > 0) {
                categoryModel.deleteDataCategory(id, (result) => {
                    if (result.affectedRows > 0) {
                        return response.json({
                            success: true,
                            message: 'Data category created successfull.',
                            results: resultDataCategory
                        });
                    } else {
                        return response.status(500).json({
                            success: false,
                            message: 'Data category failed to create.',
                        });
                    }
                });
            } else {
                return response.status(404).json({
                    success: false,
                    message: 'Data category not found.',
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

module.exports = { getCategories, getCategory, insertCategory, updateCategory, deleteCategory };