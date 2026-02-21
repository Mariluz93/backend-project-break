const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.js');

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: 'tienda-ropa',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        };
    },
});

const upload = multer({ storage });

module.exports = upload;