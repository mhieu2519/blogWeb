// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const slugify = require('slugify');
const { v2: cloudinary } = require('cloudinary');
const Comment = require('../models/Comment');
// Lưu cache lượt xem bằng IP tạm (giản đơn)
const viewCache = {};
// Tạo bài viết mới
router.post('/posts', async (req, res) => {
    try {
        const { title, content, tags, coverImageUrl, publicId, author } = req.body;
        const slug = slugify(title, { lower: true });
        const tagsSafe = (Array.isArray(tags) && tags.length > 0) ? tags : ['chưa gắn tag'];
        const newPost = new Post({ title, slug, content, tags: tagsSafe, coverImageUrl, publicId, author });
        await newPost.save();

        res.status(201).json({ message: 'Bài viết đã được tạo!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy tất cả bài viết
router.get('/posts', async (req, res) => {
    const query = {};

    if (req.query.author) {
        query.author = req.query.author;
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });
    res.json(posts);
});


// Lấy bài viết chi tiết
router.get('/posts/:slug', async (req, res) => {
    // console.log('📥 Backend nhận slug:', req.params.slug); // 👈 THÊM dòng này
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    res.json(post);
});
// Cập nhật bài viết
router.put('/posts/:slug', async (req, res) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        );

        if (!updatedPost) return res.status(404).json({ error: 'Không tìm thấy bài viết' });

        res.json({ message: 'Bài viết đã được cập nhật!', post: updatedPost });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Xoá bài viết
router.delete('/posts/:slug', async (req, res) => {
    const { authorEmail, role } = req.body; // 👈 gửi từ frontend
    try {
        const post = await Post.findOneAndDelete({ slug: req.params.slug });
        if (!post) return res.status(404).json({ error: 'Không tìm thấy bài viết' });
        // ✅ Nếu không phải admin và không phải tác giả thì chặn xoá
        if (role !== 'admin' && post.author !== authorEmail) {
            return res.status(403).json({ error: 'Bạn không có quyền xoá bài viết này' });
        }


        // ❗ Nếu bài viết có ảnh, xoá khỏi Cloudinary
        if (post.publicId) {
            await cloudinary.uploader.destroy(post.publicId);
        }
        // xóa các bình luận liên quan
        await Comment.deleteMany({ postSlug: post.slug });
        await Post.deleteOne({ slug: req.params.slug });
        res.status(200).json({ message: '🗑️ Bài viết đã được xoá' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// xóa bài hàng loạt
router.post('/posts/delete-multiple', async (req, res) => {
    const { slugs, role, authorEmail } = req.body;
    if (!Array.isArray(slugs)) return res.status(400).json({ error: 'Danh sách slug không hợp lệ' });

    try {
        const posts = await Post.find({ slug: { $in: slugs } });

        const unauthorized = posts.find(post => role !== 'admin' && post.author !== authorEmail);
        if (unauthorized) return res.status(403).json({ error: 'Bạn không có quyền xoá một số bài viết' });

        for (const post of posts) {
            if (post.publicId) {
                await cloudinary.uploader.destroy(post.publicId);
            }
            await Comment.deleteMany({ postSlug: post.slug });
        }

        await Post.deleteMany({ slug: { $in: slugs } });
        res.json({ message: `🗑️ Đã xoá ${slugs.length} bài viết` });
    } catch (err) {
        console.error('Error deleting multiple posts:', err);
        res.status(500).json({ error: err.message });
    }
});


// /api/search?q=abc&page=1&tag=tag1&tag=tag2
router.get('/search', async (req, res) => {
    const q = req.query.q || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const tags = Array.isArray(req.query.tag)
        ? req.query.tag
        : req.query.tag ? [req.query.tag] : [];

    const filter = {
        title: { $regex: q, $options: 'i' },
    };

    if (tags.length > 0) {
        filter.tags = { $in: tags };
    }

    try {
        const total = await Post.countDocuments(filter);
        const posts = await Post.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({ total, posts });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// /api/tags → trả về danh sách tag không trùng lặp
router.get('/tags', async (req, res) => {
    try {
        const tags = await Post.distinct('tags');
        res.json(tags);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
});
router.post('/posts/:id/view', async (req, res) => {
    const postId = req.params.id;
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';

    const cacheKey = `${postId}_${ip}`;
    const now = Date.now();

    // Nếu IP đã xem trong vòng 2 phút → bỏ qua
    if (viewCache[cacheKey] && now - viewCache[cacheKey] < 2 * 60 * 1000) {
        return res.status(200).json({ message: 'View recently counted' });
    }

    viewCache[cacheKey] = now; // Đánh dấu đã xem

    try {
        const post = await Post.findByIdAndUpdate(
            postId,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!post) return res.status(404).json({ error: 'Post not found' });

        return res.json({ views: post.views });
    } catch (err) {
        console.error('Error updating views:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// /api/posts/top
router.get('/posts/top', async (req, res) => {
    try {
        const topPosts = await Post.find({})
            .sort({ views: -1 })
            .limit(5); // top 5 nhiều views

        res.json(topPosts);
    } catch (err) {
        console.error('Error fetching top posts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const posts = await Post.find();

        const totalPosts = posts.length;
        const totalViews = posts.reduce((acc, post) => acc + (post.views || 0), 0);

        // Thống kê tag
        const tagMap = {};
        posts.forEach(post => {
            (post.tags || []).forEach(tag => {
                tagMap[tag] = (tagMap[tag] || 0) + 1;
            });
        });

        const topTags = Object.entries(tagMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([tag, count]) => ({ tag, count }));

        res.json({
            totalPosts,
            totalViews,
            topTags,
        });
    } catch (err) {
        console.error('Error generating stats:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// routes/post.js
router.get('/stats/summary', async (req, res) => {
    const days = parseInt(req.query.days || '7');
    const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    try {
        const posts = await Post.find({ createdAt: { $gte: sinceDate } });

        const totalPosts = posts.length;
        const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

        const tagMap = {};
        posts.forEach(post => {
            (post.tags || []).forEach(tag => {
                tagMap[tag] = (tagMap[tag] || 0) + 1;
            });
        });

        const topTags = Object.entries(tagMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([tag, count]) => ({ tag, count }));

        const dailyViews = await Post.aggregate([
            { $match: { createdAt: { $gte: sinceDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    views: { $sum: '$views' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ totalPosts, totalViews, topTags, dailyViews });
    } catch (err) {
        console.error('Stats error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
