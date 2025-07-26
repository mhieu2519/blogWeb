const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Cấu hình lưu trữ vào Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'blog_images', // thư mục lưu trong Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const parser = multer({ storage });

// API: POST /api/upload
router.post('/upload', parser.single('image'), (req, res) => {
    res.json({
        url: req.file.path,
        public_id: req.file.filename,
    });
});

module.exports = router;
