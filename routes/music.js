const express = require("express");

const musicController = require("../controllers/musicController");
const multer = require('multer');

const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },

    //add back the extension
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

//upload parameters for multer
const upload = multer({
    storage: storage
});


const router = express.Router();

router.get('/', musicController.getAllMusic);
router.get('/category/:category', musicController.getMusicByCategory);
router.get('/genre/:genre', musicController.getMusicByGenre);
router.get('/:_id', musicController.getMusicByID);
router.post('/', upload.single('mp3file'), musicController.addMusic);
router.patch('/:_id', musicController.updateMusicByID);
router.delete('/:_id', musicController.deleteMusicByID);

module.exports = router;