const Ad = require('../models/Ad');
const User = require('../models/User');

async function createJob(job) {
    const result = new Ad(job);
    await result.save();

    //add job id to user myAds array
    const user = await User.findById(result.author);
    user.myAds.push(result._id);
    await user.save();
}

async function getFirstThree() {
    return Ad.find().sort({ createdAt: 1 }).limit(3).lean();
}

async function getAll() {
    return Ad.find({}).lean();
}

async function getJobById(id) {
    return Ad.findById(id).populate('author', 'email').populate('applied', 'email description').lean();
}

async function getJobById2(id) {
    return Ad.findById(id).lean();
}

async function applyToJob(jobId, userId) {
    const job = await Ad.findById(jobId);

    if (job.applied.includes(userId)) {
        throw new Error('User is already applied for this job!');
    }

    job.applied.push(userId);
    await job.save();
}

async function updateJob(id, job) {
    const existing = await Ad.findById(id);

    existing.headline = job.headline;
    existing.location = job.location;
    existing.name = job.name;
    existing.description = job.description;

    await existing.save();
}

async function deleteById(jobId, userId) {
    //remove job id to author in myAds array
    const user = await User.findById(userId);
    user.myAds = user.myAds.filter(u => u != jobId);
    await user.save();

    await Ad.findByIdAndDelete(jobId);
}

async function getByEmail(find) {
    const userId = await User.findOne({ email: { $regex: find, $options: 'i' } }).select('_id').lean();

    if (userId) {
        return Ad.find({ author: userId._id }).select('headline name').lean();
    }
}


module.exports = {
    createJob,
    getFirstThree,
    getAll,
    getJobById,
    getJobById2,
    applyToJob,
    updateJob,
    deleteById,
    getByEmail
};