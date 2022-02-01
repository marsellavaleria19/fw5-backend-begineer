const popularModel = require('../models/popularVehicle');

const getPopularVehicle = (request, response) => {
    popularModel.getDataPopularVehicle((result) => {
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