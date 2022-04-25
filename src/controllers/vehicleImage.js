/* eslint-disable no-unused-vars */
const vehicleModel = require('../models/vehicles');
const vehicleImageModel = require('../models/vehicleImage');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const upload = require('../helpers/upload').single('photo');
const fs = require('fs');
const auth = require('../helpers/auth');
const pagination = require('../helpers/pagination');
const {cloudFileName} = require('../helpers/convertFile');
const {deleteImage} = require('../helpers/fileHandler');
const {APP_URL, ENVIRONMENT } = process.env;

const getVehicleImages = async(req, res) => {
    try{
        let { name, page, limit, sort, order} = req.query;
        name = name || '';
        page = ((page != null && page !== '') ? page : '1');
        limit = ((limit != null && limit !== '') ? limit : '5');
        let dataPages = { page, limit };
        let requirement = {page:'number',limit:'number'};
        var filledFilter = ['vehicle_id'];
        let validate = await validation.validation(dataPages,requirement);
        if (Object.keys(validate).length == 0) {
            dataPages.route = "vehicle-images";
            dataPages.page = parseInt(dataPages.page);
            dataPages.limit = parseInt(dataPages.limit);
            dataPages = pagination.pagination(req.query,dataPages,filledFilter,sort,order);
            let data = {name,filter:dataPages.filter,dataPages};
            const listVehicleImage = await vehicleImageModel.getDataVehicleImages(data);
            if (listVehicleImage.length > 0) {
                listVehicleImage.map((item)=>{
                    if(item.photo!==null){
                        if(!item.photo.includes('https')){
                            item.photo = `${APP_URL}/${item.photo}`;
                        }
                    }
                });
                const count = await vehicleImageModel.countDataVehicleImages(data);
                const { total } = count[0];
                dataPages = {...dataPages, total: total};
                return showApi.showResponse(res,"List Data Vehicle Image",listVehicleImage,dataPages);
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

const getVehicleImagesByVehicleId = async (req, res) => {
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
            let validate = await validation.validation(dataPages,requirement);
   
            if(Object.keys(validate).length == 0){
                dataPages.route = `vehicle-images/vehicle/${id}`;
                dataPages.page = parseInt(dataPages.page);
                dataPages.limit = parseInt(dataPages.limit);
                dataPages = pagination.pagination(req.query,dataPages,null,sort,order);
                let data = {name,filter:dataPages.filter,dataPages};
                const listVehiclemage = await vehicleImageModel.getDataVehicleImagesByVehicleId(data, id);
                if(listVehiclemage.length > 0){
                    listVehiclemage.map((item)=>{
                        if(item.photo!==null){
                            if(!item.photo.includes('https')){
                                item.photo = `${APP_URL}/${item.photo}`;
                            }
                        }
                    });
                    const count  = await vehicleImageModel.countDataVehicleImageByVehicleId(data,id);
                    const { total } = count[0];
                    dataPages = {...dataPages,total};
                    return showApi.showResponse(res,"List data vehicle image by vehicle id",listVehiclemage,dataPages);
                }else{
                    return showApi.showResponse(res,"Data not found",null,null,null,404);
                }
            }else{
                return showApi.showResponse(res,"Pagination not valid",null,null,validate,400); 
            }
        }else{
            return showApi.showResponse(res,"Id vehicle not valid",null,null,validateId,400); 
        }
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500); 
    }
};

const getVehicleImage = async(req, res) => {
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
            const results = await vehicleImageModel.getDataVehicleImage(id);
            if (results.length > 0) {
                if(results[0].photo!==null){
                    if(!results[0].photo.includes('https')){
                        results[0].photo = `${APP_URL}/${results[0].photo}`;
                    }
                }
                return showApi.showResponse(res,"Detail Vehicle Image",results[0]);            
            } else {
                return showApi.showResponse(res,"Detail vehicle image not found",null,null,null,404);
            }
        }else{
            return showApi.showResponse(res,"Detail vehicle image not valid.",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,400);
    }  
};

