# RVRENTAL BACKEND

## DESCRIPTION
This is the Backend API repository from RVRental. This repository generates a program that can access RV Rental data with an API. This program can make it easier for us to retrieve data from the database by accessing the available links or endpoints.
Links or end points provided to access user data, vehicles, history, categories, status and others.
 
#### User Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /users | Get all data user|
| ```GET``` | /users?name=xx | Get all data user by name |
| ```GET``` | /users?pagexx&limit=xx | Get all data User with pagination |
| ```GET``` | /users?sort=xx&order=xx | Get data user by sorting and order |
| ```GET``` | /users/:id | Get data user by id |
| ```POST``` | /users | Create data user|
| ```PUT``` | /users/:id | update data user by id|
| ```DELETE``` | /users/:id | delete data user by id|

#### Category Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /categories | Get all data category|
| ```GET``` | /categories?search=xx | Get all data category by category name |
| ```GET``` | /categories?pagexx&limit=xx | Get all data category with pagination |
| ```GET``` | /categories?sort=xx&order=xx | Get data category by sorting and order |
| ```GET``` | /categories/:id | Get data category by id |
| ```POST``` | /categories | Create data category|
| ```PUT``` | /categories/:id | update data category by id|
| ```DELETE``` | /categories/:id | delete data category by id|

#### Status Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /status | Get all data status|
| ```GET``` | /status?search=xx | Get all data status by status name |
| ```GET``` | /status?pagexx&limit=xx | Get all data status with pagination |
| ```GET``` | /status?sort=xx&order=xx | Get data status by sorting and order |
| ```GET``` | /status/:id | Get data status by id |
| ```POST``` | /status | Create data status|
| ```PUT``` | /status/:id | update data status by id|
| ```DELETE``` | /status/:id | delete data status by id|

#### Location Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /locations | Get all data location|
| ```GET``` | /locations?search=xx | Get all data location by location name |
| ```GET``` | /locations?pagexx&limit=xx | Get all data location with pagination |
| ```GET``` | /locations?sort=xx&order=xx | Get data location by sorting and order |
| ```GET``` | /locations/:id | Get data location by id |
| ```POST``` | /locations | Create data location|
| ```PUT``` | /locations/:id | update data location by id|
| ```DELETE``` | /locations/:id | delete data location by id|

#### payment type Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /payment-types | Get all data payment type |
| ```GET``` | /payment-types?search=xx | Get all data payment type by payment type name |
| ```GET``` | /payment-types?pagexx&limit=xx | Get all data payment type with pagination |
| ```GET``` | /payment-types?sort=xx&order=xx | Get data payment type by sorting and order |
| ```GET``` | /payment-types/:id | Get data  payment type by id |
| ```POST``` | /payment-types | Create data payment type|
| ```PUT``` | /payment-types/:id | update data payment type by id|
| ```DELETE``` | /payment-types/:id | delete data payment type by id|

#### Authentication Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```POST``` | /auth/login | Get all data payment type |
| ```GET``` | /payment-types?search=xx | Get all data payment type by payment type name |
| ```GET``` | /payment-types?pagexx&limit=xx | Get all data payment type with pagination |
| ```GET``` | /payment-types?sort=xx&order=xx | Get data payment type by sorting and order |
| ```GET``` | /payment-types/:id | Get data  payment type by id |
| ```POST``` | /payment-types | Create data payment type|
| ```PUT``` | /payment-types/:id | update data payment type by id|
| ```DELETE``` | /payment-types/:id | delete data payment type by id|

#### Vehicle Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /vehicles | Get all data vehicle|
| ```GET``` | /vehicles?name=xx | Get all data vehicle by name |
| ```GET``` | /vehicles?pagexx&limit=xx | Get all data vehicle with pagination |
| ```GET``` | /vehicles?sort=xx&order=xx | Get data vehicle by sorting and order |
| ```GET``` | /vehicles/category/:id | Get data vehicle by category |
| ```GET``` | /vehicles/:id | Get data vehicle by id |
| ```POST``` | /vehicles | Create data vehicle|
| ```PUT``` | /vehicles/:id | update data vehicle by id|
| ```DELETE``` | /vehicles/:id | delete data vehicle by id|

#### History Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /histories | Get all data vehicle|
| ```GET``` | /histories?search=xx | Get all data history by search |
| ```GET``` | /histories?pagexx&limit=xx | Get all data history with pagination |
| ```GET``` | /histories?sort=xx&order=xx | Get all data history by sorting and order |
| ```GET``` | /histories/:id | Get data history by id |
| ```POST``` | /histories | Create data history|
| ```PUT``` | /histories/:id | update data history by id|
| ```DELETE``` | /histories/:id | delete data history by id|

