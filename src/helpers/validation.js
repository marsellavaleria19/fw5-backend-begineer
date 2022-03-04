const forgotPasswordModel = require('../models/forgotPassword');
const userModel = require('../models/users');
const vehicleModel = require('../models/vehicles');
const emailVerificationModel = require('../models/emailVerification');
const statusModel = require('../models/status');

exports.validationDataVehicles = async(data) => {
    var result = null;
    if (data.name == null || data.name == '') {
        result = { name: 'Name must be filled' };
    } else {
        const resultDataVehicleByName = await vehicleModel.getDataVehicleNameAsync(data.name);
        if (resultDataVehicleByName.length > 0) {
            result = { name: 'Name has already used.' };
        }
    }
    if (data.category_id == null || data.category_id == '') {
        result = {...result, category_id: 'Id category must be filled.' };
    }
    if (data.location == null || data.location == '') {
        result = {...result, location: 'Location must be filled.' };
    }
    if (data.price == null || data.price == '') {
        result = {...result, price: 'Price must be filled' };
    } else if (isNaN(parseInt(data.price))) {
        result = {...result, price: 'Price must be a number.' };
    } else if (parseInt(data.price) == 0) {
        result = {...result, price: 'Price must be must be greater than 0.' };
    }

    if (data.qty == null || data.qty == '') {
        result = {...result, qty: 'Quantity must be filled' };
    } else if (isNaN(parseInt(data.qty))) {
        result = {...result, qty: 'Quantity must be a number.' };
    } else if (parseInt(data.qty) == 0) {
        result = {...result, qty: 'Quantity must be must be greater than 0.' };
    }
    if (data.isAvailable == null || data.isAvailable == '') {
        result = {...result, isAvailable: 'isAvailable must be filled.' };
    }

    return result;
};

exports.validationDataUser = async(data) => {
    var result = null;
    const { fullName, nickName, gender, address, birthDate, mobileNumber, email, username, password } = data;
    if (fullName == null || fullName == '') {
        result = { fullName: 'Fullname must be filled' };
    }
    if (nickName == null || nickName == '') {
        result = {...result, nickName: 'Nickname must be filled.' };
    }
    if (gender == null || gender == '') {
        result = {...result, gender: 'Gender must be filled' };
    }
    if (address == null || address == '') {
        result = {...result, address: 'Address must be filled.' };
    }
    if (birthDate == null || birthDate == '') {
        result = {...result, birthDate: 'Birtdate must be filled' };
    }
    if (mobileNumber == null || mobileNumber == '') {
        result = {...result, mobileNumber: 'Mobile number must be filled' };
    }
    if (email == null || email == '') {
        result = {...result, email: 'email must be filled' };
    } else {
        const checkUserEmail = await userModel.getDataUserEmailAsync(email, null);
        if (checkUserEmail.length > 0) {
            result = {...result, email: 'email has already used.' };
        }
    }
    if (username == null || username == '') {
        result = {...result, username: 'username must be filled' };
    } else {
        const checkUserUsername = await userModel.getDataUserUsernameAsync(username, null);
        if (checkUserUsername.length > 0) {
            result = {...result, username: 'username has already used.' };
        }
    }
    if (password == null || password == '') {
        result = {...result, password: 'Password must be filled' };
    }
    return result;
};

exports.validationDataHistories = async(data) => {
    var result = null;
    const { user_id, vehicle_id, rentStartDate, rentEndDate, prepayment, status_id } = data;
    if (user_id == null || user_id == '') {
        result = { user_id: 'Id user must be filled' };
    } else if (isNaN(parseInt(user_id))) {
        result = { user_id: 'Id user must be a number' };
    } else {
        const resultUserId = await userModel.getDataUserAsync(data.user_id);
        if (resultUserId.length == 0) {
            result = { user_id: 'User id doesn\'t exist' };
        }
    }

    if (vehicle_id == null || vehicle_id == '') {
        result = {...result, vehicle_id: 'Id vehicle must be filled.' };
    } else if (isNaN(parseInt(vehicle_id))) {
        result = {...result, vehicle_id: 'Id vehicle must be a number' };
    } else {
        const resultVehicleId = await vehicleModel.getDataVehicleAsync(data.vehicle_id);
        if (resultVehicleId.length == 0) {
            result = {...result, vehicle_id: 'Vehicle id doesn\'t exist' };
        }
    }

    if (rentStartDate == null || rentStartDate == '') {
        result = {...result, rentStartDate: 'Start rent date must be filled' };
    }
    if (rentEndDate == null || rentEndDate == '') {
        result = {...result, rentEndDate: 'End rent date must be filled.' };
    }
    if (prepayment == null || prepayment == '') {
        result = {...result, prepayment: 'Prepayment must be filled.' };
    } else if (isNaN(parseInt(prepayment))) {
        result = {...result, prepayment: 'Prepayment must be a number.' };
    } else if (parseInt(prepayment) < 0) {
        result = {...result, prepayment: 'Prepayment must be gather than 0.' };
    }
    if (status_id == null || status_id == '') {
        result = {...result, status: 'Status must be filled' };
    } else {
        const resultStatusId = await statusModel.getDataStatusAsync(data.status_id);
        if (resultStatusId.length == 0) {
            result = {...result, status_id: 'Status id doesn\'t exist' };
        }
    }

    return result;
};

