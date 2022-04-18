/* eslint-disable no-unused-vars */
const userModel = require('../models/users');
const forgotPasswordModel = require('../models/forgotPassword');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const showApi = require('../helpers/showApi');
const validation = require('../helpers/validation');
const { APP_SECRET, APP_EMAIL } = process.env;
const verifyUser = require("../helpers/auth");
const mail = require('../helpers/mail');
const emailVerificationModel = require('../models/emailVerification');
const { get } = require('express/lib/request');

const login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const dataLogin = { email, password };
        const requirement = {
            email :'required|email',
            password : 'required'
        };
        var validate = await validation.validation(dataLogin,requirement);
        if (Object.keys(validate).length == 0) {
            const result = await userModel.getDataUserEmailAsync(email, null);
            if (result.length > 0) {
                const { password: hashPassword } = result[0];
                const checkPassword = await argon.verify(hashPassword, password);
  
                if (checkPassword) {
                    // if (result[0].isVerified == 1) {
                    const data = { id: result[0].id,role:result[0].role };
                    const token = jwt.sign(data, APP_SECRET);
                    //  dataJson = {...dataJson, message: "Login Success!", result: { token } };
                    return showApi.showResponse(res,"Login success!",{token});
                    // } else {
                    //     dataJson = {...dataJson, message: "User not authorized!", status: 404 };
                    //     return showApi.showError(dataJson);
                    // }
  
                } else {
                    //  dataJson = {...dataJson, message: "Wrong email or password", status: 400 };
                    return showApi.showResponse(res,"Wrong email or password.",null,null,null,400);
                }
  
            } else {
                // dataJson = {...dataJson, message: "Wrong email or password", status: 400 };
                return showApi.showResponse(res,"Wrong email or password.",null,null,null,400);
            }
        } else {
            //   dataJson = {...dataJson, message: "Data not valid", status: 400, error: errValidation };
            return showApi.showResponse(res,"Data not valid",null,null,validate,400);
        }  
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500);
    }
    
};

const addCheckUser = async(data,validate,id)=>{
    var result = {}; 
    if(Object.keys(data).length > 0){
        if(!validate.email && data.email){
            const dataEmail = await userModel.getDataUserEmailAsync(data.email,id);
            if(dataEmail.length > 0){
                result.email = "Email has already used.";
            }
        }
  
        if(!validate.username && data.username){
            const dataUsername = await userModel.getDataUserUsernameAsync(data.username,id);
            if(dataUsername.length > 0){
                result.username = "username has already used.";
            }
        }
    }
    return result;
};

const register = async(req, res) => {
    try{
        const { fullName, username, email, password ,mobileNumber} = req.body;
        const data = { fullName, username, email, password,mobileNumber };
        const requirement = {fullName:'required',username:'required',email:'required|email',password:'required',mobileNumber:'required|phone'};
        let dataJson = { response: res, message: '' };
        var validate = await validation.validation(data,requirement);
        validate = {...validate,...await addCheckUser(data,validate)};
        if (Object.keys(validate).length == 0) {
            const hashPassword = await argon.hash(data.password);
            data.password = hashPassword;
            const resultRegister = await userModel.insertDataUserAsync(data);
            if (resultRegister.affectedRows > 0) {
                //  dataJson = {...dataJson, message: "Registration Successfully!" };
                return showApi.showResponse(res,"Registration Successfully.");
                // let randomCode = Math.round(Math.random() * (9999999 - 100000) - 100000);
                // if (randomCode < 0) {
                //     randomCode = (randomCode * -1);
                // }
                // const reset = await emailVerificationModel.insertEmailVerification(resultRegister.insertId, randomCode);
                // if (reset.affectedRows >= 1) {
                //     await mail.sendMail({
                //         from: APP_EMAIL,
                //         to: email,
                //         subject: 'Email Verification',
                //         text: String(randomCode),
                //         html: `This is your email verification code : <b>${randomCode}</b>`
                //     });
                //     dataJson = {...dataJson, message: "Email Verification has been sent to your email!" };
                //     return showApi.showSuccess(dataJson);
                // } else {
                //     dataJson = {...dataJson, message: "Email Verification failed to send." };
                //     return showApi.showSuccess(dataJson);
                // }
            } else {
                //  dataJson = {...dataJson, message: "Registration failed to create!" };
                return showApi.showResponse(res,"Registration failed to create.",null,null,null,500);
            }
        } else {
            //   dataJson = {...dataJson, message: "Data Register not valid.", status: 400, error: errValidation };
            return showApi.showResponse(res,"Data register not valid.",null,null,null,400);
        }
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500);
    }
    
};

