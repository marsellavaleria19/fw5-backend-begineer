const userModel = require('../models/users');
const validation = require('../helpers/validationUser');

const getUsers = (request, response) => {
    userModel.getDataUsers((results) => {
        return response.json({
            success: true,
            message: 'List data user',
            results: results
        });
    });
};

const getUser = (request, response) => {
    const { id } = request.params;
    userModel.getDataUser(id, (results) => {
        if (results.length > 0) {
            return response.json({
                success: true,
                message: 'Detail user',
                results: results[0]
            });
        } else {
            return response.status(404).json({
                success: false,
                message: 'Data not found'
            });
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

    if (validation.validationDataUser(data) == null) {
        userModel.getDataUserEmail(data.email, (result) => {
            if (result.length == 0) {
                userModel.insertDataUser(data, (results) => {
                    if (results.affectedRows > 0) {
                        return response.json({
                            success: true,
                            message: 'Data user created successfully.',
                            results: data
                        });
                    } else {
                        return response.status(500).json({
                            success: false,
                            message: 'Data user failed to create.'
                        });
                    }
                });
            } else {
                return response.status(400).json({
                    success: false,
                    message: 'Email has already used.'
                });
            }
        });
    } else {
        return response.status(400).json({
            success: false,
            message: 'Data user was not valid.'
        });
    }
};

const updateUser = (request, response) => {
    const { id } = request.params;

    if (id !== null && id !== '') {
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
        if (validation.validationDataUser(data) == null) {
            userModel.getDataUserEmail(data.email, (result) => {
                if (result.length == 0) {
                    userModel.updateDataUser(id, data, (results) => {
                        if (results.affectedRows > 0) {
                            return response.json({
                                success: true,
                                message: 'Data user updated successfully.',
                                results: data
                            });
                        } else {
                            return response.status(500).json({
                                success: false,
                                message: 'Data user failed to update.'
                            });
                        }
                    });
                } else {
                    return response.status(400).json({
                        success: false,
                        message: 'Email has already used.'
                    });
                }
            });
        } else {
            return response.status(400).json({
                success: false,
                message: 'Data user was not valid.'
            });
        }
    } else {
        return response.status(400).json({
            success: false,
            message: 'id must be filled.'
        });
    }

};

const deleteUser = (request, response) => {
    const { id } = request.params;
    if (id !== null && id !== '') {
        userModel.getDataUser(id, (result) => {
            userModel.deleteDataUser(id, (results) => {
                if (results.affectedRows > 0) {
                    return response.json({
                        success: true,
                        message: 'Data user deleted successfully.',
                        results: result
                    });
                } else {
                    return response.status(500).json({
                        success: false,
                        message: 'Data user failed to delete.'
                    });
                }
            });
        });
    } else {
        return response.status(500).json({
            success: false,
            message: 'Data user failed to delete.'
        });
    }
};

module.exports = { getUsers, getUser, insertUser, updateUser, deleteUser };