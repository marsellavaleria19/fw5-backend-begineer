exports.validationDataVehicles = (data) => {
    var result = null;
    const { name, category, photo, location, price, qty, isAvailable } = data;
    if (name == null || name == '') {
        result = { name: 'Name must be filled' };
    }
    if (category == null || category == '') {
        result = {...result, category: 'Category must be filled.' };
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