const db = require('../helpers/database');

const { APP_URL } = process.env;

exports.getDataHistories = (data, cb) => {
    var filled = ["status_id", "category_id", "date"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            if (item == "date") {
                resultFillter += ` and v.startDate=${data.filter[item]} or h,rentEndDate=${data.filter[item]}`;
            } else {
                resultFillter += ` and ${item}='${data.filter[item]}'`;
            }
        }
    });
    db.query(`select h.id,h.user_id,h.fullname,h.mobilephone,v.name as brand,v.price,concat('${APP_URL}/',v.photo) as photo,c.name as category,h.rentStartDate,h.rentEndDate,
    h.qty,h.prepayment,h.status_id,s.status,DATEDIFF(h.rentEndDate,h.rentStartDate)+1 as day,v.price*h.qty*(DATEDIFF(h.rentEndDate,h.rentStartDate)+1) as totalPayment
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id join categories c on v.category_id = c.id 
    join status s on h.status_id = s.id 
    where v.name like '%${data.search}%' ${resultFillter}
    order by ${data.sort} ${data.order} limit ${data.limit} offset ${data.offset}`, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};


exports.getDataHistoriesAsync = (data) => new Promise((resolve, reject) => {
    var filled = ["status_id", "category_id","payment_id","date"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            if (item == "date") {
                resultFillter += ` and h.rentStartDate='${data.filter[item]}' or h.rentEndDate='${data.filter[item]}'`;
            } else {
                resultFillter += ` and ${item}='${data.filter[item]}'`;
            }
        }
    });
    db.query(`select h.id,h.user_id,h.idCard,h.fullname,h.mobilephone,h.bookingCode,v.name as brand,v.price,v.photo as photo,c.name as category,h.rentStartDate,h.rentEndDate,
    h.qty,h.prepayment,h.status_id,s.status,DATEDIFF(h.rentEndDate,h.rentStartDate)+1 as day,v.price*h.qty*(DATEDIFF(h.rentEndDate,h.rentStartDate)+1) as totalPayment
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id join categories c on v.category_id = c.id 
    join status s on h.status_id = s.id 
    where v.name like '%${data.search!==null ? data.search : ''}%'  ${resultFillter}
    ${data.dataPages.sort !==null ? 'order by'+' '+data.dataPages.sort : ''} ${data.dataPages.order!==null ? data.dataPages.order : ''}  
    LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset}`, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.getDataHistoriesByUserIdAsync = (data,id) => new Promise((resolve, reject) => {
    console.log(id);
    var filled = ["status_id", "category_id","payment_id","date"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            if (item == "date") {
                resultFillter += `and h.rentStartDate='${data.filter[item]}' or h.rentEndDate='${data.filter[item]}'`;
            } else {
                resultFillter += ` and ${item}='${data.filter[item]}'`;
            }
        }
    });

    var sortOrderQuery = null;
    if(data.dataPages.sort!==null && data.dataPages.order!==null){
        sortOrderQuery = `order by ${data.dataPages.sort} ${data.dataPages.order}`; 
    }else{
        sortOrderQuery = 'order by h.id asc'; 
    }
 
    const query =  db.query(`select h.id,h.user_id,h.idCard,h.fullname,h.mobilephone,h.bookingCode,v.name as brand,v.price,v.photo as photo,c.name as category,h.rentStartDate,h.rentEndDate,
   h.qty,h.prepayment,h.status_id,s.status,DATEDIFF(h.rentEndDate,h.rentStartDate)+1 as day,v.price*h.qty*(DATEDIFF(h.rentEndDate,h.rentStartDate)+1) as totalPayment
   from histories h join users u on h.user_id = u.id 
   join vehicles v on h.vehicle_id = v.id join categories c on v.category_id = c.id 
   join status s on h.status_id = s.id 
   where h.user_id=? and v.name like '%${data.search!==null ? data.search : ''}%' ${resultFillter}
   ${sortOrderQuery!==null ? sortOrderQuery : ''}
   LIMIT ${data.dataPages.limit} OFFSET ${data.dataPages.offset}`,[id], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
    console.log(query.sql);
});

exports.countDataHistories = (data, cb) => {
    db.query(`select count(*) as total
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id join categories c on v.category_id = c.id 
    join status s on h.status_id = s.id 
    where concat(u.fullName,v.name,c.name,h.rentStartDate,h.rentEndDate,h.prepayment,s.status) like '%${data.search}%'`, (error, result) => {
        if (error) throw error;
        cb(result);
    });
};


