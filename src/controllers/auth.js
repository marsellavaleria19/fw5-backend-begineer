const userModel = require('../models/users');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const showApi = require('../helpers/showApi');
const { APP_SECRET } = process.env;

exports.login = async(req, res) => {
    const { email, password } = req.body;
    const result = await userModel.getDataUserByEmailAsync(email);
    if (result.length === 1) {
        const { password: hashPassword } = result[0];
        const checkPassword = await argon.verify(hashPassword, password);
        if (checkPassword) {
            const data = result[0];
            const token = jwt.sign(data, APP_SECRET);
            return showApi.showResponse(res, "Login Success!", { token });
        } else {
            return showApi.showResponse(res, "Wrong email or password!", null, 400);
        }
    } else {
        return showApi.showResponse(res, "Wrong email and password!", null, 400);
    }
};