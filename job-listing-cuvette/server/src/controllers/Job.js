const Job = require('../models/Job');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const validateJobData = async (jobId) => {
    if (!ObjectId.isValid(jobId)) {
        throw Object.assign(Error("This job doesn't exist, please check your URL"), { code: 400 });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
        throw Object.assign(Error("This job doesn't exist, please check your URL."), { code: 404 });
    }

    return jobData;
};

const createJob = async (req, res, next) => {
    try {
        const userId = req.user;
        const { companyName, companyLogo, jobPosition, monthlySalary, jobDuration, jobType, locationType, jobLocation, jobDescription, aboutCompany, skillsRequired, additionalInfo } = req.body;

        await Job.create({ userId, companyName, companyLogo, jobPosition, monthlySalary, jobDuration, jobType, locationType, jobLocation, jobDescription, aboutCompany, skillsRequired, additionalInfo });

        res.json({ status: "success", msg: "Job created successfully." });
    } catch (err) {
        next(err);
    }
}

const fetchAllJobs = async (req, res, next) => {
    try {
        const { title, skills } = req.body;
        let query = {};

        if (title) query.jobPosition = { $regex: title, $options: 'i' };
        if (skills && skills.length > 0) query.skillsRequired = { $all: skills };

        const jobs = await Job.find(query);
        res.json({ status: 'success', data: jobs });
    } catch (err) {
        next(err);
    }
}

const fetchJobsById = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const data = await validateJobData(jobId);
        res.json({ status: 'success', data: data });
    } catch (err) {
        next(err);
    }
}

const updateJob = async (req, res, next) => {
    try {
        const userId = req.user;
        const { jobId } = req.params;

        await validateJobData(jobId);
        const { companyName, companyLogo, jobPosition, monthlySalary, jobDuration, jobType, locationType, jobLocation, jobDescription, aboutCompany, skillsRequired, additionalInfo } = req.body;

        await Job.findByIdAndUpdate(jobId, { userId, companyName, companyLogo, jobPosition, monthlySalary, jobDuration, jobType, locationType, jobLocation, jobDescription, aboutCompany, skillsRequired, additionalInfo });

        res.json({ status: "success", msg: "Job updated successfully." });
    } catch (err) {
        next(err);
    }
}

module.exports = { createJob, fetchAllJobs, fetchJobsById, updateJob }