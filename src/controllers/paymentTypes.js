
const paymentTypeModel = require('../models/paymentTypes');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const pagination = require('../helpers/pagination');

const getPaymentTypes = async(request, response) => {
    try{
        let { search, page, limit, sort, order } = request.query;
        search = search || '';
        page = ((page != null && page !== '') ? page : '1');
        limit = ((limit != null && limit !== '') ? limit : '5');
        let dataPages = { page, limit };
        let requirement = {page:'number',limit:'number'};
        let validate = await validation.validation(dataPages,requirement);
        if (Object.keys(validate).length== 0) {
            dataPages.route = "payment-types";
            dataPages.page = parseInt(dataPages.page);
            dataPages.limit = parseInt(dataPages.limit);
            dataPages = pagination.pagination(null,dataPages,null,sort,order);
            let data = {search,dataPages};
            const results = await paymentTypeModel.getDataPaymentTypes(data);
            if (results.length > 0) {
                const totalListPaymentTypes = await paymentTypeModel.countDataPaymentTypes(data);
                const { total } = totalListPaymentTypes[0];
                dataPages = {...dataPages, total: total};
                return showApi.showResponse(response,"List data payment types",results,dataPages);
            } else {
                return showApi.showResponse(response,"Data payment types not found",null,null,null,404);
            }
      
        } else {
            return showApi.showResponse(response,"Pagination was not valid",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
  
};

const getPaymentType = async(request, response) => {
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
            const result = await paymentTypeModel.getDataPaymentType(id);
            if (result.length > 0) {
                return showApi.showResponse(response,"Detail data payment type.",result[0]);
            } else {
                return showApi.showResponse(response,"Data payment type not found. ",null,null,null,404);
            }
        }else{
            return showApi.showResponse(response,"Id was not valid",null,null,validate,400);
        }
      
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
    
};

const addCheckPaymentTypeName = async(data,validate,id=null)=>{
    var result = {}; 
    if(Object.keys(data).length > 0){
        if(!validate.payment && data.payment){
            const dataPayment = await paymentTypeModel.getDataPaymentTypeByPaymentType(data.payment,id);
            if(dataPayment.length > 0){
                result.paymentT = "payment type has already used.";
            }
        }
    }
    return result;
};

const insertPaymentType = async(request, response) => {
    try{
        const payment = request.body.payment;
        const data = {payment:payment};
        const requirement = {payment:'required'};

        var validate = await validation.validation(data,requirement);
        validate = {...validate,...await addCheckPaymentTypeName(data,validate)};

        if (Object.keys(validate).length == 0) {
            const insert = await paymentTypeModel.insertDataPaymentType(data.payment);
            if (insert.affectedRows > 0) {
                const results =  await paymentTypeModel.getDataPaymentType(insert.insertId);
                return showApi.showResponse(response,"Data payment type created successfully",results[0]);
            } else {
                return showApi.showResponse(response,"Data payment type failed to create.",null,null,null,500);
            }
        } else {
            return showApi.showResponse(response,"Data payment type not valid!",null,null,validate,400);
        }
    }catch(err){
        return showApi.showResponse(response,err.message,null,null,null,500);
    } 
};

const updatePaymentType = async(request, response) => {
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
                payment: request.body.payment
            };
            const requirement = {
                payment : 'required'
            };

            let validate = await validation.validation(data,requirement);
            validate ={...validate,...await addCheckPaymentTypeName(data,validate,id)};

            const resultDataLocatiom = await paymentTypeModel.getDataPaymentType(id);
            if (resultDataLocatiom.length > 0) {
                if(Object.keys(validate).length == 0){
                    const update = await paymentTypeModel.updateDataPaymentType(id,data.payment);
                    if (update.affectedRows > 0) {
                        const result = await paymentTypeModel.getDataPaymentType(id);
                        return showApi.showResponse(response,"Data payment type updated successfully",result[0]);
                    } else {
                        return showApi.showResponse(response,"Data payment type failed to update",null,null,null,500);
                    }
                }else{
                    return showApi.showResponse(response,"Data payment type not valid",null,null,validate,400);
                }
            }else{
                return showApi.showResponse(response,"Data payment type not found",null,null,null,404);
            }    
        } else {
            return showApi.showResponse(response,"Id not valid",null,null,validateId,400);
        }
    }
    catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
    
};

const deletePaymentType = async(request, response) => {
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
            const resultDataPaymentType = await paymentTypeModel.getDataPaymentType(id);
            if (resultDataPaymentType.length > 0) {
                const result = await paymentTypeModel.deleteDataPaymentTypes(id);
                if (result.affectedRows > 0) {
                    return showApi.showResponse(response,'Data payment type deleted successfully.');
                } else {
                    return showApi.showResponse(response,'Data payment type faliled to delete',null,null,null,500);
                }
            } else {
                return showApi.showResponse(response,"Data payment type not found",null,null,null,404);
            }
        } else {
            return showApi.showResponse(response,"Id not valid",null,null,validateId,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
};


module.exports = {getPaymentTypes,getPaymentType,insertPaymentType,updatePaymentType,deletePaymentType};