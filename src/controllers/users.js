/* eslint-disable no-unused-vars */
const userModel = require('../models/users');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const argon = require('argon2');
const auth = require('../helpers/auth');
const upload = require('../helpers/upload').single('photo');
const fs = require('fs');
const pagination = require('../helpers/pagination');
const {cloudFileName} = require('../helpers/convertFile');
const {deleteImage} = require('../helpers/fileHandler');
const {APP_URL, ENVIRONMENT } = process.env;

const getUsers = (request, response) => {
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
        userModel.getDataUsers(data, (results) => {
            if (results.length > 0) {
                userModel.countDataUsers(data, (count) => {
                    const { total } = count[0];
                    pagination = {...pagination, total: total, route: 'users' };
                    dataJson = {...dataJson, message: 'List Data User.', result: results, pagination };
                    return showApi.showSuccessWithPagination(dataJson, pagination);
                });
            } else {
                dataJson = {...dataJson, message: 'Data user not found.', status: 404 };
                return showApi.showError(dataJson);
            }
        });

    } else {
        dataJson = { response: response, message: 'Pagination was not valid.', error: validation.validationPagination(pagination), status: 400 };
        showApi.showError(dataJson);
    }
};


const getUsersAsync = async(request, response) => {
    try{
        let { name, page, limit, sort, order} = request.query;
        name = name || '';
        page = ((page != null && page !== '') ? page : '1');
        limit = ((limit != null && limit !== '') ? limit : '5');
        let dataPages = { page, limit };
        let requirement = {page:'number',limit:'number'};
        var filledFilter = ["name",'gender',"role",'isVerified','birthDate'];
        let validate = await validation.validation(dataPages,requirement);
        console.log(validate);
        if (Object.keys(validate).length == 0) {
            dataPages.route = "users";
            dataPages.page = parseInt(dataPages.page);
            dataPages.limit = parseInt(dataPages.limit);
            dataPages = pagination.pagination(request.query,dataPages,filledFilter,sort,order);
            let data = {name,filter:dataPages.filter,dataPages};
            const dataUser = await userModel.getDataUsersAsync(data);
            if (dataUser.length > 0) {
                dataUser.map((item)=>{
                    if(item.photo!==null){
                        if(!item.photo.includes('https')){
                            item.photo = `${APP_URL}/${item.photo}`;
                        }
                    }
                });
                const count = await userModel.countDataUsersAsync(data);
                const { total } = count[0];
                dataPages = {...dataPages,total:total};
                return showApi.showResponse(response,"List Data User",dataUser,dataPages);
            } else {
                return showApi.showResponse(response,"Data user not found",null,null,null,404);
            }
        } else {
            return showApi.showResponse(response,"Pagination not valid.",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
};

const getUser = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    userModel.getDataUser(id, (results) => {
        if (results.length > 0) {
            dataJson = {...dataJson, message: 'Detail user', result: results[0] };
            return showApi.showSuccess(dataJson);
        } else {
            dataJson = { response: response, message: 'Data User not found.', status: 404 };
            return showApi.showError(dataJson);
        }
    });
};

const getUserAsync = async(request, response) => {
    try{
        const { id } = request.params;
        const data = {
            id : id
        };

        const requirement = {
            id : 'required|number'
        };
        const validate = await validation.validation(data,requirement);
        if(Object.keys(validate).length == 0){
            const results = await userModel.getDataUserAsync(id);
            if (results.length > 0) {
                if(results[0].photo!==null){
                    if(!results[0].photo.includes('https')){
                        results[0].photo = `${APP_URL}/${results[0].photo}`;
                    }
                }
                return showApi.showResponse(response,"Detail User",results[0]);
            } else {
                return showApi.showResponse(response,"Data user not found",null,null,null,404);
            }
        }else{
            return showApi.showResponse(response,"Id user not valid",null,null,validate,400);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
};

const insertUser = (request, response) => {
    const data = {
        fullName: request.body.fullName,
        nickName: request.body.nickName,
        gender: request.body.gender,
        photo: request.body.photo,
        address: request.body.address,
        birthDate: request.body.birthDate,
        mobileNumber: request.body.mobileNumber,
        email: request.body.email,
        password: request.body.password
    };

    let dataJson = { response: response, message: '' };

    if (validation.validationDataUser(data) == null) {
        userModel.getDataUserEmail(data.email, null, (result) => {
            if (result.length == 0) {
                userModel.insertDataUser(data, (results) => {
                    if (results.affectedRows > 0) {
                        dataJson = {...dataJson, message: 'Data user created successfully.', result: data };
                        return showApi.showSuccess(dataJson);
                    } else {
                        dataJson = {...dataJson, message: 'Data user failed to create.', status: 500 };
                        return showApi.showError(dataJson);
                    }
                });
            } else {
                dataJson = {...dataJson, message: 'Email has already used.', status: 400 };
                return showApi.showError(dataJson);
            }
        });
    } else {
        dataJson = {...dataJson, message: 'Data user was not valid.', status: 400, error: validation.validationDataUser(data) };
        return showApi.showError(dataJson);
    }
};

const addCheckUser = async(data,validate,id)=>{
    var result = {}; 
    if(Object.keys(data).length > 0){
        if(!validate.email && data.email){
            const dataEmail = await userModel.getDataUserEmailAsync(data.email,id);
            if(dataEmail.length > 0){
                result.email = "Email has already used.";
            }
        }
   
        if(!validate.username && data.username){
            const dataUsername = await userModel.getDataUserUsernameAsync(data.username,id);
            if(dataUsername.length > 0){
                result.username = "username has already used.";
            }
        }
    }
    return result;
};

const insertUserAsync = async(request, response) => {
    try{
        request.fileUpload = "user";
        upload(request, response, (errorUpload) => {
            auth.verifyUser(request, response, async(error) => {
                const data = {
                    fullName: request.body.fullName,
                    nickName: request.body.nickName,
                    gender: request.body.gender,
                    address: request.body.address,
                    birthDate: request.body.birthDate,
                    mobileNumber: request.body.mobileNumber,
                    email: request.body.email,
                    username: request.body.username,
                    password: request.body.password,
                    role : request.body.role
                };

                const requirement = {
                    fullName: 'required',
                    nickName: 'required',
                    gender: 'required|checkGender',
                    address: 'required',
                    birthDate: 'required|date',
                    mobileNumber: 'required|phone',
                    email: 'required|email',
                    username: 'required',
                    password: 'required',
                    role : 'required|checkRole'
                };

                var validate = await validation.validation(data,requirement);
                if (request.file) {
                    data.photo = request.file.path;
                }

                if (errorUpload) {
                    validate ={...validate,photo:errorUpload.message};
                }

                if(Object.keys(validate).length==0){
                    validate = {...validate,...await addCheckUser(data,validate)};
                }else{
                    validate = {...validate,...await addCheckUser(data,validate)};
                }
            

                if (Object.keys(validate).length == 0) {
                    const hashPassword = await argon.hash(data.password);
                    data.passw;
                    const insert = await userModel.insertDataUserAsync(data);
                    if (insert.affectedRows > 0) {
                        const result = await userModel.getDataUserAsync(insert.insertId);
                        return showApi.showResponse(response,"Data user created successfully.",result[0]);
                    } else {
                        return showApi.showResponse(response,"Data user failed to create.",null,null,null,500);
                    }
                } else {
                    return showApi.showResponse(response,"Data user not valid.",null,null,validate,400);
                }
            });
        });
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }

};

const updateUser = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    if (id !== ' ') {
        const data = {
            id: parseInt(id),
            fullName: request.body.fullName,
            nickName: request.body.nickName,
            gender: request.body.gender,
            photo: request.body.photo,
            address: request.body.address,
            birthDate: request.body.birthDate,
            mobileNumber: request.body.mobileNumber,
            email: request.body.email,
            password: request.body.password
        };



        userModel.getDataUser(id, (resultDataUser) => {
            if (resultDataUser.length > 0) {
                if (validation.validationDataUser(data) == null) {
                    userModel.getDataUserEmail(data.email, id, (result) => {
                        if (result.length == 0) {
                            userModel.updateDataUser(id, data, (results) => {
                                if (results.affectedRows > 0) {
                                    dataJson = {...dataJson, message: 'Data user updated successfully.', result: data };
                                    return showApi.showSuccess(dataJson);
                                } else {
                                    dataJson = {...dataJson, message: 'Data user failed to update.', status: 500 };
                                    return showApi.showError(dataJson);
                                }
                            });
                        } else {
                            dataJson = {...dataJson, message: 'Email has already used.', status: 400 };
                            return showApi.showError(dataJson);
                        }
                    });
                } else {
                    dataJson = {...dataJson, message: 'Data user was not valid.', status: 400, error: validation.validationDataUser(data) };
                    return showApi.showError(dataJson);
                }
            } else {
                dataJson = {...dataJson, message: 'Data user not found.', status: 404 };
                return showApi.showError(dataJson);
            }
        });

    } else {
        dataJson = {...dataJson, message: 'id must be filled.', status: 400 };
        return showApi.showError(dataJson);
    }

};


const updateUserAsync = async(request, response) => {
    try{
        upload(request, response, (errorUpload) => {
            auth.verifyUser(request, response, async(error) => {
                const { id } = request.params;
                const data = {
                    id : id
                };
    
                const requirement = {
                    id : 'required|number'
                };
                const validateId = await validation.validation(data,requirement);
                if (Object.keys(validateId).length == 0) {
                    const resultDataUser = await userModel.getDataUserAsync(id);
                    if (resultDataUser.length > 0) {
                        const data = {
                            id: parseInt(id),
                            fullName: request.body.fullName,
                            nickName: request.body.nickName,
                            gender: request.body.gender,
                            photo: request.body.photo,
                            address: request.body.address,
                            birthDate: request.body.birthDate,
                            mobileNumber: request.body.mobileNumber,
                            email: request.body.email,
                            username: request.body.username,
                            password: request.body.password,
                            role:request.body.role
                        };
  
                        const requirement = {
                            fullName: 'required',
                            nickName: 'required',
                            gender: 'required|checkGender',
                            address: 'required',
                            birthDate: 'required|date',
                            mobileNumber: 'required|phone',
                            email: 'required|email',
                            username: 'required',
                            password: 'required',
                            role : 'required|checkRole'
                        };
  
                        var validate = await validation.validation(data,requirement);
                        if (request.file) {
                            data.photo = request.file.path;
                        }
                        if (errorUpload) {
                            validate = {...validate, photo: errorUpload.message };
                        }

                        validate = {...validate,...await addCheckUser(data,validate,id)};

                        if (Object.keys(validate).length == 0) {
                            const hashPassword = await argon.hash(data.password);
                            data.password = hashPassword;
                            const update = await userModel.updateDataUserAsync(id, data);
                            if (update.affectedRows > 0) {
                                const result = await userModel.getDataUserAsync(id);
                                return showApi.showResponse(response,"Data user updated successfully.",result[0]);
                            } else {
                                return showApi.showResponse(response,"Data user failed to update",null,null,null,500);
                            }
                        } else {
                            return showApi.showResponse(response,"Data user not valid.",null,null,validate,400);
                        }
                    } else {
                        return showApi.showResponse(response,"Data user not found.",null,null,null,404);
                    }
                } else {
                    return showApi.showResponse(response,"Id was not valid.",null,null,validateId,400);
                }
            });
        });
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
    
};

const updatePatchUser = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    if (id !== ' ') {
        userModel.getDataUser(id, (resultDataUser) => {
            if (resultDataUser.length > 0) {
                userModel.updateDataUser(id, request.body, (results) => {
                    if (results.affectedRows > 0) {
                        userModel.getDataUser(id, (resultDataUserUpdate) => {
                            dataJson = {...dataJson, message: 'Data User updated successfully.', result: resultDataUserUpdate };
                            return showApi.showSuccess(dataJson);
                        });

                    } else {
                        dataJson = {...dataJson, message: 'Data User failed to update.', status: 500 };
                        return showApi.showError(dataJson);
                    }
                });

            } else {
                dataJson = {...dataJson, message: 'Data user not found.', status: 400 };
                return showApi.showError(dataJson);
            }
        });

    } else {
        dataJson = {...dataJson, message: 'Id must be filled.', status: 400 };
        return showApi.showError(dataJson);
    }
};

const updatePatchUserAsync = (request, response) => {
    try{
        upload(request, response, (errorUpload) => {
            auth.verifyUser(request, response, async(error) => {
                const { id } = request.params;
                const dataId = {
                    id : id
                };
 
                const requirementId = {
                    id : 'required|number'
                };
                const validateId = await validation.validation(dataId,requirementId);
                if (Object.keys(validateId).length == 0) {
                    const dataUser = await userModel.getDataUserAsync(id);
                    if (dataUser.length > 0) {
                        var data = {};
                        var requirement = {};
                        var filled = ['fullName', 'nickName', 'gender', 'photo', 'address', 'birthDate', 'mobileNumber', 'email', 'username', 'password','role','isVerified'];
                        filled.forEach((value) => {
                            if (request.body[value]) {
                                if(value=="birthDate"){
                                    requirement[value] = 'date';
                                }
                                if(value=="gender"){
                                    requirement[value] = 'checkGender';
                                }
                                if(value=="email"){
                                    requirement[value] = 'email';
                                }
                                if(value=="mobileNumber"){
                                    requirement[value] = 'phone';
                                }
                                if(value=="role"){
                                    requirement[value] = 'checkRole';
                                }
                                if(value=="isVerified"){
                                    requirement[value] = 'number';
                                }
                                data[value] = request.body[value];
                            }
                            if (request.file) {
                                var photoTemp = request.file.path;
                                data.photo = photoTemp.replace("\\", "/");
                            }
                        });
                     
                        var validate = await validation.validation(data,requirement);
                        if(errorUpload){
                            validate = {...validate,photo:errorUpload.message};
                        }
                        validate = {...validate,...await addCheckUser(data,validate,id)};
                        if(Object.keys(validate).length == 0){
                            const update = await userModel.updateDataUserAsync(id, data);
                            if (update.affectedRows > 0) {
                                const result = await userModel.getDataUserAsync(id);
                                return showApi.showResponse(response,"Data user updated successfully.",result[0]);
  
                            } else {
                                return showApi.showResponse(response,"Data user failed to update.",null,null,null,500);
                            }
                        }else{
                            return showApi.showResponse(response,"Data user not valid",null,null,validate,400);
                        }
                    
                    } else {
                        return showApi.showResponse(response,"Data user not found.",null,null,null,400);
                    }
                } else {
                    return showApi.showResponse(response,"Id user was not valid",null,null,validateId,500);
                }
            });
        });
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
    
};


const deleteUser = (request, response) => {
    const { id } = request.params;
    let dataJson = { response: response, message: '' };
    
    if (id !== ' ') {
        userModel.getDataUser(id, (resultDataUser) => {
            if (resultDataUser.length > 0) {
                userModel.deleteDataUser(id, (results) => {
                    if (results.affectedRows > 0) {
                        dataJson = {...dataJson, message: 'Data user deleted successfully.', result: resultDataUser };
                        return showApi.showSuccess(dataJson);
                    } else {
                        dataJson = {...dataJson, message: 'Data user failed to delete.', status: 500 };
                        return showApi.showSuccess(dataJson);
                    }
                });
            } else {
                dataJson = {...dataJson, message: 'Data history not found.', status: 404 };
                return showApi.showError(dataJson);
            }
        });
    } else {
        dataJson = {...dataJson, message: 'id must filled.', status: 400 };
        return showApi.showError(dataJson);
    }
};

const deleteUserAsync = async(req, res) => {
    try{
        upload(req, res, async(errorUpload) => {
            auth.verifyUser(req, res, async(error) => {
                const { id } = req.params;
                const dataId = {
                    id : id
                };
 
                const requirementId = {
                    id : 'required|number'
                };
                const validateId = await validation.validation(dataId,requirementId);
                if (Object.keys(validateId).length == 0) {
                    const resultDataUser = await userModel.getDataUserAsync(id);
                    if (resultDataUser.length > 0) {
                        if(resultDataUser[0].photo!==null){
                            if(ENVIRONMENT=="production"){
                                const fileName = cloudFileName(resultDataUser[0].photo);
                                await deleteImage(fileName);
                            }else{
                                fs.rm(resultDataUser[0].photo, {}, function(err) {
                                    if (err) {
                                        return res.status(500).json({
                                            success: false,
                                            message: 'File not found'
                                        });
                                    }
                                });
                            }
                        }
                        const deleteUser = await userModel.deleteDataUserAsync(id);
                        if (deleteUser.affectedRows > 0) {
                            return showApi.showResponse(res,"Data user deleted successfully.");
                        }
                    } else {
                        return showApi.showResponse(res,"Data user not found.",null,null,null,404);
                    }
                } else {
                    return showApi.showResponse(res,"Id user not valid.",null,null,validateId,400);
                }
            });
        });
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500);
    }
  

};

module.exports = { getUsers,getUsersAsync, getUser,getUserAsync, insertUser, insertUserAsync, updateUser, updateUserAsync, updatePatchUser, updatePatchUserAsync, deleteUser, deleteUserAsync };