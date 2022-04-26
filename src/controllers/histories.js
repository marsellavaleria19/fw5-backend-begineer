/* eslint-disable no-unused-vars */
const historyModel = require('../models/histories');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const { request } = require('express');
const moment = require('moment');
const pagination = require('../helpers/pagination');
const validator = require('validator');
const { getDataVehicleAsync } = require('../models/vehicles');
const { getDataUserAsync } = require('../models/users');
const vehicleModel = require('../models/vehicles');
const statusModel = require('../models/status');
const userModel = require('../models/users');
const { response } = require('express');
const {APP_URL, ENVIRONMENT } = process.env;

const getHistories = (request, response) => {
    let { search, status_id, category_id, date, page, limit, sort, order, month } = request.query;
    sort = sort || 'h.id';
    search = search || '';
    page = ((page != null && page !== '') ? parseInt(page) : 1);
    limit = ((limit != null && limit !== '') ? parseInt(limit) : 5);
    var filledFilter = ["location", "category_id", "payment_id"];
    order = order || 'desc';
    var filter = {};
    var searchParam = "";
    let pagination = { page, limit };
    let dataJson = { response: response, message: '' };
    var route = ``;
    if (search == '') {
        route = `vehicles`;
    } else {
        route = `vehicles?search=${search}`;
    }
    filledFilter.forEach((item) => {
        if (request.query[item]) {
            filter[item] = request.query[item];
            if (searchParam == "") {
                searchParam += `${item}=${filter[item]}`;
            } else {
                searchParam += `&${item}=${filter[item]}`;
            }
        }
    });
    route += searchParam;

    if (validation.validationPagination(pagination) == null) {
        const offset = (page - 1) * limit;
        let data = { search, filter, limit, offset, sort, order };
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
    try{
        let { search, page, limit, sort, order, month } = request.query;
        search = search || '';
        page = ((page != null && page !== '') ? page : '1');
        limit = ((limit != null && limit !== '') ? limit : '5');
        let dataPages = { page, limit };
        let requirement = {page:'number',limit:'number'};
        var filledFilter = ["search","category_id", "payment_id","status_id","date"];
        let validate = await validation.validation(dataPages,requirement);
  
        if (Object.keys(validate).length == 0) {
            dataPages.route = "histories";
            dataPages.page = parseInt(dataPages.page);
            dataPages.limit = parseInt(dataPages.limit);
            dataPages = pagination.pagination(request.query,dataPages,filledFilter,sort,order);
            console.log(dataPages);
            let data = {search,filter:dataPages.filter,dataPages};
            let result = await historyModel.getDataHistoriesAsync(data);
            if (result.length > 0) {
                result.map((item)=>{
                    if(item.photo!==null){
                        if(!item.photo.includes('https')){
                            item.photo = `${APP_URL}/${item.photo}`;
                        }
                    }
                });
                var count = await historyModel.countDataHistoriesAsync(data);
                const { total } = count[0];
                dataPages = {...dataPages, total: total};
                return showApi.showResponse(response,"List Data Histories",result,dataPages);
            }
        } else {
            return showApi.showResponse(response,"Pagination not valid",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
};

const getHistoriesByUserIdAsync = async(request, response) => {
    try{
        const { id } = request.params;
        const dataId = {
            id : id
        };

        const requirementId = {
            id : 'required|number'
        };
        const validateId = await validation.validation(dataId,requirementId);
        if(Object.keys(validateId).length == 0){
            let { search,date, page, limit, sort, order, month } = request.query;
            search = search || '';
            page = ((page != null && page !== '') ? page : '1');
            limit = ((limit != null && limit !== '') ? limit : '5');
            let dataPages = { page, limit };
            let requirement = {page:'number',limit:'number'};
            var filledFilter = ["search","category_id", "payment_id","status_id","date"];
            let validate = await validation.validation(dataPages,requirement);
   
            if (Object.keys(validate).length == 0) {
                dataPages.route = `histories/user/${id}`;
                dataPages.page = parseInt(dataPages.page);
                dataPages.limit = parseInt(dataPages.limit);
                dataPages = pagination.pagination(request.query,dataPages,filledFilter,sort,order);
                console.log(dataPages);
                let data = {search,filter:dataPages.filter,dataPages};
                let result = await historyModel.getDataHistoriesByUserIdAsync(data,id);
                if (result.length > 0) {
                    result.map((item)=>{
                        if(item.photo!==null){
                            if(!item.photo.includes('https')){
                                item.photo = `${APP_URL}/${item.photo}`;
                            }
                        }
                    });
                    var count = await historyModel.countDataHistoriesAsync(data);
                    const { total } = count[0];
                    dataPages = {...dataPages, total: total};
                    return showApi.showResponse(response,"List Data Histories",result,dataPages);
                }else{
                    return showApi.showResponse(response,"Data history not found",null,null,null,404);
                }
            } else {
                return showApi.showResponse(response,"Pagination not valid",null,null,validate,400);
            }
        }else{
            return showApi.showResponse(response,"Id was not valid",null,null,validateId,400);
        }
  
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
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

const getHistoryAsync = async(request, response) => {
    try{
        const { id } = request.params;
        const data = {
            id : id
        };

        const requirement = {
            id : 'required|number'
        };
        const validate = await validation.validation(data,requirement);
        if (Object.keys(validate).length==0) {
            const result = await historyModel.getDataHistoryAsync(id);
            if (result.length > 0) {
                result.map((item) => {
                    item.rentStartDate = moment(item.rentStartDate).format('DD MMM YYYY');
                    item.rentEndDate = moment(item.rentEndDate).format('DD MMM YYYY');
                    return item;
                });
                return showApi.showResponse(response,"Detail Data History",result[0]);
            } else {
                return showApi.showResponse(response,"Data history not found",null,null,null,404);
            }
        } else {
            return showApi.showResponse(response,"Id was not valid",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
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

    console.log(data);

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


const addCheckRentDate = (data)=>{
    var result = {};
    if(Object.keys(data).length > 0){
        if(data.rentEndDate && data.rentStartDate){
            var dateRentStartDate = new Date(data.rentStartDate);
            var dateRentEndDate  = new Date(data.rentEndDate);
            if(dateRentEndDate < dateRentStartDate){
                result.rentEndDate = "rentEndDate must be grather than rentStartDate";
            }
        }
    }
    return result;
};

const insertHistoryAsync = async(request, response) => { 
    try{
        const data = {
            user_id: request.body.idUser,
            vehicle_id: request.body.idVehicle,
            rentStartDate: request.body.startRentDate,
            rentEndDate: request.body.endRentDate,
            prepayment: request.body.prepayment,
            status_id: request.body.status,
            qty: request.body.qty,
            idCard : request.body.idCard,
            fullname : request.body.fullname,
            mobilePhone : request.body.mobilePhone,
            emailAddress : request.body.emailAddress,
            location : request.body.location,
            payment_id : request.body.payment_id
        };

        const requirement = {
            user_id: 'required|number|checkUser',
            vehicle_id: 'required|number|checkVehicle',
            rentStartDate: 'required|date',
            rentEndDate: 'required|date',
            prepayment: 'required|number',
            status_id: 'required|number|checkStatus',
            qty: 'required|number|grather0',
            idCard : 'required|number',
            fullname : 'required',
            mobilePhone : 'required|phone',
            emailAddress : 'required|email',
            location : 'required',
            payment_id : 'required|number|checkPayment'
        };

        var validate = await validation.validation(data,requirement);
        validate = {...validate,...addCheckRentDate(data)};

        if (Object.keys(validate).length == 0) {
            data.rentStartDate = moment(data.rentStartDate).format('YYYY-MM-DD');
            data.rentEndDate = moment(data.rentEndDate).format('YYYY-MM-DD');
            let randomBookingCode = Math.round(Math.random() * (99999 - 10000) - 10000);
            if(randomBookingCode < 0){
                randomBookingCode = (randomBookingCode*-1);
            }
            data.paymentCode = randomBookingCode;
            data.bookingCode  = `RV${randomBookingCode}`;
            var insert = await historyModel.insertDataHistoryAsync(data);
            if (insert.affectedRows > 0) {
                var result = await historyModel.getDataHistoryAsync(insert.insertId);
                return showApi.showResponse(response,"Data history created successfully.",result[0]);
            } else {
                return showApi.showResponse(response,"Data history failed to create",null,null,null,500);
            }
        } else {
            return showApi.showResponse(response,"Data history not valid",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
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
            var validate = {};
            const data = {
                user_id: request.body.idUser,
                vehicle_id: request.body.idVehicle,
                rentStartDate: request.body.startRentDate,
                rentEndDate: request.body.endRentDate,
                prepayment: request.body.prepayment,
                status_id: request.body.status,
                qty: request.body.qty,
                idCard : request.body.idCard,
                fullname : request.body.fullname,
                mobilePhone : request.body.mobilePhone,
                emailAddress : request.body.emailAddress,
                location : request.body.location,
                payment_id : request.body.payment_id
            };

            const requirement = {
                user_id: 'required|number|checkUser',
                vehicle_id: 'required|number|checkVehicle',
                rentStartDate: 'required|date',
                rentEndDate: 'required|date',
                prepayment: 'required|number',
                status_id: 'required|number|checkStatus',
                qty: 'required|number|grather0',
                idCard : 'required|number',
                fullname : 'required',
                mobilePhone : 'required|phone',
                emailAddress : 'required|email',
                location : 'required',
                payment_id : 'required|number|checkPayment'
            };

            validate = await validation.validation(data,requirement);
            validate = {...validate,...addCheckRentDate(data)};
           

            const dataHistory = await historyModel.getDataHistoryAsync(id);
            if (dataHistory.length > 0) {
                if (Object.keys(validate).length == 0) {
                    const update = await historyModel.updateDataHistoryAsync(id,data);
                    if (update.affectedRows > 0) {
                        const result = await historyModel.getDataHistoryAsync(id);
                        return showApi.showResponse(response,'Data history updated successfully.',result[0]);
                    } else {
                        return showApi.showResponse(response,"Data history failed to update",null,null,null,500);
                    }
                } else {
                    return showApi.showResponse(response,"Data history is not valid",null,null,validate,400);
                }
            } else {
                return showApi.showResponse(response,"Data history not found",null,null,null,404);
            }
        } else {
            return showApi.showResponse(response,"Id not valid",null,null,validateId,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
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
    try{
        const { id } = req.params;
        const dataId = {
            id : id
        };

        var requirement = {
            id : 'required|number'
        };

        const validateId = await validation.validation(dataId,requirement);
        if (Object.keys(validateId).length==0) {
            const dataHistory = await historyModel.getDataHistoryAsync(id);
            if (dataHistory.length > 0) {
                var data = {};
                requirement = {};
                var filled = ['user_id', 'vehicle_id', 'rentStartDate', 'rentEndDate', 'prepayment', 'status_id', 'payment_id','fullname','location','mobilePhone','emailAddress','idCard','qty'];

                filled.forEach((value) => {
                    if (req.body[value]) {
                        if(value=="user_id"||value=="vehicle_id"||value=="status_id"||value=="payment_id"||value=="prepayment"){
                            requirement[value] = "number";
                        }
                        if(value=='qty'){
                            requirement[value] = "number|grather0";
                        }
                        if(value=="rentStartDate" || value=="rentEndDate"){
                            requirement[value] = 'date';
                        }
                        if(value=="status_id"){
                            requirement[value] = 'number|checkStatus';
                        }
                        if(value=="payment_id"){
                            requirement[value] = 'number|checkPayment';
                        }
                        if(value=="user_id"){
                            requirement[value] = 'number|checkUser';
                        }
                        if(value=="vehicle_id"){
                            requirement[value] = 'number|checkVehicle';
                        }
                        if(value=="mobilePhone"){
                            requirement[value] = 'phone';
                        }
                        if(value=="emailAddress"){
                            requirement[value] = 'email';
                        }
                        data[value] = req.body[value];
                    }
                });
                if(Object.keys(data).length > 0 && Object.keys(requirement).length > 0){
                    var validate = await validation.validation(data,requirement);
                    if(Object.keys(validate).length==0){
                        validate = {...validate,...addCheckRentDate(data)};
                    }else{
                        validate = {...validate,...addCheckRentDate(data)};
                    }
                }   
                if(Object.keys(validate).length==0){
                    const update = await historyModel.updateDataHistoryAsync(id, data);
                    if (update.affectedRows > 0) {
                        const result = await historyModel.getDataHistoryAsync(id);
                        return showApi.showResponse(res,"Data history updated successfully.",result[0]);
                    } else {
                        return showApi.showResponse(res,"Data history failed to update.",null,null,null,500);
                    }
                }else{
                    return showApi.showResponse(res,"Data history not valid.",null,null,validate,400);
                }
            } else {
                return showApi.showResponse(res,"Data History not found",null,null,null,404);
            }
        } else {
            return showApi.showResponse(res,"Id was not valid",null,null,validateId,400);
        }
    }
    catch(error){
        showApi.showResponse(res,error.message,null,null,null,500);
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

const deleteHistoryAsync = async(request, response) => {
    try{
        const { id } = request.params;
        let dataJson = { response: response, message: '' };
        const dataId = {
            id : id
        };

        var requirement = {
            id : 'required|number'
        };

        const validateId = await validation.validation(dataId,requirement);
        if (Object.keys(validateId).length == 0) {
            const dataHistory = await historyModel.getDataHistoryAsync(id);
            if (dataHistory.length > 0) {
                const deleteHistory = await historyModel.deleteDataHistoryAsync(id);
                if (deleteHistory.affectedRows > 0) {
                    return showApi.showResponse(response,"Data history deleted successfully");
                } else {
                    return showApi.showResponse(response,"Data history failed to delete",null,null,null,500);
                }
            } else {
                return showApi.showResponse(response,"Data history not found",null,null,null,404);
            }
        } else {
            return showApi.showResponse(response,"Id not valid",null,null,validateId,400);
        }
    }
    catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
   

};

module.exports = { getHistories,getHistoriesAsync,getHistoriesByUserIdAsync, getHistory,getHistoryAsync, insertHistory, insertHistoryAsync, updateHistory, updateHistoryAsync, updatePatchHistory, updatePatchHistoryAsync, deleteHistory,deleteHistoryAsync };