exports.countDataHistoriesAsync = (data) => new Promise((resolve, reject) => {
    var filled = ["status_id", "category_id","payment_id","date"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            if (item == "date") {
                resultFillter += ` and h.rentStartDate='${data.filter[item]}' or h.rentEndDate='${data.filter[item]}'`;
            } else {
                resultFillter += ` and ${item}='${data.filter[item]}'`;
            }
        }
    });
    db.query(`select count(*) as total
  from histories h join users u on h.user_id = u.id 
  join vehicles v on h.vehicle_id = v.id join categories c on v.category_id = c.id 
  join status s on h.status_id = s.id 
  where v.name like '%${data.search!==null ? data.search : ''}%'  ${resultFillter}`, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.countDataHistoriesByUserIdAsync = (data,id) => new Promise((resolve, reject) => {
    var filled = ["status_id", "category_id","payment_id","date"];
    var resultFillter = "";
    filled.forEach((item) => {
        if (data.filter[item]) {
            if (item == "date") {
                resultFillter += ` and h.rentStartDate='${data.filter[item]}' or h.rentEndDate='${data.filter[item]}'`;
            } else {
                resultFillter += ` and ${item}='${data.filter[item]}'`;
            }
        }
    });
    db.query(`select count(*) as total
 from histories h join users u on h.user_id = u.id 
 join vehicles v on h.vehicle_id = v.id join categories c on v.category_id = c.id 
 join status s on h.status_id = s.id 
 where h.user_id = ? and v.name like '%${data.search!==null ? data.search : ''}%'  ${resultFillter}`,[id], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.getDataHistory = (id, cb) => {
    db.query(`select h.id,h.user_id,h.bookingCode,h.idCard,h.fullname,h.emailAddress,h.location,h.mobilePhone,v.name as brand,v.price,concat('${APP_URL}/',v.photo) as photo,c.name as category,h.rentStartDate,h.rentEndDate,h.qty,h.prepayment,h.payment_type,s.status,DATEDIFF(h.rentEndDate,h.rentStartDate)+1 as day,v.price*h.qty*(DATEDIFF(h.rentEndDate,h.rentStartDate)+1) as totalPayment, h.bookingCode,h.paymentCode,h.createdAt
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id 
    join categories c on v.category_id = c.id
    join status s on h.status_id = s.id 
    where h.id=?`, [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataHistoryAsync = (id) => new Promise((resolve, reject) => {
    db.query(`select h.id,h.user_id,h.bookingCode,h.idCard,h.fullname,h.emailAddress,h.location,h.mobilePhone,v.name as brand,v.price,v.photo as photo,c.name as category,h.rentStartDate,h.rentEndDate,h.qty,h.prepayment,h.payment_type,h.status_id,s.status,DATEDIFF(h.rentEndDate,h.rentStartDate)+1 as day,v.price*h.qty*(DATEDIFF(h.rentEndDate,h.rentStartDate)+1) as totalPayment,h.payment_id,h.createdAt
    from histories h join users u on h.user_id = u.id 
    join vehicles v on h.vehicle_id = v.id 
    join categories c on v.category_id = c.id
    join status s on h.status_id = s.id 
    where h.id=?`, [id], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.getDataHistoryByIdUserAsync = (idUser) => new Promise((resolve, reject) => {
    db.query(`select * from histories where user_id=?`, [idUser], (error, results) => {
        if (error) reject(error);
        resolve(results);
    });
});

exports.getDataHistoryByIdUser = (idUser, cb) => {
    db.query(`select * from histories where user_id=?`, [idUser], (error, results) => {
        if (error) throw error;
        cb(results);
    });
};

exports.getDataHistoryByIdVehicle = (idVehicle, cb) => {
    db.query(`select * 
from histories 
where vehicle_id=?`, [idVehicle], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataHistoryByIdVehicleAsync = (idVehicle) => new Promise((resolve, reject) => {
    db.query(`select * 
  from histories 
  where vehicle_id=?`, [idVehicle], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.getDataHistoryByIdStatus = (idStatus, cb) => {
    db.query(`select * 
from histories 
where h.status_id=?`, [idStatus], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.getDataHistoryByIdStatusAsync = (idStatus) => new Promise((resolve, reject) => {
    db.query('select * from `histories` where status_id=?', [idStatus], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.insertDataHistory = (data, cb) => {
    db.query(`insert into histories set ? `, [data], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.insertDataHistoryAsync = (data) => new Promise((resolve, reject) => {
    db.query(`insert into histories set ? `, [data], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});


exports.updateDataHistory = (id, data, cb) => {
    db.query('update histories set ? where id=?', [data, id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.updateDataHistoryAsync = (id, data) => new Promise((resolve, reject) => {
    db.query('update histories set ? where id=?', [data, id], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

exports.deleteDataHistory = (id, cb) => {
    db.query('delete from histories where id=?', [id], (error, result) => {
        if (error) throw error;
        cb(result);
    });
};

exports.deleteDataHistoryAsync = (id) => new Promise((resolve, reject) => {
    db.query('delete from histories where id=?', [id], (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});