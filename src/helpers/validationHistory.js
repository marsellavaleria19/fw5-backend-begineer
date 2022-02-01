exports.validationDataHistories = (data) => {
    var result = null;
    const { idUser, idVehicle, startRentDate, endRentDate, prepayment, paymentStatus, rentStatus } = data;
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
    if (paymentStatus == null || paymentStatus == '') {
        result = {...result, paymentStatus: 'Payment status must be filled' };
    }
    if (rentStatus == null || rentStatus == '') {
        result = {...result, rentStatus: 'Mobile number must be filled' };
    }

    return result;
};