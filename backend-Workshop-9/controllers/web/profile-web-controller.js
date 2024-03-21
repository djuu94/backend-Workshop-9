const User = require('../../models/mysql/user-model');
const userLearningPathModel = require('../../models/mongodb/user-learning-path-model');
const learningPathModel = require('../../models/mongodb/learning-path-model');

module.exports = {
    home: async (req, res) => {
        const userId = req.user.user_id;
        const userLearningPaths = await userLearningPathModel.findOne({ userId }).lean();
        const paths = userLearningPaths.learningPaths;
        res.render('profile/home', { title: 'Din profil', paths });

    },
    startPath: async (req, res) => {
        const pathId = req.params.id;
        const userId = req.user.user_id;
        
        console.log(userId)
        let userLearningPath = await userLearningPathModel.findOne({ userId });

        if (!userLearningPath){
            userLearningPath = await userLearningPathModel.create({ userId });
        }

        if(userLearningPath.learningPaths.find(x => x.learningPath && x.learningPath._id == pathId)){
            return res.redirect('/profile');
        }
        const learningPath = await learningPathModel.findById(pathId);
        userLearningPath.learningPaths.push({ learningPath, startedAt: new Date() });

        await userLearningPath.save();

        res.redirect('/profile');
    }
}