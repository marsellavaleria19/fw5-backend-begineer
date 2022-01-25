const { response } = require('express')
const express = require('express')
const res = require('express/lib/response')

var app = express()

app.use(express.urlencoded({ extended: true }))

var mysql = require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicle'
})


var cek = true;

var dataVehicle = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from vehicle_rent', function(error, results) {
            if (!error) {
                return resolve(results)
            } else {
                return reject(error)
            }
        })
    })
}


app.get('/', async(request, response) => {
    try {
        let results = await dataVehicle()
        return response.json({
            success: true,
            message: 'List of Vehicle Rent',
            data: results
        })
    } catch (err) {
        return err
    }

})

app.post('/register', (request, response) => {
    db.query(`insert into vehicle_rent (customer_name,vehicle_number,vehicle_type,rent_date,rent_total) 
    values(
        '${request.body.customerName}','${request.body.vehicleNumber}',
        '${request.body.vehicleType}','${request.body.rentDate}',
        ${request.body.rentTotal})`, (error, results) => {
        if (!error) {
            cek = true
        } else {
            cek = false
        }
    })

    return cek ? response.json({
        success: true,
        message: 'Data Rental Kendaraan berhasil dimasukkan!',
    }) : response.json({
        success: false,
        message: 'Data Rental Kendaraan gagal dimasukkan! ',
    })
})

app.put('/vehiclerent/:id', (request, response) => {
    const { id } = request.params
    db.query(`update vehicle_rent set 
    customer_name = '${request.body.customerName}',
    vehicle_number = '${request.body.vehicleNumber}',
    vehicle_type ='${request.body.vehicleType}' ,
    rent_date = '${request.body.rentDate}',
    rent_total =   ${request.body.rentTotal} 
    where id = ${id}`, (error, results) => {
        if (!error) {
            cek = true
        } else {
            cek = false
        }
    })

    return cek ? response.json({
        success: true,
        message: 'Data Rental Kendaraan berhasil diubah!',
    }) : response.json({
        success: false,
        message: 'Data Rental Kendaraan gagal diubah! ',
    })
})

app.delete('/vehiclerent/:id', (request, response) => {
    const { id } = request.params
    db.query(`delete from vehicle_rent 
    where id = ${id}`, (error, results) => {
        if (!error) {
            cek = true
        } else {
            cek = false
        }
    })

    return cek ? response.json({
        success: true,
        message: 'Data Rental Kendaraan berhasil dihapus!',
    }) : response.json({
        success: false,
        message: 'Data Rental Kendaraan gagal dihapus! ',
    })
})

app.listen(5000, () => {
    console.log('App running on port 5000')
})