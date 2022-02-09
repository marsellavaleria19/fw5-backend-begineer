const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const extension = file.originalname.substring(3);
        console.log(extension);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;