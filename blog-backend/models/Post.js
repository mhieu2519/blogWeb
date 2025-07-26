// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, unique: true },
    content: String,
    coverImageUrl: String,
    publicId: String,
    tags: [String],
    author: String,
    createdAt: { type: Date, default: Date.now },
    views: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('Post', PostSchema);
