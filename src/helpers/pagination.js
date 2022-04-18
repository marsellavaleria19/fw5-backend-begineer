
// const pagination = (data, total, page, route) => {
//     const last = Math.ceil(total / data.limit);
//     const url = `http://localhost:5000/${route}?page=`;
//     return {
//         prev: page > last ? `${url}${page-1}` : null,
//         next: page < last ? `${url}${page+1}` : null,
//         totalData: total,
//         currentPage: page,
//         lastPage: last
//     };
// };

exports.pagination = (data,dataPage,filter = null,sort=null,order=null)=>{
    var resultFilter = "";
    dataPage.route = `${dataPage.route}?`;
    var dataFilter = {};
    if(filter!==null && data!==null){
        filter.forEach((item)=>{
            if(data[item]){
                if(resultFilter==""){
                    resultFilter=`${item}=${data[item]}`;
                }else{
                    resultFilter+=`&${item}=${data[item]}`;
                }
                dataFilter[item] = data[item];
            }
           
        });
    }

    if(resultFilter==""){
        dataPage.route +=`limit=${dataPage.limit}`; 
    }else{
        dataPage.route += `${resultFilter}&limit=${dataPage.limit}`;
    }

    if(sort!==null & order!==null){
        dataPage.route+=`&sort=${sort}&order=${order}`;
    }

    const offset = (dataPage.page - 1) * dataPage.limit;
    // limit = ((limit != null && limit !== '') ? parseInt(limit) : 5);
    // order = order || 'desc';
    var result = {sort,order,limit:dataPage.limit,page:dataPage.page,route:dataPage.route,offset,filter:dataFilter};
    return result;
};

