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
    try {
        const { email, password } = req.body;
        const result = await userModel.getDataUserEmailAsync(email, null);
        // console.log(result);
        if (result.length == 1) {
            const { password: hashPassword } = result[0];
            const checkPassword = await argon.verify(hashPassword, password);

            if (checkPassword) {
                // const data = result[0];
                const data = { id: result[0].id };
                const token = jwt.sign(data, APP_SECRET);
                return showApi.showResponse(res, "Login Success!", { token });
            } else {
                return showApi.showResponse(res, "Wrong email or password!", null, 400);
            }

        } else {
            return showApi.showResponse(res, "Wrong email and password!", null, 400);
        }
    } catch (err) {
        return showApi.showResponse(res, err.message, null, 400);
    }

};

const register = async(req, res) => {
    const { fullName, username, email, password } = req.body;
    const data = { fullName, username, email, password };
    // console.log(data);
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
                        return showApi.showResponse(res, "Registration Success!", { token });
                    } else {
                        return showApi.showResponse(res, "Registration failed!", null, 500);
                    }
                } catch (err) {
                    return showApi.showResponse(res, err.message, null, 500);
                }

            } else {
                return showApi.showResponse(res, "Data user verify!", null);
            }
        }
    } else {
        return showApi.showResponse(res, "Data Register not valid.", errValidation, 400);
    }
};

const forgotPassword = async(req, res) => {
    const { email, code, password, confirmPassword } = req.body;
    const data = { email, code, password, confirmPassword };
    var errValidation = await validationDataUser.validationForgotPassword(data);
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
                return showApi.showResponse(res, 'Forgot Password request has been sent to your email!');
            } else {
                return showApi.showResponse(res, 'Unexpected Error', null, 500);
            }
        } else {
            return showApi.showResponse(res, 'Data not valid!', errValidation, 400);
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
                        console.log(updateForgotPassword.affectedRows);
                        if (updateForgotPassword.affectedRows > 0) {
                            return showApi.showResponse(res, 'Password has been reset!');
                        } else {
                            return showApi.showResponse(res, 'Unexpected Error Update data forgot password', null, 500);
                        }
                    } else {
                        return showApi.showResponse(res, 'Unexpected Error Update Data User', null, 500);
                    }
                } else {
                    return showApi.showResponse(res, 'Confirm password not same as password', null, 400);
                }
            } else {
                return showApi.showResponse(res, 'Data not valid!', errValidation, 400);
            }
        }
    }

};

module.exports = { login, register, forgotPassword };