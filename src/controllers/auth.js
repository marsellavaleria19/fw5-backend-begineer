const userModel = require('../models/users');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const showApi = require('../helpers/showApi');
const validationDataUser = require('../helpers/validation');
const { APP_SECRET } = process.env;
const verifyUser = require("../helpers/auth");

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

module.exports = { login, register };