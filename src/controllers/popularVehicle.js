const popularModel = require('../models/popularVehicle');

const getPopularVehicle = (request, response) => {
    let { month } = request.query;
    const dateOb = new Date();
    let monthDefault = dateOb.getMonth() + 1;
    popularModel.getDataPopularVehicle(month = (month == null ? monthDefault : month), (result) => {
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