exports.validationName = (name) => {
    var result = null;
    if (name == null || name == '') {
        result = { name: 'Name must be filled.' };
    }
    return result;
};

exports.validationStatus = (status) => {
    var result = null;
    if (status == null || status == '') {
        result = { status: 'Status must be filled.' };
    }
    return result;
};

exports.validationSearch = (search) => {
    var result = null;
    if (search == null || search == '') {
        result = { search: 'Search must be filled.' };
    }
    return result;
};

exports.validationPagination = (pagination) => {
    var result = null;
    const { page, limit } = pagination;

    if (isNaN(parseInt(page))) {
        result = {...result, page: 'Page must be a number.' };
    } else if (page == 0) {
        result = {...result, page: 'Page must be grather then 0.' };
    }

    if (isNaN(parseInt(limit))) {
        result = {...result, limit: 'Limit must be a number.' };
    } else if (limit == 0) {
        result = {...result, limit: 'Limit must be grather than 0.' };
    }
    return result;
};

exports.validationLogin = async(data) => {
    var result = null;

    if (!data.email || data.email == '') {
        result = { email: 'Email must be filled.' };
    }
    if (!data.password || data.password == '') {
        result = {...result, password: 'Password must be filled.' };
    }
    return result;
};

exports.validationRegister = async(data) => {
    var result = null;

    if (!data.email || data.email == '') {
        result = { email: 'Email must be filled.' };
    } else {
        const resultEmail = await userModel.getDataUserEmailAsync(data.email, null);
        console.log(resultEmail.length);
        if (resultEmail.length > 0) {
            result = { email: "Email has already used." };
        }
    }

    if (!data.fullName || data.fullName == '') {
        result = {...result, fullName: 'fullname must be filled.' };
    }
    if (!data.username || data.username == '') {
        result = {...result, username: 'username must be filled.' };
    }

    if (!data.password || data.password == '') {
        result = {...result, password: 'Password must be filled.' };
    }
    return result;
};

exports.validationEmailVerification = async(data) => {
    var result = null;

    if (!data.email || data.email == '') {
        result = { email: 'Email must be filled.' };
    } else {
        const resultEmail = await userModel.getDataUserEmailAsync(data.email, null);
        if (resultEmail.length == 0) {
            result = { email: "Email not found." };
        }
    }

    if (!data.code || data.code == '') {
        result = {...result, code: 'code must be filled.' };
    } else {
        const verifyUser = await emailVerificationModel.getEmailVerificationByCode(data.code);
        if (verifyUser.length == 0) {
            result = {...result, code: 'Code not found.' };
        } else {
            if (verifyUser[0].isExpired) {
                result = {...result, code: 'Expired code' };
            }
        }
    }

    if (!data.password || data.password == '') {
        result = {...result, password: 'Password must be filled.' };
    }
    return result;
};


exports.validationForgotPassword = async(data) => {
    var result = null;
    if ((!data.code || data.code == '') && (!data.password || data.password == '') && (!data.confirmPassword || data.confirmPassword == '')) {
        if (!data.email || data.email == "") {
            result = { email: 'Email must be filled.' };
        } else {
            const user = await userModel.getDataUserEmailAsync(data.email);
            if (user.length == 0) {
                result = result = { email: 'Email not found.' };
            }
        }
    } else {
        if (data.code) {
            const resultForgotPassword = await forgotPasswordModel.getForgotPassword(data.code);
            if (resultForgotPassword.length === 1) {
                if (resultForgotPassword[0].isExpired) {
                    result = {...result, code: 'Expired code' };
                }
                const user = await userModel.getDataUserAsync(resultForgotPassword[0].user_id);
                if (user[0].email == data.email) {
                    if (!data.password || data.password == "") {
                        result = {...result, password: 'Password must be filled.' };
                    }
                    if (!data.confirmPassword || data.confirmPassword == "") {
                        result = {...result, confirmPassword: 'Confirm Password must be filled.' };
                    }
                } else {
                    result = {...result, email: "Email not found!" };
                }

            } else {
                result = { code: "Code not match." };
            }
        } else {
            result = { code: "Code must be filled." };
        }
    }

    return result;
};