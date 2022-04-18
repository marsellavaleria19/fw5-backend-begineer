/* eslint-disable no-unused-vars */
const categoryModel = require('../models/categories');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const validator = require('validator');
const pagination = require('../helpers/pagination');

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


const getCategoriesAsync = async(request, response) => {
    try{
        let { search, page, limit, sort, order } = request.query;
        search = search || '';
        page = ((page != null && page !== '') ? page : '1');
        limit = ((limit != null && limit !== '') ? limit : '5');
        let dataPages = { page, limit };
        let requirement = {page:'number',limit:'number'};
        let validate = await validation.validation(dataPages,requirement);
        if (Object.keys(validate).length== 0) {
            dataPages.route = "categories";
            dataPages.page = parseInt(dataPages.page);
            dataPages.limit = parseInt(dataPages.limit);
            dataPages = pagination.pagination(null,dataPages,null,sort,order);
            let data = {search,dataPages};
            const results = await categoryModel.getDataCategoriesAsync(data);
            if (results.length > 0) {
                const totalListCategory = await categoryModel.countDataCategoriesAsync(data);
                const { total } = totalListCategory[0];
                dataPages = {...dataPages, total: total};
                return showApi.showResponse(response,"List Data Category",results,dataPages);
            } else {
                return showApi.showResponse(response,"Data Category not found",null,null,null,404);
            }
      
        } else {
            return showApi.showResponse(response,"Pagination was not valid",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
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

const getCategoryAsync = async(request, response) => {
    try{
        const { id } = request.params;
        const data = {
            id : id
        };

        const requirement = {
            id : 'required|number'
        };

        const validate = await validation.validation(data,requirement);
        if(Object.keys(validate).length ==0){
            const result = await categoryModel.getDataCategoryAsync(id);
            if (result.length > 0) {
                // dataJson = {...dataJson, message: 'Detail data category.', result: result[0] };
                return showApi.showResponse(response,"Detail data category.",result[0]);
            } else {
                return showApi.showResponse(response,"Data category not found. ",null,null,null,404);
            }
        }else{
            return showApi.showResponse(response,"Id was not valid",null,null,validate,400);
        }
      
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
    
};

const insertCategory = (request, response) => {
    const name = request.body.name;
    console.log(name);
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

const addCheckCategoryName = async(data,validate,id=null)=>{
    var result = {}; 
    if(Object.keys(data).length > 0){
        if(!validate.name && data.name){
            const dataCategory = await categoryModel.getDataCategoriesByNameAsync(data.name,id);
            if(dataCategory.length > 0){
                result.name = "name has already used.";
            }
        }
    }
    return result;
};

const insertCategoryAsync = async(request, response) => {
    try{
        const name = request.body.name;
        const data = {name:name};
        const requirement = {name:'required'};

        var validate = await validation.validation(data,requirement);
        validate = {...validate,...await addCheckCategoryName(data,validate)};

        if (Object.keys(validate).length == 0) {
            const insert = await categoryModel.insertDataCategoryAsync(name);
            if (insert.affectedRows > 0) {
                const results =  await categoryModel.getDataCategoryAsync(insert.insertId);
                return showApi.showResponse(response,"Data category created successfully",results[0]);
            } else {
                return showApi.showResponse(response,"Data category failed to create.",null,null,null,500);
            }
        } else {
            return showApi.showResponse(response,"Data category not valid!",null,null,validate,400);
        }
    }catch(err){
        return showApi.showResponse(response,err.message,null,null,null,500);
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

const updateCategoryAsync = async(request, response) => {
    try{
        const { id } = request.params;
        const dataId = {
            id : id
        };

        const requirement = {
            id : 'required|number'
        };
        const validateId = await validation.validation(dataId,requirement);
        if (Object.keys(validateId).length == 0) {
            const data = {
                name: request.body.name
            };
            const requirement = {
                name : 'required'
            };

            let validate = await validation.validation(data,requirement);
            validate ={...validate,...await addCheckCategoryName(data,validate,id)};

            const resultDataCategory = await categoryModel.getDataCategoryAsync(id);
            if (resultDataCategory.length > 0) {
                if(Object.keys(validate).length == 0){
                    const update = await categoryModel.updateDataCategoryAsync(id, data.name);
                    if (update.affectedRows > 0) {
                        const result = await categoryModel.getDataCategoryAsync(id);
                        return showApi.showResponse(response,"Data category updated successfully",result[0]);
                    } else {
                        return showApi.showResponse(response,"Data category failed to update",null,null,null,500);
                    }
                }else{
                    return showApi.showResponse(response,"Data category not valid",null,null,validate,400);
                }
            }else{
                return showApi.showResponse(response,"Data category not found",null,null,null,404);
            }    
        } else {
            return showApi.showResponse(response,"Id must be filled",null,null,validateId,400);
        }
    }
    catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
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

const deleteCategoryAsync = async(request, response) => {
    try{
        const { id } = request.params;
        const dataId = {
            id : id
        };

        const requirement = {
            id : 'required|number'
        };

        const validateId = await validation.validation(dataId,requirement);
        if (Object.keys(validateId).length==0) {
            const resultDataCategory = await categoryModel.getDataCategoryAsync(id);
            if (resultDataCategory.length > 0) {
                const result = await categoryModel.deleteDataCategoryAsync(id);
                if (result.affectedRows > 0) {
                    return showApi.showResponse(response,'Data category deleted successfully.');
                } else {
                    return showApi.showResponse(response,'Data category faliled to delete',null,null,null,500);
                }
            } else {
                return showApi.showResponse(response,"Data category not found",null,null,null,404);
            }
        } else {
            return showApi.showResponse(response,"Id not validate",null,null,validateId,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
};

module.exports = { getCategories,getCategoriesAsync, getCategory,getCategoryAsync, insertCategory, insertCategoryAsync, updateCategory,updateCategoryAsync, deleteCategory,deleteCategoryAsync };