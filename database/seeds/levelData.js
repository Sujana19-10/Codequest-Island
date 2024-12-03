const mongoose = require('mongoose');
const Level = require('../models/Level');
const dbConfig = require('./dbConfig');

mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });

const levels = [
    
];

Level.insertMany(levels).then(() => {
    console.log('Levels seeded');
    mongoose.connection.close();
});
