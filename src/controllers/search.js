const searchModel = require('../models/search');
const validation = require('../helpers/validation');
const showApi = require('../helpers/showApi');
const pagination = require('../helpers/pagination');
const moment = require('moment');

const getSearchVehicle = async(req, res) => {
    try{
        let { name, date,price_start,price_end,rate_start,rate_end, page, limit, sort, order } = req.query;
        name = name || '';
        date = date || '';
        price_start  = price_start || '';
        price_end = price_end || '';
        rate_start  = rate_start || '';
        rate_end = rate_end || '';
        var filledFilter = ["name","location", "category_id", "payment_id",'isAvailable','status_id','price_start','price_end','rate_start','rate_end'];
        page = ((page != null && page !== '') ? page : '1');
        limit = ((limit != null && limit !== '') ? limit : '10');
        let dataPages = { page, limit };
        let requirement = {page:'number',limit:'number'};
        const validate = validation.validation(dataPages,requirement);
        if(Object.keys(validate).length == 0){
            dataPages.route = "search";
            dataPages.page = parseInt(dataPages.page);
            dataPages.limit = parseInt(dataPages.limit);
            dataPages = pagination.pagination(req.query,dataPages,filledFilter,sort,order);
            let data = {name,date,price_start,price_end,rate_start,rate_end,filter:dataPages.filter,dataPages};
            console.log(data);
            var dataSearch = await searchModel.getDataSearchVehicle(data);
            if(dataSearch.length > 0){
                dataSearch.forEach((item) => {
                    if (item.rentStartDate !== null && item.rentEndDate) {
                        item.rentStartDate = moment(item.rentStartDate).format('DD MMM YYYY');
                        item.rentEndDate = moment(item.rentEndDate).format('DD MMM YYYY');
                    }
                });
                var result = await searchModel.countDataSearchVehicle(data);
                const { total } = result[0];
                dataPages = {...dataPages, total: total};
                return showApi.showResponse(res,"List data search",dataSearch,dataPages);
            }else{
                return showApi.showResponse(res,"List data search not found",null,null,null,404); 
            } 
        }else{
            return showApi.showResponse(res,"Pagination not valid",null,null,validate,400); 
        }

    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500);
    }
    
    //  if (validation.validationPagination(pagination) == null) {
    //      const offset = (page - 1) * limit;
    //      let data = { name, filter, date,price_start,price_end,rate_start,rate_end, limit, offset, sort, order };
    //      var dataSearch = await searchModel.getDataSearchVehicle(data);
    //      dataSearch.forEach((item) => {
    //          if (item.rentStartDate !== null && item.rentEndDate) {
    //              item.rentStartDate = moment(item.rentStartDate).format('DD MMM YYYY');
    //              item.rentEndDate = moment(item.rentEndDate).format('DD MMM YYYY');
    //          }
    //      });
    //      try {
    //          if (dataSearch.length > 0) {
    //              var result = await searchModel.countDataSearchVehicle(data);
    //              const { total } = result[0];
    //              pagination = {...pagination, total: total, route: route };
    //              dataJson = {...dataJson, message: 'List Data Search.', result: dataSearch, pagination };
    //              return showApi.showSuccessWithPagination(dataJson, pagination);
    //          } else {
    //              dataJson = {...dataJson, message: 'Data not found', status: 404 };
    //              return showApi.showError(dataJson);
    //          }
    //      } catch (err) {
    //          dataJson = {...dataJson, message: 'Data failed ', status: 500, error: err };
    //          return showApi.showError(dataJson);
    //      }

    //  } else {
    //      dataJson = { response: res, message: 'Pagination was not valid.', error: validation.validationPagination(pagination), status: 400 };
    //      showApi.showError(dataJson);
    //  }
};

module.exports = { getSearchVehicle };