const emailVerification = async(req, res) => {
    try{
        const { email, code, password } = req.body;
        console.log(req.body);
        const data = { email, code, password };
        var errValidation = await validation.validationEmailVerification(data);
        if(!data.code){
            if(errValidation==null){
                const getDataUser = await userModel.getDataUserEmailAsync(email);
                let randomCode = Math.abs(Math.floor(Math.random() * (999999 - 100000) + 100000));
                const reset = await emailVerificationModel.insertEmailVerification(getDataUser[0].id, randomCode);
                if (reset.affectedRows >= 1) {
                    await mail.sendMail({
                        from: APP_EMAIL,
                        to: email,
                        subject: 'Email Verification',
                        text: String(randomCode),
                        html: `This is your email verification code : <b>${randomCode}</b>`
                    });
                    return showApi.showResponse(res,"Email verification has been sent to your email.");
                } else {
                    return showApi.showResponse(res,"Email verification failed to send.",null,null,null,500);
                }
            }else{
                return showApi.showResponse(res,"Data register not valid.",null,null,null,400);
            }
        }else{
            if(data.email){
                if (errValidation == null) {
                    const user = await userModel.getDataUserEmailAsync(data.email, null);
                    const { password: hashPassword } = user[0];
                    const checkPassword = await argon.verify(hashPassword, password);
                    if (checkPassword) {
                        const getEmailVerification = await emailVerificationModel.getEmailVerificationByCode(code);
                        const updateUser = await userModel.updateDataUserAsync(getEmailVerification[0].user_id, { isVerified: 1 });
                        const dataUser = await userModel.getDataUserAsync(getEmailVerification[0].user_id);
                        if (updateUser.affectedRows > 0) {
                            const updateExpired = await emailVerificationModel.updateEmailVerification({ isExpired: 1 }, getEmailVerification[0].id);
                            if (updateExpired.affectedRows > 0) {
                                return showApi.showResponse(res,"Email has been verified.",dataUser[0]);
                            } else {
                                return showApi.showResponse(res,"Email verification failed to verify.",null,null,null,500);
                            }
                        } else {
                            return showApi.showResponse(res,"User failed to update",null,null,null,500);
                        }
                    }
                } else {
                    return showApi.showResponse(res,"Data not valid.",null,null,errValidation,400);
                }
            }
        }
    
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500);
    }
    
};

const forgotPassword = async(req, res) => {
    try{
        const { email, code, password, confirmPassword } = req.body;
        const data = { email, code, password, confirmPassword };
        var errValidation = await validation.validationForgotPassword(data);
        if (!data.code) {
            if (errValidation == null) {
                const getDataUser = await userModel.getDataUserEmailAsync(email);
                let randomCode = Math.abs(Math.floor(Math.random() * (999999 - 100000) + 100000));
                const reset = await forgotPasswordModel.insertForgotPassword(getDataUser[0].id, randomCode);
                if (reset.affectedRows >= 1) {
                    await mail.sendMail({
                        from: APP_EMAIL,
                        to: email,
                        subject: 'Reset Your Password',
                        text: String(randomCode),
                        html: `<b>${randomCode}</b>`
                    });
                    return showApi.showResponse(res,"Forgot Password's code has been sent to your email.");
                } else {
                    return showApi.showResponse(res,"Unexpected error",null,null,null,500);
                }
            } else {
                return showApi.showResponse(res,"Data not valid.",null,null,errValidation,400);
            }
        } else {
            if (data.email) {
                if (errValidation == null) {
                    const resultDataForgotPassword = await forgotPasswordModel.getForgotPassword(data.code);
                    const user = await userModel.getDataUserAsync(resultDataForgotPassword[0].user_id);
                    if (data.password == data.confirmPassword) {
                        const hashPassword = await argon.hash(data.password);
                        data.password = hashPassword;
                        const update = await userModel.updateDataUserAsync(user[0].id, { password: data.password });
                        if (update.affectedRows > 0) {
                            const updateForgotPassword = await forgotPasswordModel.updateForgotPassword({ isExpired: 1 }, resultDataForgotPassword[0].id);
                            if (updateForgotPassword.affectedRows > 0) {
                                return showApi.showResponse(res,"Password has been reset.");
                            } else {
                                return showApi.showResponse(res,"Unexpected error update data forgot password",null,null,null,500);
                            }
                        } else {
                            return showApi.showResponse(res,"Unexpected error update data user",null,null,null,500);
                        }
                    } else {
                        return showApi.showResponse(res,"Confirm password not same as password.",null,null,null,400);
                    }
                } else {
                    return showApi.showResponse(res,"Data not valid.",null,null,errValidation,400);
                }
            }
        }  
    }catch(error){
        return showApi.showResponse(res,error.message,null,null,null,500);
    }
   
};

module.exports = { login, register, forgotPassword, emailVerification };