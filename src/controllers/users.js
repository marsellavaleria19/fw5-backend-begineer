/* eslint-disable no-unused-vars */
const userModel = require('../models/users');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const argon = require('argon2');
const auth = require('../helpers/auth');
const upload = require('../helpers/upload').single('photo');
const fs = require('fs');
const { APP_URL } = process.env;

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

const insertUserAsync = async(request, response) => {
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
                password: request.body.password
            };
            var errValidation = await validation.validationDataUser(data);
            if (request.file) {
                data.photo = request.file.path;
            }
            if (errorUpload) {
                errValidation = {...errValidation, photo: errorUpload.message };
            }
            let dataJson = { response: response, message: '' };
            if (errValidation == null) {
                const hashPassword = await argon.hash(data.password);
                data.password = hashPassword;
                const insert = await userModel.insertDataUserAsync(data);
                if (insert.affectedRows > 0) {
                    const result = await userModel.getDataUserAsync(insert.insertId);
                    dataJson = {...dataJson, message: 'Data user created successfully.', result: result };
                    return showApi.showSuccess(dataJson);
                } else {
                    dataJson = {...dataJson, message: 'Data user failed to create.', status: 500 };
                    return showApi.showError(dataJson);
                }
            } else {
                dataJson = {...dataJson, message: 'Data user was not valid.', status: 400, error: errValidation };
                return showApi.showError(dataJson);
            }
        });
    });
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
    upload(request, response, (errorUpload) => {
        auth.verifyUser(request, response, async(error) => {
            const { id } = request.params;
            let dataJson = { response: response, message: '' };
            if (id !== ' ') {
                if (!isNaN(id)) {
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
                        password: request.body.password
                    };
                    var errValidation = await validation.validationDataUser(data);
                    if (request.file) {
                        data.photo = request.file.path;
                    }
                    if (error) {
                        errValidation = {...errValidation, photo: errorUpload.message };
                    }
                    const resultDataUser = await userModel.getDataUserAsync(id);
                    if (resultDataUser.length > 0) {
                        if (errValidation == null) {

                            const hashPassword = await argon.hash(data.password);
                            data.password = hashPassword;
                            const update = await userModel.updateDataUserAsync(id, data);
                            if (update.affectedRows > 0) {
                                const result = await userModel.getDataUserAsync(id);
                                if (result.length > 0) {
                                    result.map((value) => {
                                        if (value.photo !== null) {
                                            value.photo = `${APP_URL}/${value.photo}`;
                                        }
                                        return value;
                                    });
                                    dataJson = {...dataJson, message: 'Data user updated successfully.', result: result };
                                    return showApi.showSuccess(dataJson);
                                }
                            } else {
                                dataJson = {...dataJson, message: 'Data user failed to update.', status: 500 };
                                return showApi.showError(dataJson);
                            }
                        } else {
                            dataJson = {...dataJson, message: 'Data user was not valid.', status: 400, error: errValidation };
                            return showApi.showError(dataJson);
                        }
                    } else {
                        dataJson = {...dataJson, message: 'Data user not found.', status: 404 };
                        return showApi.showError(dataJson);
                    }
                } else {
                    dataJson = {...dataJson, message: 'id must be a number.', status: 400 };
                    return showApi.showError(dataJson);
                }

            } else {
                dataJson = {...dataJson, message: 'id must be filled.', status: 400 };
                return showApi.showError(dataJson);
            }
        });
    });
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
    upload(request, response, (errorUpload) => {
        auth.verifyUser(request, response, async(error) => {
            const { id } = request.params;
            let dataJson = { response: response, message: '' };
            if (id) {
                if (!isNaN(id)) {
                    const dataUser = await userModel.getDataUserAsync(id);
                    if (dataUser.length > 0) {
                        var data = {};
                        var filled = ['fullName', 'nickName', 'gender', 'photo', 'address', 'birthDate', 'mobileNumber', 'email', 'username', 'password'];
                        filled.forEach((value) => {
                            if (request.body[value]) {
                                if (request.file) {
                                    data['photo'] = request.file.path;
                                }
                                data[value] = request.body[value];
                            }
                        });
                        try {
                            const update = await userModel.updateDataUserAsync(id, data);
                            if (update.affectedRows > 0) {
                                const result = await userModel.getDataUserAsync(id);
                                if (result.length > 0) {
                                    result.map((value) => {
                                        if (value.photo !== null) {
                                            value.photo = `${APP_URL}/${value.photo}`;
                                        }
                                        return value;
                                    });
                                    dataJson = {...dataJson, message: 'Data user updated successfully.', result: result };
                                    return showApi.showSuccess(dataJson);
                                }
                            } else {
                                dataJson = {...dataJson, message: 'Data User failed to update.', status: 500 };
                                return showApi.showError(dataJson);
                            }
                        } catch (err) {
                            dataJson = {...dataJson, message: 'Data User failed to update.', status: 500, error: err.message };
                            return showApi.showError(dataJson);
                        }

                    } else {
                        dataJson = {...dataJson, message: 'Data User not found.', status: 400 };
                        return showApi.showError(dataJson);
                    }
                } else {
                    dataJson = {...dataJson, message: 'Id must be a number.', status: 400 };
                    return showApi.showError(dataJson);
                }
            } else {
                dataJson = {...dataJson, message: 'Id must be filled.', status: 400 };
                return showApi.showError(dataJson);
            }

        });
    });
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
    upload(req, res, async(errorUpload) => {
        auth.verifyUser(req, res, async(error) => {
            const { id } = req.params;
            let dataJson = { response: res, message: '' };
            if (id !== ' ') {
                if (!isNaN(id)) {
                    const resultDataUser = await userModel.getDataUserAsync(id);
                    if (resultDataUser.length > 0) {
                        fs.rm(resultDataUser[0].photo, {}, function(err) {
                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: 'File not found'
                                });
                            }

                        });
                        try {
                            const deleteUser = await userModel.deleteDataUserAsync(id);
                            if (deleteUser.affectedRows > 0) {
                                dataJson = {...dataJson, message: 'Data user deleted successfully' };
                                return showApi.showSuccess(dataJson);
                            }
                        } catch (error) {
                            dataJson = {...dataJson, message: error.message, status: 400 };
                            return showApi.showError(dataJson);
                        }
                    } else {
                        dataJson = {...dataJson, message: "Data user not found.", status: 404 };
                        return showApi.showError(dataJson);
                    }
                } else {
                    dataJson = {...dataJson, message: "Id must be a number.", status: 400 };
                    return showApi.showError(dataJson);
                }
            } else {
                dataJson = {...dataJson, message: "Id must be filled.", status: 400 };
                return showApi.showError(dataJson);
            }
        });
    });

};

module.exports = { getUsers, getUser, insertUser, insertUserAsync, updateUser, updateUserAsync, updatePatchUser, updatePatchUserAsync, deleteUser, deleteUserAsync };