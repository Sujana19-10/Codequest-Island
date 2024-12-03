const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username: { type: String, required: true },
    Useryear: { type: String, required: true },
    Userhallticketno: { 
        type: Number, 
        required: true, 
        min: [1, 'Userhallticketno must be at least 1.'], // Minimum value is 1
        max: [300, 'Userhallticketno must not exceed 300.'] // Maximum value is 999
    },
    level: { type: Number, default: 0 }, // Optional level field with default value
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
