const searchModel = require('../models/search');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const moment = require('moment');

const getSearchVehicle = async(req, res) => {
    let { name, date, page, limit, sort, order } = req.query;
    name = name || '';
    date = date || '';
    sort = sort || 'createdAt';
    var filledFilter = ["location", "category_id", "payment_id"];
    var filter = {};
    page = ((page != null && page !== '') ? parseInt(page) : 1);
    limit = ((limit != null && limit !== '') ? parseInt(limit) : 10);
    order = order || 'desc';
    let pagination = { page, limit };
    let dataJson = { response: res, message: '' };
    var route = `search?`;
    var searchParam = "";
    if (name) {
        searchParam = `name=${name}`;
    }
    if (date) {
        searchParam = `date=${date}`;
    }
    filledFilter.forEach((item) => {
        if (req.query[item]) {
            filter[item] = req.query[item];
            if (searchParam == "") {
                searchParam += `${item}=${filter[item]}`;
            } else {
                searchParam += `&${item}=${filter[item]}`;
            }
        }
    });
    route += searchParam;

    if (validation.validationPagination(pagination) == null) {
        const offset = (page - 1) * limit;
        let data = { name, filter, date, limit, offset, sort, order };
        var dataSearch = await searchModel.getDataSearchVehicle(data);
        dataSearch.forEach((item) => {
            if (item.rentStartDate !== null && item.rentEndDate) {
                item.rentStartDate = moment(item.rentStartDate).format('DD MMM YYYY');
                item.rentEndDate = moment(item.rentEndDate).format('DD MMM YYYY');
            }
        });
        try {
            if (dataSearch.length > 0) {
                var result = await searchModel.countDataSearchVehicle(data);
                const { total } = result[0];
                pagination = {...pagination, total: total, route: route };
                dataJson = {...dataJson, message: 'List Data Search.', result: dataSearch, pagination };
                return showApi.showSuccessWithPagination(dataJson, pagination);
            } else {
                dataJson = {...dataJson, message: 'Data not found', status: 404 };
                return showApi.showError(dataJson);
            }
        } catch (err) {
            dataJson = {...dataJson, message: 'Data failed ', status: 500, error: err };
            return showApi.showError(dataJson);
        }

    } else {
        dataJson = { response: res, message: 'Pagination was not valid.', error: validation.validationPagination(pagination), status: 400 };
        showApi.showError(dataJson);
    }
};

module.exports = { getSearchVehicle };