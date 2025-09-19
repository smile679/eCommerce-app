const express = require('express');
const handleImageUpoad = require('../../controllers/admin/Product-controller');
const { upload } = require('../../helpers/cloudinary')


const router = express.Router();

router.post('/upload-image', upload.single('file_path'), handleImageUpoad)

module.exports = router;