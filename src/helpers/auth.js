const jwt = require('jsonwebtoken');
const showApi = require('../helpers/showApi');
const { APP_SECRET } = process.env;

exports.verifyUser = (req, res, next) => {
    const auth = req.headers.authorization;
    console.log(auth);
    if (auth.startsWith("Bearer")) {
        const token = auth.split(' ')[1];
        if (token) {
            try {
                const payload = jwt.verify(token, APP_SECRET);
                req.user = payload;
                if(payload.role=="customer"){
                    if (jwt.verify(token, APP_SECRET)) {
                        return next();
                    } else {
                        return showApi.showResponse(res, 'User not verified!',null,null,null, 403);
                    }
                }else{
                    return showApi.showResponse(res, 'You must login as customer!',null,null,null, 403);
                }
              
            } catch (err) {
                return showApi.showResponse(res, 'User not verified!', null,null,null, 403);
            }
        } else {
            return showApi.showResponse(res, 'Token must be provided!', null,null,null, 403);
        }
    }
};

exports.verifyAdmin = (req, res, next) => {
    const auth = req.headers.authorization;
    console.log(auth);
    if (auth.startsWith("Bearer")) {
        const token = auth.split(' ')[1];
        if (token) {
            try {
                const payload = jwt.verify(token, APP_SECRET);
                req.user = payload;
                if(payload.role=="admin"){
                    if (jwt.verify(token, APP_SECRET)) {
                        return next();
                    } else {
                        return showApi.showResponse(res, 'User not verified!',null,null,null, 403);
                    }
                }else{
                    return showApi.showResponse(res, 'You must login as admin!',null,null,null, 403);
                }
             
            } catch (err) {
                return showApi.showResponse(res, 'User not verified!', null,null,null, 403);
            }
        } else {
            return showApi.showResponse(res, 'Token must be provided!', null,null,null, 403);
        }
    }
};