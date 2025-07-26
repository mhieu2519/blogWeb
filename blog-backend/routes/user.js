const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Tự động tạo user khi frontend gửi lên sau login
router.post('/users/login', async (req, res) => {
    const { googleId, name, email, image } = req.body;
    console.log('✅ Nhận dữ liệu login từ FE:', { googleId, name, email, image });
    try {
        let user = await User.findOne({ googleId });
        if (!user) {
            user = new User({ googleId, name, email, image });
            await user.save();
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi tạo tài khoản' });
    }
});
// 📥 Lấy thông tin user
router.get('/users/:email', async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'Không tìm thấy user' });
    res.json(user);
});
// ✏️ Cập nhật thông tin user
router.put('/users/:email', async (req, res) => {
    const { name, gender, birthday } = req.body;
    try {
        const updated = await User.findOneAndUpdate(
            { email: req.params.email },
            { name, gender, birthday },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/user-role', async (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: 'Thiếu email' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });

        res.json({ role: user.role, id: user._id });
    } catch (err) {
        console.error('Lỗi khi lấy role:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});
module.exports = router;
