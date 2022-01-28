const userModel = require('../models/users')

const getUsers = (request, response) => {
    userModel.getDataUsers((results) => {
        return response.json({
            success: true,
            message: "Lst data user",
            results: results
        })
    })
}

const getUser = (request, response) => {
    const { id } = request.params
    userModel.getDataUser(id, (results) => {
        if (results.length > 0) {
            return response.json({
                success: true,
                message: "Detail user",
                results: results[0]
            })
        } else {
            return response.status(404).json({
                success: false,
                message: "Data not found"
            })
        }
    })
}

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
    }

    userModel.insertDataUser(data, (results) => {
        console.log(results)
        if (results.affectedRows > 0) {
            return response.json({
                success: true,
                message: "Data user entered successfully."
            })
        } else {
            return response.status(500).json({
                success: false,
                message: "Data user failed to input."
            })
        }
    })
}

const updateUser = (request, response) => {
    const { id } = request.params
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
    }
    userModel.updateDataUser(id, data, (results) => {
        if (results.affectedRows > 0) {
            return response.json({
                success: true,
                message: "Data user updated successfully."
            })
        } else {
            return response.status(500).json({
                success: false,
                message: "Data user failed to update."
            })
        }
    })
}

const deleteUser = (request, response) => {
    const { id } = request.params
    userModel.deleteDataUser(id, (results) => {
        if (results.affectedRows > 0) {
            return response.json({
                success: true,
                message: "Data user deleted successfully."
            })
        } else {
            return response.status(500).json({
                success: false,
                message: "Data user failed to delete."
            })
        }
    })
}

module.exports = { getUsers, getUser, insertUser, updateUser, deleteUser }