const insertVehicleImage = async(request, response) => {
    try{
        request.fileUpload = "vehicle";
        upload(request, response, async function(errorUpload) {
            auth.verifyAdmin(request, response, async(error) => {
                console.log(request.file);
                const data = {
                    vehicle_id: request.body.vehicle_id,
                };
                const requirement = {
                    vehicle_id: 'required|number|checkVehicle',
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
                    const dataVehicleImage = await vehicleImageModel.checkPhotoPrimary(data.vehicle_id);
                    if(dataVehicleImage.length > 0){
                        await vehicleImageModel.updateDataVehicleImage(dataVehicleImage[0].id,{isPrimary:0});
                    }
                    data.isPrimary = 1;
                    const insertVehicleImage = await vehicleImageModel.insertDataVehicleImage(data);
                    if (insertVehicleImage.affectedRows > 0) {
                        const result = await vehicleImageModel.getDataVehicleImage(insertVehicleImage.insertId);
                        if(result[0].photo!==null){
                            if(!result[0].photo.includes('https')){
                                result[0].photo = `${APP_URL}/${result[0].photo}`;
                            }
                        }
                        return showApi.showResponse(response,"Data vehicle image created successfully.",result[0]);
                    }else{
                        return showApi.showResponse(response,"Data vehicle image failed to create.",null,null,null,500);
                    }
                } else {
                    return showApi.showResponse(response,"Data vehicle image was not valid.",null,null,validate,400);
                }
            });
        });
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
};
  
const updateVehicleImage = (req, res) => {
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
                    const resultDataVehicle = await vehicleImageModel.getDataVehicleImage(id);
                    if (resultDataVehicle.length > 0) {
                        const data = {
                            vehicle_id: req.body.vehicle_id,
                        };
                 
                        const requirement = {
                            vehicle_id: 'required|number|checkVehicle',
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
                            if(data.isPrimary){
                                if(data.isPrimary=='1'){
                                    const dataVehicleImage = await vehicleImageModel.checkPhotoPrimary(data.vehicle_id);
                                    if(dataVehicleImage.length > 0){
                                        await vehicleImageModel.updateDataVehicleImage(dataVehicleImage[0].id,{isPrimary:0});
                                    }
                                }
                            }
                            const update = await vehicleImageModel.updateDataVehicleImage(id, data);
                            if (update.affectedRows > 0) {
                                const result = await vehicleImageModel.getDataVehicleImage(id);
                                if(result[0].photo!==null){
                                    if(!result[0].photo.includes('https')){
                                        result[0].photo = `${APP_URL}/${result[0].photo}`;
                                    }
                                }
                                return showApi.showResponse(res,"Data vehicle image updated successfully.",result[0]);  
                            }
                            else {
                                return showApi.showResponse(res,"Data vehicle image failed to update.",null,null,null,500);
                            }
                        } else {
                            return showApi.showResponse(res,"Data vehicle image not valid.",null,null,validate,400);
                        }
                    }else{
                        return showApi.showResponse(res,"Data vehicle image not found.",null,null,null,404);
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

const updatePatchVehicleImage = (req, res) => {
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
                    const dataVehicleImage = await vehicleImageModel.getDataVehicleImage(id);
                    if (dataVehicleImage.length > 0) {
                        var data = {};
                        var filled = ['vehicle_id','isPrimary'];
                        var requirement = {};
                        filled.forEach((value) => {
                            if (req.body[value]) {
                                data[value] = req.body[value];
                                if(value=="vehicle_id"){
                                    requirement[value] = 'number|checkVehicle';
                                }

                                if(value=="isPrimary"){
                                    requirement[value] = 'number|isPrimary';
                                }
                            }
                            if(req.file){
                                var photoTemp = req.file.path;
                                data["photo"] = photoTemp.replace("\\", "/");
                            }
                        });
                        var validate = await validation.validation(data,requirement);
                        if (errorUpload) {
                            validate = {...validate,photo: errorUpload.message };
                        }
                        if(Object.keys(validate).length==0){
                            if(data.isPrimary){
                                if(data.isPrimary=='1'){
                                    const checkPrimary = await vehicleImageModel.checkPhotoPrimary(dataVehicleImage[0].vehicle_id);
                                    if(checkPrimary.length > 0){
                                        await vehicleImageModel.updateDataVehicleImage(checkPrimary[0].id,{isPrimary:0});
                                    }
                                }
                            }
                            const update = await vehicleImageModel.updateDataVehicleImage(id, data);
                            if (update.affectedRows > 0) {
                                const result = await vehicleImageModel.getDataVehicleImage(id);
                                if(result[0].photo!==null){
                                    if(!result[0].photo.includes('https')){
                                        result[0].photo = `${APP_URL}/${result[0].photo}`;
                                    }
                                }
                                return showApi.showResponse(res,"Data vehicle image updated suceessfully.",result[0]);
                            } else {
                                return showApi.showResponse(res,"Data vehicle image failed to update",null,null,null,500);
                            }
                        }else{
                            return showApi.showResponse(res,"Data vehicle image not valid.",null,null,validate,400);
                        }
                      
                    } else {
                        return showApi.showResponse(res,"Data vehicle image not found.",null,null,null,400);
                    }
                } else {
                    return showApi.showResponse(res,"Id vehicle image not valid",null,null,validateId,400);
                }
            });
        });
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500);
    }
};

const deleteVehicleImage = async(req, res) => {
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
                    const dataVehicleImage = await vehicleImageModel.getDataVehicleImage(id);
                    if (dataVehicleImage.length > 0) {
                        if(dataVehicleImage[0].photo!==null){
                            if(ENVIRONMENT=="production"){
                                const fileName = cloudFileName(dataVehicleImage[0].photo);
                                await deleteImage(fileName);
                            }else{
                                fs.rm(dataVehicleImage[0].photo, {}, function(err) {
                                    if (err) {
                                        return res.status(500).json({
                                            success: false,
                                            message: 'File not found'
                                        });
                                    }
 
                                });
                            }
                        }
                        
                        const deleteVehicleImage = await vehicleImageModel.deleteDataVehicleImage(id);
                        if (deleteVehicleImage.affectedRows > 0) {
                            return showApi.showResponse(res,"Data vehicle image deleted successfully.");
                        }else{
                            return showApi.showResponse(res,"Data vehicle image failed to delete",null,null,null,500);
                        }
                    } else {
                        return showApi.showResponse(res,"Data vehicle image not found.",null,null,null,404);
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

module.exports = { getVehicleImages,getVehicleImagesByVehicleId,getVehicleImage,insertVehicleImage,updateVehicleImage,updatePatchVehicleImage,deleteVehicleImage };