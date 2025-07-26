const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Lấy bình luận theo bài viết
router.get('/:slug', async (req, res) => {
    const comments = await Comment.find({ postSlug: req.params.slug }).sort({ createdAt: -1 });
    res.json(comments);
});

// Tạo bình luận mới
router.post('/', async (req, res) => {
    const { postSlug, authorEmail, authorName, authorImage, content } = req.body;
    const comment = new Comment({ postSlug, authorEmail, authorName, authorImage, content });
    await comment.save();
    res.status(201).json(comment);
});
// Cập nhật bình luận
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách bình luận' });
    }
});
// xóa bình luận đơn lẻ
router.delete('/:id', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: '🗑️ Bình luận đã xoá' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi xoá bình luận' });
    }
});
// xóa nhiều bình luận 
router.post('/delete-multiple', async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids)) return res.status(400).json({ error: 'Danh sách ID không hợp lệ' });

    try {
        await Comment.deleteMany({ _id: { $in: ids } });
        res.json({ message: `🗑️ Đã xoá ${ids.length} bình luận` });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi xoá hàng loạt' });
    }
});


module.exports = router;
