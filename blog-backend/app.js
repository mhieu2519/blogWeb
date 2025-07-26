// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const postRoutes = require('./routes/post');
app.use('/api', postRoutes);
const uploadRoutes = require('./routes/upload');
app.use('/api', uploadRoutes);
const userRoutes = require('./routes/user');
app.use('/api', userRoutes);
const commentRoutes = require('./routes/comments');
app.use('/api/comments', commentRoutes);


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
