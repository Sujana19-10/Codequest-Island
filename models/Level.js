const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
    levelNumber: Number,
    question: String,
    language: String,
    timeLimit: Number,
    points: Number,
});

module.exports = mongoose.model('Level', LevelSchema);
