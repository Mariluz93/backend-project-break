const upload = require('./uploadCloudinaryMiddleware.js');

function uploadSingleImage(req, res, next) {
    const handler = upload.single('image');

    handler(req, res, (err) => {
        if (err) {
            console.error('UPLOAD ERROR:', err);
            return res.status(400).send(err.message || 'Error uploading image');
        }
        next();
    });
}

module.exports = uploadSingleImage;