const userModel = require('../models/users');
const forgotPasswordModel = require('../models/forgotPassword');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const showApi = require('../helpers/showApi');
const validationDataUser = require('../helpers/validation');
const { APP_SECRET, APP_EMAIL } = process.env;
const verifyUser = require("../helpers/auth");
const mail = require('../helpers/mail');

const login = async(req, res) => {
    let dataJson = { response: res, message: '' };
    const { email, password } = req.body;
    const dataLogin = { email, password };
    var errValidation = await validationDataUser.validationLogin(dataLogin);
    if (errValidation == null) {
        const result = await userModel.getDataUserEmailAsync(email, null);
        if (result.length > 0) {
            const { password: hashPassword } = result[0];
            const checkPassword = await argon.verify(hashPassword, password);

            if (checkPassword) {
                const data = { id: result[0].id };
                const token = jwt.sign(data, APP_SECRET);
                dataJson = {...dataJson, message: "Login Success!", result: { token } };
                return showApi.showSuccess(dataJson);
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
    const { fullName, username, email, password } = req.body;
    const data = { fullName, username, email, password };
    let dataJson = { response: res, message: '' };
    var errValidation = await validationDataUser.validationRegister(data);
    req.status = "Register";
    if (errValidation == null) {
        const hashPassword = await argon.hash(data.password);
        data.password = hashPassword;
        const resultRegister = await userModel.insertDataUserAsync(data);
        if (resultRegister.affectedRows > 0) {
            const data = { id: resultRegister.insertId };
            const token = jwt.sign(data, APP_SECRET);
            if (verifyUser.verifyUser(req, res, null)) {
                const updateVerifyUser = await userModel.updateDataUserAsync(resultRegister.insertId, { isVerified: 1 });
                try {
                    if (updateVerifyUser.affectedRows > 0) {
                        dataJson = {...dataJson, message: "Registration Success", result: { token } };
                        return showApi.showSuccess(dataJson);
                    } else {
                        dataJson = {...dataJson, message: "Registration Failed", status: 500 };
                        return showApi.showError(dataJson);
                    }
                } catch (err) {
                    dataJson = {...dataJson, message: err.message, status: 500 };
                    return showApi.showError(dataJson);
                }

            } else {
                dataJson = {...dataJson, message: "Data user not verify", status: 500 };
                return showApi.showError(dataJson);
            }
        }
    } else {
        dataJson = {...dataJson, message: "Data Register not valid.", status: 400, error: errValidation };
        return showApi.showError(dataJson);
    }
};

const forgotPassword = async(req, res) => {
    const { email, code, password, confirmPassword } = req.body;
    const data = { email, code, password, confirmPassword };
    var errValidation = await validationDataUser.validationForgotPassword(data);
    let dataJson = { response: res, message: '' };
    if (!data.code) {
        if (errValidation == null) {
            const getDataUser = await userModel.getDataUserEmailAsync(email);
            let randomCode = Math.round(Math.random() * (999999 - 100000) - 100000);
            if (randomCode < 0) {
                randomCode = (randomCode * -1);
            }
            const reset = await forgotPasswordModel.insertForgotPassword(getDataUser[0].id, randomCode);
            if (reset.affectedRows >= 1) {
                await mail.sendMail({
                    from: APP_EMAIL,
                    to: email,
                    subject: 'Reset Your Password | Backend Beginner',
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

module.exports = { login, register, forgotPassword };