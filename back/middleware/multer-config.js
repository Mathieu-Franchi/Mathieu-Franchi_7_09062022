const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    },
});
let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" 
        || file.mimetype == "image/jpg" 
        || file.mimetype == "image/gif" 
        || file.mimetype == "image/jpeg")
        {
            cb(null, true);
        }else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg, .gif and .jpeg format are allowed !'));
        }
    },
})
module.exports = upload.single('image');