const popularModel = require('../models/popularVehicle');

const getPopularVehicle = (request, response) => {
    const dateOb = new Date();
    let month = dateOb.getMonth() + 1;
    popularModel.getDataPopularVehicle(month, (result) => {
        if (result.length > 0) {
            return response.json({
                success: true,
                message: 'List Popular Vehicle',
                results: result
            });
        }
    });
};

module.exports = { getPopularVehicle };