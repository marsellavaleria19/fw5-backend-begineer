/* eslint-disable no-unused-vars */
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');
const { options } = require('../routers');
const { json } = require('express/lib/response');

const { CLOUD_NAME,CLOUD_API_KEY,CLOUD_API_SECRET } = process.env;

cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: CLOUD_API_KEY, 
    api_secret: CLOUD_API_SECRET 
});

exports.deleteImage = async(publicId)=>{
    const resultImage = await cloudinary.uploader.destroy(publicId,(error,result)=>{
        if(error){
            return error;
        }
        if(result){
            return result;
        }
    });
    return resultImage;
};