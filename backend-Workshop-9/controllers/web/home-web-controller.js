const LearningPath = require('../../models/mongodb/learning-path-model');

module.exports = {
    home: async (req, res) => {
        const learningPaths = await LearningPath.find().lean()

     
        res.render('home', { title: 'KodCampus Start', learningPaths });
    }
}