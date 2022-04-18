
const locationModel = require('../models/location');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const pagination = require('../helpers/pagination');

const getLocations = async(request, response) => {
    try{
        let { search, page, limit, sort, order } = request.query;
        search = search || '';
        page = ((page != null && page !== '') ? page : '1');
        limit = ((limit != null && limit !== '') ? limit : '5');
        let dataPages = { page, limit };
        let requirement = {page:'number',limit:'number'};
        let validate = await validation.validation(dataPages,requirement);
        console.log(validate);
        if (Object.keys(validate).length== 0) {
            dataPages.route = "locations";
            dataPages.page = parseInt(dataPages.page);
            dataPages.limit = parseInt(dataPages.limit);
            dataPages = pagination.pagination(null,dataPages,null,sort,order);
            let data = {search,dataPages};
            const results = await locationModel.getDataLocations(data);
            if (results.length > 0) {
                const totalListLocation = await locationModel.countDataLocations(data);
                const { total } = totalListLocation[0];
                dataPages = {...dataPages, total: total};
                return showApi.showResponse(response,"List Data Location",results,dataPages);
            } else {
                return showApi.showResponse(response,"Data Location not found",null,null,null,404);
            }
      
        } else {
            return showApi.showResponse(response,"Pagination was not valid",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
  
};

const getLocation = async(request, response) => {
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
            const result = await locationModel.getDataLocationAsync(id);
            if (result.length > 0) {
                return showApi.showResponse(response,"Detail data location.",result[0]);
            } else {
                return showApi.showResponse(response,"Data location not found. ",null,null,null,404);
            }
        }else{
            return showApi.showResponse(response,"Id was not valid",null,null,validate,400);
        }
      
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
    
};

const addCheckLocationName = async(data,validate,id=null)=>{
    var result = {}; 
    if(Object.keys(data).length > 0){
        if(!validate.location && data.location){
            const dataLocation = await locationModel.getDataLocationByLocation(data.location,id);
            if(dataLocation.length > 0){
                result.location = "location has already used.";
            }
        }
    }
    return result;
};

const insertLocation = async(request, response) => {
    try{
        const location = request.body.location;
        const data = {location:location};
        const requirement = {location:'required'};

        var validate = await validation.validation(data,requirement);
        validate = {...validate,...await addCheckLocationName(data,validate)};

        if (Object.keys(validate).length == 0) {
            const insert = await locationModel.insertDataLocation(data.location);
            if (insert.affectedRows > 0) {
                const results =  await locationModel.getDataLocationAsync(insert.insertId);
                return showApi.showResponse(response,"Data location created successfully",results[0]);
            } else {
                return showApi.showResponse(response,"Data location failed to create.",null,null,null,500);
            }
        } else {
            return showApi.showResponse(response,"Data location not valid!",null,null,validate,400);
        }
    }catch(err){
        return showApi.showResponse(response,err.message,null,null,null,500);
    } 
};

const updateLocation = async(request, response) => {
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
                location: request.body.location
            };
            const requirement = {
                location : 'required'
            };

            let validate = await validation.validation(data,requirement);
            validate ={...validate,...await addCheckLocationName(data,validate,id)};

            const resultDataLocatiom = await locationModel.getDataLocationAsync(id);
            if (resultDataLocatiom.length > 0) {
                if(Object.keys(validate).length == 0){
                    const update = await locationModel.updateDataLocation(id,data.location);
                    if (update.affectedRows > 0) {
                        const result = await locationModel.getDataLocationAsync(id);
                        return showApi.showResponse(response,"Data location updated successfully",result[0]);
                    } else {
                        return showApi.showResponse(response,"Data location failed to update",null,null,null,500);
                    }
                }else{
                    return showApi.showResponse(response,"Data location not valid",null,null,validate,400);
                }
            }else{
                return showApi.showResponse(response,"Data location not found",null,null,null,404);
            }    
        } else {
            return showApi.showResponse(response,"Id not valid",null,null,validateId,400);
        }
    }
    catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
    
};

const deleteLocation = async(request, response) => {
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
            const resultDataLocatiom = await locationModel.getDataLocationAsync(id);
            if (resultDataLocatiom.length > 0) {
                const result = await locationModel.deleteDataLocation(id);
                if (result.affectedRows > 0) {
                    return showApi.showResponse(response,'Data location deleted successfully.');
                } else {
                    return showApi.showResponse(response,'Data location faliled to delete',null,null,null,500);
                }
            } else {
                return showApi.showResponse(response,"Data location not found",null,null,null,404);
            }
        } else {
            return showApi.showResponse(response,"Id not valid",null,null,validateId,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
};

module.exports = {getLocations,getLocation,insertLocation,updateLocation,deleteLocation};