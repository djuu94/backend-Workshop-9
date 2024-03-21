const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimatedHours: {
        type: Number,
        required: true
    },
    steps: [{
        title: String,
        done: Boolean,
        description: String,
        link: String,
        comment:String
    }] 
}); 

module.exports = mongoose.model('LearningPath', learningPathSchema);
