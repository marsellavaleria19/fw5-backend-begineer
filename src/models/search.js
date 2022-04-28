const db = require('../helpers/database');
const { APP_URL } = process.env;

// exports.getDataSearchVehicle = (data) => new Promise((resolve, reject) => {
//     var filled = ["location", "type", "payment_id", "category_id"];
//     var resultFillter = "";
//     filled.forEach((item) => {
//         if (data.filter[item]) {
//             resultFillter += ` and ${item}='${data.filter[item]}'`;
//         }
//     });
//     const query = db.query(`select v.id,v.name,v.category_id,c.name as category,concat('${APP_URL}/',v.photo) as photo,v.location,v.price,h.payment_id,pt.payment, h.rentStartDate,h.rentEndDate,h.createdAt 
//     from histories h right join vehicles v on h.vehicle_id = v.id left join payment_types pt on h.payment_id = pt.id right join categories c on c.id = v.category_id
//    where v.name like '%${data.name}%' ${resultFillter} ${data.date!=="" ? `and h.rentStartDate = '${data.date}' or h.rentEndDate='${data.date}'` : ""}
//    order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, (error, result) => {
//         if (error) reject(error);
//         resolve(result);
//     });
//     console.log(query.sql);
// });

exports.getDataSearchVehicle = (data) => new Promise((resolve, reject) => {
    var filled = ["location_id","payment_id", "category_id",'isAvailable','rate','status_id'];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            if(item=="status_id" || item=="payment_id"){
                resultFillter += ` and h.${item}='${data.filter[item]}'`;
            }else{
                resultFillter += ` and v.${item}='${data.filter[item]}'`;
            }
           
            // if(item!=='no_prepayment'){
            //     if(item=="location" || item=='type' || item=="isAvailable" || item=='category_id' || item=='rate'){
            //         resultFillter += ` and v.${item}='${data.filter[item]}'`;
            //     }else{
            //         resultFillter += ` and h.${item}='${data.filter[item]}'`;
            //     }
            // }
            // if(item=='no_prepayment'){
            //     if(data.filter[item]=='0'){
            //         resultFillter += 'and h.payment_type="Prepayment"';
            //     }else{
            //         resultFillter += 'and h.payment_type!="Prepayment"';
            //     }
            // }
        }
    });
    const query = db.query(`select distinct v.id,v.name as brand,v.photo,v.price,v.isAvailable,v.rate,l.location
    from histories h right join vehicles v on h.vehicle_id = v.id left join payment_types pt on h.payment_id = pt.id right join categories c on c.id = v.category_id
    right join locations l on l.id = v.location_id
   where v.name like '%${data.name}%' ${resultFillter} ${data.date!=="" ? `and h.rentStartDate = '${data.date}' or h.rentEndDate='${data.date}'` : ""} 
   ${data.price_start!==""  && data.price_end!=="" ? `and v.price between '${data.price_start}' and '${data.price_end}'` : ""}
   ${data.rate_start!==""  && data.rate_end!=="" ? `and v.rate between '${data.rate_start}' and '${data.rate_end}'` : ""}
   ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''}  
    LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset}`, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
    console.log(query.sql);
});

// exports.countDataSearchVehicle = (data) => new Promise((resolve, reject) => {
//     var filled = ["location", "type", "payment_id", "category_id", "date"];
//     var resultFillter = "";
//     filled.forEach((item) => {
//         if (data.filter[item]) {
//             resultFillter += ` and ${item}='${data.filter[item]}'`;
//         }
//     });
//     db.query(`select count(*) as total
//     from histories h right join vehicles v on h.vehicle_id = v.id left join payment_types pt on h.payment_id = pt.id right join categories c on c.id = v.category_id
//    where v.name like '%${data.name}%' ${resultFillter}`, function(error, results) {
//         if (error) reject(error);
//         resolve(results);
//     });
// });

exports.countDataSearchVehicle = (data) => new Promise((resolve, reject) => {
    var filled = ["location_id","payment_id", "category_id",'isAvailable','status_id'];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            if(item=="status_id" || item=="payment_id"){
                resultFillter += ` and h.${item}='${data.filter[item]}'`;
            }else{
                resultFillter += ` and v.${item}='${data.filter[item]}'`;
            }
            // if(item!=='no_prepayment'){
            //     if(item=="location" || item=='type' || item=="isAvailable" || item=='category_id' || item=='rate'){
            //         resultFillter += ` and v.${item}='${data.filter[item]}'`;
            //     }else{
            //         resultFillter += ` and h.${item}='${data.filter[item]}'`;
            //     }
            // }
            // if(item=='no_prepayment'){
            //     if(data.filter[item]=='0'){
            //         resultFillter += 'and h.payment_type="Prepayment"';
            //     }else{
            //         resultFillter += 'and h.payment_type!="Prepayment"';
            //     }
            // }
        }
    });
    const query = db.query(`select count(*) as total
      from (select distinct v.id,v.name,concat('${APP_URL}/',v.photo) as photo,v.price,v.isAvailable,rate
      from histories h right join vehicles v on h.vehicle_id = v.id left join payment_types pt on h.payment_id = pt.id right join categories c on c.id = v.category_id
      where v.name like '%${data.name}%' ${resultFillter} ${data.date!=="" ? `and h.rentStartDate = '${data.date}' or h.rentEndDate='${data.date}'` : ""} 
      ${data.price_start!==""  && data.price_end!=="" ? `and v.price between '${data.price_start}' and '${data.price_end}'` : ""}
      ${data.rate_start!==""  && data.rate_end!=="" ? `and v.rate between '${data.rate_start}' and '${data.rate_end}'` : ""}
     ) as filter`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
    console.log(query.sql);  
});
  