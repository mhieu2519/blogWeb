const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postSlug: String,         // bài viết nào
    authorEmail: String,
    authorName: String,
    authorImage: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
