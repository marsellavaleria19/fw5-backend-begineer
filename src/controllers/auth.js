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
    let dataJson = { response: res, message: '' };
    const { email, password } = req.body;
    const dataLogin = { email, password };
    var errValidation = await validation.validationLogin(dataLogin);
    if (errValidation == null) {
        const result = await userModel.getDataUserEmailAsync(email, null);
        if (result.length > 0) {
            const { password: hashPassword } = result[0];
            const checkPassword = await argon.verify(hashPassword, password);

            if (checkPassword) {
                // if (result[0].isVerified == 1) {
                const data = { id: result[0].id };
                const token = jwt.sign(data, APP_SECRET);
                dataJson = {...dataJson, message: "Login Success!", result: { token } };
                return showApi.showSuccess(dataJson);
                // } else {
                //     dataJson = {...dataJson, message: "User not authorized!", status: 404 };
                //     return showApi.showError(dataJson);
                // }

            } else {
                dataJson = {...dataJson, message: "Wrong email or password", status: 400 };
                return showApi.showError(dataJson);
            }

        } else {
            dataJson = {...dataJson, message: "Wrong email or password", status: 400 };
            return showApi.showError(dataJson);
        }
    } else {
        dataJson = {...dataJson, message: "Data not valid", status: 400, error: errValidation };
        return showApi.showError(dataJson);
    }

};


const register = async(req, res) => {
    const { fullName, username, email, password ,mobileNumber} = req.body;
    const data = { fullName, username, email, password,mobileNumber };
    let dataJson = { response: res, message: '' };
    var errValidation = await validation.validationRegister(data);
    if (errValidation == null) {
        const hashPassword = await argon.hash(data.password);
        data.password = hashPassword;
        try {
            const resultRegister = await userModel.insertDataUserAsync(data);
            if (resultRegister.affectedRows > 0) {
                dataJson = {...dataJson, message: "Registration Successfully!" };
                return showApi.showSuccess(dataJson);
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
                dataJson = {...dataJson, message: "Registration failed to create!" };
                return showApi.showSuccess(dataJson);
            }
        } catch (error) {
            dataJson = {...dataJson, message: error.message };
            return showApi.showSuccess(dataJson);
        }
    } else {
        dataJson = {...dataJson, message: "Data Register not valid.", status: 400, error: errValidation };
        return showApi.showError(dataJson);
    }
};

const emailVerification = async(req, res) => {
    console.log("Masuk verifikasi!!");
    const { email, code, password } = req.body;
    console.log(req.body);
    const data = { email, code, password };
    var errValidation = await validation.validationEmailVerification(data);
    let dataJson = { response: res, message: '' };
    if(!data.code){
        console.log("masuk 1");
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
                dataJson = {...dataJson, message: "Email Verification has been sent to your email!" };
                return showApi.showSuccess(dataJson);
            } else {
                dataJson = {...dataJson, message: "Email Verification failed to send." };
                return showApi.showSuccess(dataJson);
            }
        }else{
            dataJson = {...dataJson, message: "Data not valid.", status: 400, error: errValidation };
            return showApi.showError(dataJson);
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
                            dataJson = {...dataJson, message: "Email has been verified!",result:dataUser[0] };
                            return showApi.showSuccess(dataJson);
                        } else {
                            dataJson = {...dataJson, message: "Email Verification failed to verify!", status: 500 };
                            return showApi.showSuccess(dataJson);
                        }
                    } else {
                        dataJson = {...dataJson, message: "User failed to update!", status: 500 };
                        return showApi.showSuccess(dataJson);
                    }
                }
            } else {
                dataJson = {...dataJson, message: "Data not valid!", status: 400, error: errValidation };
                return showApi.showError(dataJson);
            }
        }
    }
  
};

const forgotPassword = async(req, res) => {
    const { email, code, password, confirmPassword } = req.body;
    const data = { email, code, password, confirmPassword };
    var errValidation = await validation.validationForgotPassword(data);
    let dataJson = { response: res, message: '' };
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
                dataJson = {...dataJson, message: "Forgot Password has been sent to your email!" };
                return showApi.showSuccess(dataJson);
            } else {
                dataJson = {...dataJson, message: "Unexpected Error.", status: 500 };
                return showApi.showError(dataJson);
            }
        } else {
            dataJson = {...dataJson, message: "Data not valid.", status: 400, error: errValidation };
            return showApi.showError(dataJson);
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
                            dataJson = {...dataJson, message: "Password has been reset!" };
                            return showApi.showSuccess(dataJson);
                        } else {
                            dataJson = {...dataJson, message: 'Unexpected Error Update data forgot password', status: 500 };
                            return showApi.showError(dataJson);
                        }
                    } else {
                        dataJson = {...dataJson, message: 'Unexpected Error Update Data User', status: 500 };
                        return showApi.showError(dataJson);
                    }
                } else {
                    dataJson = {...dataJson, message: 'Confirm password not same as password', status: 500 };
                    return showApi.showError(dataJson);
                }
            } else {
                dataJson = {...dataJson, message: 'Data not valid!', status: 400, error: errValidation };
                return showApi.showError(dataJson);
            }
        }
    }

};

module.exports = { login, register, forgotPassword, emailVerification };