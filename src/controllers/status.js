/* eslint-disable no-unused-vars */
const statusModel = require('../models/status');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const pagination = require('../helpers/pagination');

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

const getAllStatusAsync = async(request, response) => {
    try{
        let { search, page, limit, sort, order } = request.query;
        search = search || '';
        page = ((page != null && page !== '') ? page : '1');
        limit = ((limit != null && limit !== '') ? limit : '5');
        let dataPages = { page, limit };
        let requirement = {page:'number',limit:'number'};
        let validate = await validation.validation(dataPages,requirement);
        if (Object.keys(validate).length== 0) {
            dataPages.route = "status";
            dataPages.page = parseInt(dataPages.page);
            dataPages.limit = parseInt(dataPages.limit);
            dataPages = pagination.pagination(null,dataPages,null,sort,order);
            let data = {search,dataPages};
            const results = await statusModel.getAllDataStatusAsync(data);
            if (results.length > 0) {
                const totalListStatus = await statusModel.countDataStatusAsync(data);
                const { total } = totalListStatus[0];
                dataPages = {...dataPages, total: total};
                return showApi.showResponse(response,"List Data Status",results,dataPages);
            } else {
                return showApi.showResponse(response,"Data status not found",null,null,null,404);
            }
     
        } else {
            return showApi.showResponse(response,"Pagination was not valid",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
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

const getStatusAsync = async(request, response) => {
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
            const result = await statusModel.getDataStatusAsync(id);
            if (result.length > 0) {
                return showApi.showResponse(response,"Detail status.",result[0]);
            } else {
                return showApi.showResponse(response,"Data Status not found. ",null,null,null,404);
            }
        }else{
            return showApi.showResponse(response,"Id was not valid",null,null,validate,400);
        }
     
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
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

const addCheckStatusName = async(data,validate,id=null)=>{
    var result = {}; 
    if(Object.keys(data).length > 0){
        if(!validate.status && data.status){
            const dataStatus = await statusModel.getDataStatusByStatusAsync(data.status,id);
            if(dataStatus.length > 0){
                result.status = "status has already used.";
            }
        }
    }
    return result;
};

const insertStatusAsync = async(request, response) => {
    try{
        const status = request.body.status;
        const data = {status:status};
        const requirement = {status:'required'};

        var validate = await validation.validation(data,requirement);
        validate = {...validate,...await addCheckStatusName(data,validate)};

        if (Object.keys(validate).length == 0) {
            const insert = await statusModel.insertDataStatusAsync(data.status);
            if (insert.affectedRows > 0) {
                const results =  await statusModel.getDataStatusAsync(insert.insertId);
                return showApi.showResponse(response,"Data status created successfully",results[0]);
            } else {
                return showApi.showResponse(response,"Data status failed to create.",null,null,null,500);
            }
        } else {
            return showApi.showResponse(response,"Data status not valid!",null,null,validate,400);
        }
    }catch(err){
        return showApi.showResponse(response,err.message,null,null,null,500);
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

const updateStatusAsync = async(request, response) => {
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
                status: request.body.status
            };
            const requirement = {
                status : 'required'
            };

            let validate = await validation.validation(data,requirement);
            validate ={...validate,...await addCheckStatusName(data,validate,id)};

            const resultDataLocatiom = await statusModel.getDataStatusAsync(id);
            if (resultDataLocatiom.length > 0) {
                if(Object.keys(validate).length == 0){
                    const update = await statusModel.updateDataStatusAsync(id,data.status);
                    if (update.affectedRows > 0) {
                        const result = await statusModel.getDataStatusAsync(id);
                        return showApi.showResponse(response,"Data status updated successfully",result[0]);
                    } else {
                        return showApi.showResponse(response,"Data status failed to update",null,null,null,500);
                    }
                }else{
                    return showApi.showResponse(response,"Data status not valid",null,null,validate,400);
                }
            }else{
                return showApi.showResponse(response,"Data status not found",null,null,null,404);
            }    
        } else {
            return showApi.showResponse(response,"Id not valid",null,null,validateId,400);
        }
    }
    catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
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

const deleteStatusAsync = async(request, response) => {
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
            const resultDataStatus = await statusModel.getDataStatusAsync(id);
            if (resultDataStatus.length > 0) {
                const result = await statusModel.deleteDataStatusAsync(id);
                if (result.affectedRows > 0) {
                    return showApi.showResponse(response,'Data status deleted successfully.');
                } else {
                    return showApi.showResponse(response,'Data status faliled to delete',null,null,null,500);
                }
            } else {
                return showApi.showResponse(response,"Data status not found",null,null,null,404);
            }
        } else {
            return showApi.showResponse(response,"Id not valid",null,null,validateId,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
};


module.exports = { getAllStatus,getAllStatusAsync, getStatus,getStatusAsync, insertStatus,insertStatusAsync, updateStatus,updateStatusAsync, deleteStatus,deleteStatusAsync };