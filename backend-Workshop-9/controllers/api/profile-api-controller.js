const userLearningPathModel = require('../../models/mongodb/user-learning-path-model');

module.exports = {
    completeStep: async (req, res) => {
        const { pathId, stepId, done } = req.body;
        const userId = req.user.user_id;

        const userLearningPath = await userLearningPathModel.findOne({ userId });
        const learningPath = userLearningPath.learningPaths.find(x => x._id == pathId);

        const step = learningPath.learningPath.steps.find(x => x._id == stepId);
        step.done = true;
        await userLearningPath.save();

        res.sendStatus(200)
}}