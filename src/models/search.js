const db = require('../helpers/database');
const { APP_URL } = process.env;

exports.getDataSearchVehicle = (data) => new Promise((resolve, reject) => {
    var filled = ["location", "type", "payment_id", "category_id"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            resultFillter += ` and ${item}='${data.filter[item]}'`;
        }
    });
    const query = db.query(`select v.id,v.name,v.category_id,c.name as category,concat('${APP_URL}/',v.photo) as photo,v.location,v.price,h.payment_id,pt.payment, h.rentStartDate,h.rentEndDate,h.createdAt 
    from histories h right join vehicles v on h.vehicle_id = v.id left join payment_types pt on h.payment_id = pt.id right join categories c on c.id = v.category_id
   where v.name like '%${data.name}%' ${resultFillter} ${data.date!=="" ? `and h.rentStartDate = '${data.date}' or h.rentEndDate='${data.date}'` : ""}
   order by ${data.sort} ${data.order} LIMIT ${data.limit} OFFSET ${data.offset}`, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
    console.log(query.sql);
});

exports.countDataSearchVehicle = (data) => new Promise((resolve, reject) => {
    var filled = ["location", "type", "payment_id", "category_id", "date"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            resultFillter += ` and ${item}='${data.filter[item]}'`;
        }
    });
    db.query(`select count(*) as total
    from histories h right join vehicles v on h.vehicle_id = v.id left join payment_types pt on h.payment_id = pt.id right join categories c on c.id = v.category_id
   where v.name like '%${data.name}%' ${resultFillter}`, function(error, results) {
        if (error) reject(error);
        resolve(results);
    });
});