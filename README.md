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
| ```PUT``` | /users/:id | update all data user by id|
| ```PATCH``` | /users/:id | update partial data user by id|
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
| ```POST``` | /auth/login | used for logging into an application with a pre-registered account |
| ```POST``` | /auth/register | used for register an account for users who do not have an account |
| ```POST``` | /auth/forgotpassword | used if the user forgets his account password. |
| ```POST``` | /auth/emailverification | used to verify the user account that the user has previously registered. |

#### Vehicle Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /vehicles | Get all data vehicle|
| ```GET``` | /vehicles?name=xx | Get all data vehicle by name |
| ```GET``` | /vehicles?pagexx&limit=xx | Get all data vehicle with pagination |
| ```GET``` | /vehicles?sort=xx&order=xx | Get data vehicle by sorting and order |
| ```GET``` | /vehicles/category/:id | Get data vehicle by category |
| ```GET``` | /vehicles/popular | Get the most popular data vehicle |
| ```GET``` | /vehicles/:id | Get data vehicle by id |
| ```POST``` | /vehicles | Create data vehicle|
| ```PATCH``` | /vehicles/:id | update partial data vehicle by id|
| ```DELETE``` | /vehicles/:id | delete data vehicle by id|

#### History Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /histories | Get all data vehicle|
| ```GET``` | /histories?search=xx | Get all data history by vehicle name |
| ```GET``` | /histories?category_id=xx&&status_id=xx&&date=XX | Get all data history by category_id and status_id|
| ```GET``` | /histories?date=XX | Get all data history by rent start date or end rent date|
| ```GET``` | /histories?pagexx&limit=xx | Get all data history with pagination |
| ```GET``` | /histories?sort=xx&order=xx | Get all data history by sorting and order |
| ```GET``` | /histories/:id | Get data history by id |
| ```POST``` | /histories | Create data history|
| ```PUT``` | /payment-types/:id | update all data history by id|
| ```PATCH``` | /histories/:id | update partial data history by id|
| ```DELETE``` | /histories/:id | delete data history by id|

#### Search Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /search?name | Get all data by vehicle name|
| ```GET``` | /search?category_id=xx&status_id=xx&location_id=xx&isAvailable | Get all data vehicle by category id, status id,location id and isAvailable |
| ```GET``` | /search?date=XX | Get all data by rent start date or end rent date|
| ```GET``` | /search?price_start=XX&price_end=xx | Get all data with range  from price start until price end|
| ```GET``` | /search?rate_start=XX&rate_end=xx | Get all data with range from price start until price end|
| ```GET``` | /search?pagexx&limit=xx | Get all data with pagination |
| ```GET``` | /search?sort=xx&order=xx | Get all data by sorting and order |

#### Profile Endpoint
| METHOD | API | REMARKS |
| :-------------: |:-------------:|:-----------:|
| ```GET``` | /profile | Get profile user account who login|

## INSTALLATION
step for install application :
1. clone github with runing code ```git clone https://github.com/marsellavaleria19/rvrental-backend.git``` in git terminal.
2. Create an .env file, then fill it with the following configuration:
  ### Application Configuration
  | CONFIG | DESCRPTION | REMARKS |
| :-------------: |:-------------:|:-----------:|
|APP_URL| filled with url API | example : http://localhost:5000|
|APP_PORT|filled with port API port has make in application | (example : 5000) |
|APP_SECRET|filled with secret key for sign jwt to get access token|(example : B4ck3nDEng1nn3r) |
|APP_REFRESH_SECRET|filled with secret key for sign jwt to get access refresh token. |(example : B4ck3nDEng1nn3rR3fr3sh)|
|TOKEN_EXPIRED|filled with time token will expred |example : 3600 (token will expried in 1 hour)|

 ### Email Configuration
  | CONFIG | DESCRPTION | REMARKS |
| :-------------: |:-------------:|:-----------:|
|APP_EMAIL|filled with email that will be used to send email to user. | |
|APP_EMAILPASS|filled with email that will be used to send email to user|  |
|SMTP_HOST|filled with smtp host will be used to send email to user | example : smtp.gmail.com (because email will be send by gmail account, so i use smtp gmail)|
|SMTP_PORT|filled with smtp port will be used to send email to user. |example : 465 (smtp port gmail)|

 ### Database Configuration
  | CONFIG | DESCRPTION | REMARKS |
| :-------------: |:-------------:|:-----------:|
|DB_HOST|filled with databse host. | example : localhost (because i use xampp, so i filled with 'localhost') |
|DB_USER|filled with database username|example : root (because i use php my admin, so i filled with 'root')|
|DB_PASSWORD|filled with database passord, if any| |
|DB_NAME|filled with database name you make in database tools |example : vehicle_rent (because i make database vehicle_rent in php my admin)|

 ### Cloudinary Configuration -- for upload image 
 Setting coludinary from account detail in dashboard cloudinary website, like this picture.
 ![image](https://user-images.githubusercontent.com/44119106/164353677-b2b38d84-1223-439b-8444-eb554c5d436a.png)

  | CONFIG | DESCRPTION |
| :-------------: |:-------------:|
|CLOUD_NAME|filled with cloud name |
|CLOUD_API_KEY|filled with APY key |
|CLOUD_API_SECRET|filled with API secret|

 ### Environment Configuration 
  | CONFIG | DESCRPTION |REMARKS
| :-------------: |:-------------:|:-------------:|
|ENVIRONMENT|filled with 'production' or 'development' | if filled with production then image will upload to cloudinary, else url will upload to localhost.|

3. install package with running code ```npm install``` in terminal
4. run application with running code ```npm run dev``` in terminal 

## DEPLOY APPLICATION
I deploy to heroku website, so step deploy in heroku :
1. Make account in heroku.
2. if you already have account, login with acount and you will redirect to dashboard like this :
![image](https://user-images.githubusercontent.com/44119106/164350079-85ffe4d2-7231-4890-9563-e757480d30fb.png)
3. Create new application with click new button and chose create new Application and will direct to page like this : 
![image](https://user-images.githubusercontent.com/44119106/164350603-d656bd85-f66f-401d-8794-8fb21804348b.png)
4. filled your application name and click create app button.
5. click your application you had made and will direct to page like this : 
![image](https://user-images.githubusercontent.com/44119106/164351007-dd96d7b7-f762-45ae-96dc-2509fddc99fb.png)
6. Click deploy tab and direct to page like this :
![image](https://user-images.githubusercontent.com/44119106/164351374-aa6f0fb4-14c5-4e6b-92a5-840674042727.png)
7. You can chose deploy with Heroku git or github. If you chose deploy from Heroku git, ypu can follow this step :
![image](https://user-images.githubusercontent.com/44119106/164351607-4265023b-2a78-46da-bf83-6499d0ef6e1f.png)
