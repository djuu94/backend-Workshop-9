const mongoose = require('mongoose');
const learningPath =  require('./learning-path-model');


const userLearningPathSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    learningPaths: [{
        learningPath: learningPath.schema,
        startedAt:{
            type: Date,
            required: true
        },
        finishedAt: {
            type: Date,
            required: false
        }
    }]
});
  

module.exports = mongoose.model('UserLearningPath', userLearningPathSchema);
