const User = require('../../models/mysql/user-model');
const userLearningPathsModel = require('../../models/mongodb/user-learning-path-model');
module.exports = {
    home: async (req, res) => {
        const user = await User.findOne({ where: { username: req.user.username } });
        if(!user){
            return res.render('error', {message: 'Användaren finns inte'})
        }

        const userLearningPaths = await userLearningPathsModel.findOne({userId: req.user.user_id}).lean();

        const paths = userLearningPaths ? userLearningPaths.learningPaths : [];
        console.log(paths)
        if(paths){
            paths.forEach(path => {
                const completedSteps = path.learningPath.steps.filter(step => step.done).length;
                totalSteps = path.learningPath.steps.length;
                path.progress = completedSteps / totalSteps * 100;
                path.completedSteps = completedSteps;
                path.totalSteps = totalSteps;
            });
        }
        res.render('users/single-user', {title: user.username, paths});
    }
}