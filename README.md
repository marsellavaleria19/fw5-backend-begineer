# fw5-backend-beginner

## ABOUT
This is the repository API Backend of Rent Vehicle.

## DESCRIPTION
This is an API program for Vehicle Rentals.
This program can process data in the Vehicle rental database by accessing existing links or endpoints. 
The link or end point provided to access user, vehicle, history, category, status data that has been. 
Not only that, this program can access endpoints for the most popular vehicles.
 
#### User Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /users | Get all data user|
| ```GET``` | /users?search=xx | Get all data user by search |
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
| ```GET``` | /categories?search=xx | Get all data category by search |
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
| ```GET``` | /status?search=xx | Get all data status by search |
| ```GET``` | /status?pagexx&limit=xx | Get all data status with pagination |
| ```GET``` | /status?sort=xx&order=xx | Get data status by sorting and order |
| ```GET``` | /status/:id | Get data status by id |
| ```POST``` | /status | Create data status|
| ```PUT``` | /status/:id | update data status by id|
| ```DELETE``` | /status/:id | delete data status by id|

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

#### Popular Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /popular | Get all data popular vehicle|
| ```GET``` | /popular?search=xx | Get all data popular vehicle by search |
| ```GET``` | /popular?pagexx&limit=xx | Get all data popular vehicle with pagination |
| ```GET``` | /popular?sort=xx&order=xx | Get all data popular vehicle by sorting and order |
| ```GET``` | /popular?month | Get all data popular vehicle by month |
