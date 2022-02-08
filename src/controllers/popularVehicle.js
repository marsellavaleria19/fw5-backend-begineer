const popularModel = require('../models/popularVehicle');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');

const getPopularVehicle = (request, response) => {
    let dataJson = { response: response, message: '' };
    let { search, page, limit, sort, order, month } = request.query;
    sort = sort || 'h.createdAt';
    search = search || '';
    page = ((page != null && page !== '') ? parseInt(page) : 1);
    limit = ((limit != null && limit !== '') ? parseInt(limit) : 5);
    order = order || 'desc';
    let pagination = { page, limit };

    const dateOb = new Date();
    let monthDefault = dateOb.getMonth() + 1;
    month = month || monthDefault;
    if (validation.validationPagination(pagination) == null) {
        const offset = (page - 1) * limit;
        let data = { search, limit, offset, sort, order };
        popularModel.getDataPopularVehicle(data, month, (results) => {
            if (results.length > 0) {
                popularModel.countDataPopularVehicle(data, month, (count) => {
                    const { total } = count[0];
                    pagination = {...pagination, total: total, route: 'popular' };
                    dataJson = {...dataJson, message: 'List Data Popular.', result: results, pagination };
                    return showApi.showSuccessWithPagination(dataJson, pagination);
                });
            } else {
                dataJson = {...dataJson, message: 'Data Popular not found.', status: 404 };
                return showApi.showError(dataJson);
            }

        });
    } else {
        dataJson = {...dataJson, message: 'Pagination not valid.', status: 400, error: validation.validationPagination(pagination) };
        return showApi.showError(dataJson);
    }

};

module.exports = { getPopularVehicle };