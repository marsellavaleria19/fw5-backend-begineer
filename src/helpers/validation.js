const userModel = require('../models/users');

exports.validationDataVehicles = (data) => {
    var result = null;
    if (data.name == null || data.name == '') {
        result = { name: 'Name must be filled' };
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

exports.validationDataUser = (data) => {
    var result = null;
    const { fullName, nickName, gender, photo, address, birthDate, mobileNumber, email, password } = data;
    if (fullName == null || fullName == '') {
        result = { fullName: 'Fullname must be filled' };
    }
    if (nickName == null || nickName == '') {
        result = {...result, nickName: 'Nickname must be filled.' };
    }
    if (gender == null || gender == '') {
        result = {...result, gender: 'Gender must be filled' };
    }
    if (photo == null || photo == '') {
        result = {...result, photo: 'Photo must be filled.' };
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
    }

    if (vehicle_id == null || vehicle_id == '') {
        result = {...result, vehicle_id: 'Id vehicle must be filled.' };
    } else if (isNaN(parseInt(vehicle_id))) {
        result = {...result, vehicle_id: 'Id vehicle must be a number' };
    }
    if (rentStartDate == null || rentStartDate == '') {
        result = {...result, rentStartDate: 'Start rent date must be filled' };
    }
    if (rentEndDate == null || rentEndDate == '') {
        result = {...result, photo: 'End rent date must be filled.' };
    }
    if (prepayment == null || prepayment == '') {
        result = {...result, prepayment: 'Prepayment must be filled.' };
    } else if (isNaN(parseInt(prepayment))) {
        result = {...result, prepayment: 'Prepayment must be a number.' };
    } else if (parseInt(prepayment) == 0) {
        result = {...result, prepayment: 'Prepayment must be gather than 0.' };
    }
    if (status_id == null || status_id == '') {
        result = {...result, status: 'Status must be filled' };
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

exports.validationForgotPassword = async(data) => {
    var result = null;
    if (!data.code || data.code == "") {
        if (!data.email || data.email == "") {
            result = { email: 'Email must be filled.' };
        } else {
            const resultEmail = await userModel.getDataUserEmailAsync(data.email, null);
            console.log(resultEmail.length);
            if (resultEmail.length == 0) {
                result = { email: "If you registered, reset password code will sended to your email" };
            }
        }
    } else {
        if (data.email) {
            if (!data.password || data.password == '') {
                result = {...result, password: "Pasword must be filled!" };
            }
            if (!data.confirmPassword || data.confirmPassword == '') {
                result = {...result, confirmPassword: "ConfirmPasword must be filled!" };
            }
        } else {
            result = {...result, code: 'You have to provide Confirmation Code' };
        }

    }


    return result;
};