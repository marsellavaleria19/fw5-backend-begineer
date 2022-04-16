const showApi = require('../helpers/showApi');
const userModel = require('../models/users');

const getProfile = async(request, response) => {
    try{
        const { id } = request.user;
        const dataProfile = await userModel.getDataUserAsync(id);
        if (dataProfile.length > 0) {
            return showApi.showResponse(response,"Detail Profile",dataProfile[0]);
        } else {
            return showApi.showResponse(response,"Data Profile not found",null,null,null,404);
        }
    }catch(error){
        return showApi.showResponse(response,error.message,null,null,null,500);
    }
   
};

module.exports = getProfile;