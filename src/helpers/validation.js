exports.validationDataVehicles = (data) => {
    var result = null;
    const { name, category_id, photo, location, price, qty, isAvailable } = data;
    if (name == null || name == '') {
        result = { name: 'Name must be filled' };
    }
    if (category_id == null || category_id == '') {
        result = {...result, category_id: 'Id category must be filled.' };
    }
    if (photo == null || photo == '') {
        result = {...result, photo: 'Photo must be filled.' };
    }
    if (location == null || location == '') {
        result = {...result, location: 'Location must be filled.' };
    }
    if (price == null || price == '') {
        result = {...result, price: 'Price must be filled' };
    } else if (isNaN(parseInt(price))) {
        result = {...result, price: 'Price must be a number.' };
    } else if (parseInt(price) == 0) {
        result = {...result, price: 'Price must be must be greater than 0.' };
    }

    if (qty == null || qty == '') {
        result = {...result, qty: 'Quantity must be filled' };
    } else if (isNaN(parseInt(qty))) {
        result = {...result, qty: 'Quantity must be a number.' };
    } else if (parseInt(qty) == 0) {
        result = {...result, qty: 'Quantity must be must be greater than 0.' };
    }
    if (isAvailable == null || isAvailable == '') {
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

exports.validationDataHistories = (data) => {
    var result = null;
    const { idUser, idVehicle, startRentDate, endRentDate, prepayment, status } = data;
    if (idUser == null || idUser == '') {
        result = { idUser: 'Id user must be filled' };
    } else if (isNaN(parseInt(idUser))) {
        result = { idUser: 'Id user must be a number' };
    }

    if (idVehicle == null || idVehicle == '') {
        result = {...result, idVehicle: 'Id vehicle must be filled.' };
    } else if (isNaN(parseInt(idVehicle))) {
        result = {...result, idUser: 'Id vehicle must be a number' };
    }
    if (startRentDate == null || startRentDate == '') {
        result = {...result, startRentDate: 'Start rent date must be filled' };
    }
    if (endRentDate == null || endRentDate == '') {
        result = {...result, photo: 'End rent date must be filled.' };
    }
    if (prepayment == null || prepayment == '') {
        result = {...result, prepayment: 'Prepayment must be filled.' };
    } else if (isNaN(parseInt(prepayment))) {
        result = {...result, prepayment: 'Prepayment must be a number.' };
    } else if (parseInt(prepayment) == 0) {
        result = {...result, prepayment: 'Prepayment must be gather than 0.' };
    }
    if (status == null || status == '') {
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