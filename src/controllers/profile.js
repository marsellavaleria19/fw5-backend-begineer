const profileModel = require('../models/profile');

const getProfile = (request, response) => {
    const { id } = request.user;
    profileModel.getDataProfile(id, (result) => {
        if (result.length > 0) {
            return response.json({
                success: true,
                message: `Profile id ${id}`,
                results: result[0]
            });
        } else {
            return response.status(404).json({
                success: false,
                message: 'Data not found.',
            });
        }

    });
};

module.exports = getProfile;