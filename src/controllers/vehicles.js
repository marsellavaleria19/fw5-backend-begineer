/* eslint-disable no-unused-vars */
const vehicleModel = require('../models/vehicles');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const upload = require('../helpers/upload').single('photo');
const fs = require('fs');
const auth = require('../helpers/auth');
const pagination = require('../helpers/pagination');
const {cloudFileName} = require('../helpers/convertFile');
const {deleteImage} = require('../helpers/fileHandler');
const popularModel = require('../models/popularVehicle');
const {APP_URL, ENVIRONMENT } = process.env;

const getVehicles = (req, res) => {
    let { search, month, location, page, limit, sort, order } = req.query;
    console.log(month);
    sort = sort || 'v.createdAt';
    search = search || '';
    page = ((page != null && page !== '') ? parseInt(page) : 1);
    limit = ((limit != null && limit !== '') ? parseInt(limit) : 10);
    order = order || 'desc';
    let pagination = { page, limit };
    let dataJson = { response: res, message: '' };
    var filledFilter = ["location", "month", "category_id", "payment_id"];
    var searchParam = "";
    var filter = {};
    var route = ``;
    if (search == '') {
        route = `vehicles`;
    } else {
        route = `vehicles?search=${search}`;
    }
    filledFilter.forEach((item) => {
        if (req.query[item]) {
            filter[item] = req.query[item];
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
        vehicleModel.getDataVehicles(data, results => {
            if (results.length > 0) {
                vehicleModel.countDataVehicles(data, (count) => {
                    const { total } = count[0];
                    pagination = {...pagination, total: total, route: `${route}&limit=${limit}` };
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

const getVehiclesAsync = async(req, res) => {
    try{
        let { name, page, limit, sort, order} = req.query;
        name = name || '';
        page = ((page != null && page !== '') ? page : '1');
        limit = ((limit != null && limit !== '') ? limit : '5');
        let dataPages = { page, limit };
        let requirement = {page:'number',limit:'number'};
        var filledFilter = ["name","category_id","isAvailable",'location_id'];
        let validate = await validation.validation(dataPages,requirement);
        if (Object.keys(validate).length == 0) {
            dataPages.route = "vehicles";
            dataPages.page = parseInt(dataPages.page);
            dataPages.limit = parseInt(dataPages.limit);
            dataPages = pagination.pagination(req.query,dataPages,filledFilter,sort,order);
            let data = {name,filter:dataPages.filter,dataPages};
            const dataVehicle = await vehicleModel.getDataVehiclesAsync(data);
            if (dataVehicle.length > 0) {
                dataVehicle.map((item)=>{
                    if(item.photo!==null){
                        if(!item.photo.includes('https')){
                            item.photo = `${APP_URL}/${item.photo}`;
                        }
                    }
                });
                const count = await vehicleModel.countDataVehiclesAsync(data);
                const { total } = count[0];
                dataPages = {...dataPages, total: total};
                return showApi.showResponse(res,"List Data Vehicle",dataVehicle,dataPages);
            } else {
                return showApi.showResponse(res,"Data Vehicle not found",null,null,null,404);
            }
        } else {
            return showApi.showResponse(res,"Pagination not valid",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500);
    }
};

const getDataVehiclesByCategory = (req, res) => {
    let { search, page, limit, sort, order } = req.query;
    page = ((page != null && page !== '') ? parseInt(page) : 1);
    limit = ((limit != null && limit !== '') ? parseInt(limit) : 10);
    const offset = (page - 1) * limit;
    const data = { search, limit, offset, sort, order };
    const { id } = req.params;
    order = order || 'desc';
    let pagination = { page, limit };
    let dataJson = { response: res, message: '' };
    vehicleModel.getDataVehiclesByCategory(data, id, (results) => {
        vehicleModel.countDataVehiclesByCategory(id, (count) => {
            const { total } = count[0];
            pagination = {...pagination, total: total, route: `vehicles/category/${id}?limit=${limit}` };
            dataJson = {...dataJson, message: 'List Data Vehicles by category.', result: results, pagination };
            return showApi.showSuccessWithPagination(dataJson, pagination);
        });
    });
};

const getDataVehiclesByCategoryAsync = async (req, res) => {
    try{
        const { id } = req.params;
        const data = {
            id : id
        };

        const requirement = {
            id : 'required|number'
        };
        const validateId = await validation.validation(data,requirement);
        if(Object.keys(validateId).length == 0){
            let { name, page, limit, sort, order} = req.query;
            name = name || '';
            page = ((page != null && page !== '') ? page : '1');
            limit = ((limit != null && limit !== '') ? limit : '5');
            let dataPages = { page, limit };
            let requirement = {page:'number',limit:'number'};
            var filledFilter = ["name","isAvailable",'location_id'];
            let validate = await validation.validation(dataPages,requirement);
   
            if(Object.keys(validate).length == 0){
                dataPages.route = `vehicles/category/${id}`;
                dataPages.page = parseInt(dataPages.page);
                dataPages.limit = parseInt(dataPages.limit);
                dataPages = pagination.pagination(req.query,dataPages,filledFilter,sort,order);
                let data = {name,filter:dataPages.filter,dataPages};
                const listVehicleCategory = await vehicleModel.getDataVehiclesByCategoryAsync(data, id);
                if(listVehicleCategory.length > 0){
                    listVehicleCategory.map((item)=>{
                        if(item.photo!==null){
                            if(!item.photo.includes('https')){
                                item.photo = `${APP_URL}/${item.photo}`;
                            }
                        }
                    });
                    const count  = await vehicleModel.countDataVehiclesByCategoryAsync(data,id);
                    const { total } = count[0];
                    dataPages = {...dataPages,total};
                    return showApi.showResponse(res,"List data vehicle by category",listVehicleCategory,dataPages);
                }else{
                    return showApi.showResponse(res,"Data not found",null,null,null,404);
                }
            }else{
                return showApi.showResponse(res,"Pagination not valid",null,null,validate,400); 
            }
        }else{
            return showApi.showResponse(res,"Id category not valid",null,null,validateId,400); 
        }
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500); 
    }
};

const getPopularVehicle = async (request, response) => {
    let dataJson = { response: response, message: '' };
    let { search, page, limit, sort, order } = request.query;
    search = search|| '';
    page = ((page != null && page !== '') ? page : '1');
    limit = ((limit != null && limit !== '') ? limit : '5');
    let dataPages = { page, limit };
    let requirement = {page:'number',limit:'number'};
    let validate = await validation.validation(dataPages,requirement);

    if (Object.keys(validate).length == 0) {
        dataPages.route = `vehicles/popular`;
        dataPages.page = parseInt(dataPages.page);
        dataPages.limit = parseInt(dataPages.limit);
        dataPages = pagination.pagination(null,dataPages,null,sort,order);
        let data = {search,filter:dataPages.filter,dataPages};
        var results = await popularModel.getDataPopularVehicleAsync(data);
        if (results.length > 0) {
            results.map((item)=>{
                if(item.photo!==null){
                    if(!item.photo.includes('https')){
                        item.photo = `${APP_URL}/${item.photo}`;
                    }
                }
            });
            const count  = await popularModel.countDataPopularVehicleAsync(data);
            const { total } = count[0];
            dataPages = {...dataPages,total};
            // dataJson = {...dataJson, message: 'List Data Popular.', result: results, pagination };
            return showApi.showResponse(response,"List data popular vehicle",results,dataPages);
        } else {
            // dataJson = {...dataJson, message: 'Data Popular not found.', status: 404 };
            return showApi.showResponse(response,"Data popular not found.",null,null,null,404);
        }
    } else {
        //  dataJson = {...dataJson, message: 'Pagination not valid.', status: 400, error: validation.validationPagination(pagination) };
        return showApi.showResponse(response,"Pagination not valid",null,null,validate,400);
    }

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

const getVehicleAsync = async(req, res) => {
    try{
      
        const { id } = req.params;
        const data = {
            id : id
        };

        const requirement = {
            id : 'required|number'
        };

        const validate = await validation.validation(data,requirement);
        if(Object.keys(validate).length == 0){
            const results = await vehicleModel.getDataVehicleAsync(id);
            if (results.length > 0) {
                if(results[0].photo!==null){
                    if(!results[0].photo.includes('https')){
                        results[0].photo = `${APP_URL}/${results[0].photo}`;
                    }
                }
                return showApi.showResponse(res,"Detail Vehicle",results);            
            } else {
                return showApi.showResponse(res,"Detail vehicle not found",null,null,null,404);
            }
        }else{
            return showApi.showResponse(res,"Detail vehicle not valid.",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,400);
    }
    
  
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

const insertVehicleAsync = async(request, response) => {
    try{
        const count = await vehicleModel.countAllDataVehiclesAsync();
        request.fileUpload = "vehicle";
        upload(request, response, async function(errorUpload) {
            auth.verifyAdmin(request, response, async(error) => {
                const data = {
                    name: request.body.name,
                    category_id: request.body.category_id,
                    location_id: request.body.location_id,
                    price: request.body.price,
                    qty: request.body.qty,
                    isAvailable: request.body.isAvailable,
                    description : request.body.description,
                };
                
                const requirement = {
                    name: 'required',
                    category_id: 'required|number|checkCategory',
                    location_id: 'required|number|checkLocation',
                    price: 'required|number|grather0',
                    qty: 'required|number|grather0',
                    isAvailable: 'required|number',
                    description : 'required',
                };

                var validate = await validation.validation(data,requirement);
                if (request.file) {
                    var photoTemp = request.file.path;
                    data.photo = photoTemp.replace("\\", "/");
                }
                if (errorUpload) {
                    validate = {...validate,photo: errorUpload.message };
                }

                if (Object.keys(validate).length == 0) {
                    const insertVehicle = await vehicleModel.insertDataVehicleAsync(data);
                    if (insertVehicle.affectedRows > 0) {
                        const result = await vehicleModel.getDataVehicleAsync(insertVehicle.insertId);
                        if(result[0].photo!==null){
                            if(!result[0].photo.includes('https')){
                                result[0].photo = `${APP_URL}/${result[0].photo}`;
                            }
                        }
                        return showApi.showResponse(response,"Data vehicle created successfully.",result[0]);
                    }else{
                        return showApi.showResponse(response,"Data vehicle failed to create.",null,null,null,500);
                    }
                } else {
                    return showApi.showResponse(response,"Data vehicle was not valid.",null,null,validate,400);
                }
            });
        });
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
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
    req.fileUpload = "vehicle";
    try{
        upload(req, res, async(errorUpload) => {
            auth.verifyAdmin(req, res, async(error) => {
                const { id } = req.params;
                const dataId = {
                    id : id
                };

                const requirementId = {
                    id:'required|number'
                };

                const validateId = await validation.validation(dataId,requirementId);
                if (Object.keys(validateId).length ==0) {
                    const resultDataVehicle = await vehicleModel.getDataVehicleAsync(id);
                    if (resultDataVehicle.length > 0) {
                        const data = {
                            name: req.body.name,
                            category_id: req.body.category_id,
                            location_id: req.body.location_id,
                            price: req.body.price,
                            qty: req.body.qty,
                            isAvailable: req.body.isAvailable,
                            description : req.body.description,
                        };
                 
                        const requirement = {
                            name: 'required',
                            category_id: 'required|number|checkCategory',
                            location_id: 'required|number|checkLocation',
                            price: 'required|number|grather0',
                            qty: 'required|number|grather0',
                            isAvailable: 'required|number',
                            description : 'required',
                        };
                        var validate = await validation.validation(data,requirement);
                        if (req.file) {
                            var photoTemp = req.file.path;
                            data.photo = photoTemp.replace("\\", "/");
                        }
                        if (error) {
                            validate = {...validate, photo: errorUpload.message };
                        }
 
                        if (Object.keys(validate).length == 0) {
                            const update = await vehicleModel.updateDataVehicleAsync(id, data);
                            if (update.affectedRows > 0) {
                                const result = await vehicleModel.getDataVehicleAsync(id);
                                if(result[0].photo!==null){
                                    if(!result[0].photo.includes('https')){
                                        result[0].photo = `${APP_URL}/${result[0].photo}`;
                                    }
                                }
                                return showApi.showResponse(res,"Data vehicle updated successfully.",result[0]);  
                            }
                            else {
                                return showApi.showResponse(res,"Data vehicle failed to update.",null,null,null,500);
                            }
                        } else {
                            return showApi.showResponse(res,"Data vehicle not valid.",null,null,validate,400);
                        }
                    }else{
                        return showApi.showResponse(res,"Data vehicle not found.",null,null,null,404);
                    }
                } else {
                    return showApi.showResponse(res,"Id not valid",null,null,validateId,400);
                }
            });
        });
    }
    catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500);
    }
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

const updatePatchVehicleAsync = (req, res) => {
    try{
        req.fileUpload = "vehicle";
        upload(req, res, (errorUpload) => {
            auth.verifyAdmin(req, res, async(error) => {
                const { id } = req.params;
                
                const dataId = {
                    id : id
                };

                const requirementId = {
                    id:'required|number'
                };

                const validateId = await validation.validation(dataId,requirementId);
                if (Object.keys(validateId).length == 0) {
                    const dataVehicle = await vehicleModel.getDataVehicleAsync(id);
                    console.log(dataVehicle);
                    if (dataVehicle.length > 0) {
                        var data = {};
                        var filled = ['name', 'category_id', 'location_id', 'price', 'qty', 'isAvailable'];
                        var requirement = {};
                        filled.forEach((value) => {
                            if (req.body[value]) {
                                data[value] = req.body[value];
                                if(value=="category_id"){
                                    requirement[value] = 'number|checkCategory';
                                }
                                if(value=="location_id"){
                                    requirement[value] = 'number|checkLocation';
                                }
                                if(value=='price' || value=='qty'||value=='isAvailable'){
                                    requirement[value] = 'number|grather0';
                                }
                            }
                            if(req.file){
                                var photoTemp = req.file.path;
                                data["photo"] = photoTemp.replace("\\", "/");
                            }
                        });
                        console.log(requirement);
                        console.log(data);
                        var validate = await validation.validation(data,requirement);
                        if (errorUpload) {
                            validate = {...validate,photo: errorUpload.message };
                        }
                        if(Object.keys(validate).length==0){
                            const update = await vehicleModel.updateDataVehicleAsync(id, data);
                            if (update.affectedRows > 0) {
                                const result = await vehicleModel.getDataVehicleAsync(id);
                                if(result[0].photo!==null){
                                    if(!result[0].photo.includes('https')){
                                        result[0].photo = `${APP_URL}/${result[0].photo}`;
                                    }
                                }
                                return showApi.showResponse(res,"Data vehicle updated suceessfully.",result[0]);
                            } else {
                                return showApi.showResponse(res,"Data vehicle failed to update",null,null,null,500);
                            }
                        }else{
                            return showApi.showResponse(res,"Data vehicle not valid.",null,null,validate,400);
                        }
                      
                    } else {
                        return showApi.showResponse(res,"Data vehicle not found.",null,null,null,400);
                    }
                } else {
                    return showApi.showResponse(res,"Id vehicle not valid",null,null,validateId,400);
                }
            });
        });
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500);
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

const deleteVehicleAsync = async(req, res) => {
    try{
        upload(req, res, async(errorUpload) => {
            auth.verifyAdmin(req, res, async(error) => {
                const { id } = req.params;
                const dataId = {
                    id : id
                };

                const requirementId = {
                    id:'required|number'
                };

                const validateId = await validation.validation(dataId,requirementId);

                if (Object.keys(validateId).length == 0) {
                    const resultDataVehicle = await vehicleModel.getDataVehicleAsync(id);
                    if (resultDataVehicle.length > 0) {
                        if(resultDataVehicle[0].photo!==null){
                            if(ENVIRONMENT=="production"){
                                const fileName = cloudFileName(resultDataVehicle[0].photo);
                                await deleteImage(fileName);
                            }else{
                                fs.rm(resultDataVehicle[0].photo, {}, function(err) {
                                    if (err) {
                                        return res.status(500).json({
                                            success: false,
                                            message: 'File not found'
                                        });
                                    }
 
                                });
                            }
                        }
                        
                        const deleteVehicle = await vehicleModel.deleteDataVehicleAsync(id);
                        if (deleteVehicle.affectedRows > 0) {
                            return showApi.showResponse(res,"Data vehicle deleted successfully.");
                        }else{
                            return showApi.showResponse(res,"Data vehicle failed to delete",null,null,null,500);
                        }
                    } else {
                        return showApi.showResponse(res,"Data vehicle not found.",null,null,null,404);
                    }
                } else {
                    return showApi.showResponse(res,"Id vehicle not valid.",null,null,validateId,400);
                }
            });
        });
    }catch(error){
        return showApi.showResponse(res,"Id vehicle not valid.",null,null,null,500);
    }


};

module.exports = { getVehicles,getVehiclesAsync,getVehicle,getVehicleAsync, getDataVehiclesByCategory,getDataVehiclesByCategoryAsync, getPopularVehicle, insertVehicle, insertVehicleAsync, updateVehicle, updateVehicleAsync, updatePatchVehicle, updatePatchVehicleAsync, deleteVehicle, deleteVehicleAsync };