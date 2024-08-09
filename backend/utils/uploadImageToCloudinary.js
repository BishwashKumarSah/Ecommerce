const cloudinary = require('cloudinary')
const ErrorHandler = require('./errorHandle');

const uploadFileToCloudinary = async (req, res, next) => {
    let avatar = {};
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale",
        });
        avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
        
    } catch (error) {
        
        return next(new ErrorHandler("Error Uploading User Avatar to Cloudinary", 500));
    }
    
    return avatar;
};

module.exports = { uploadFileToCloudinary };
