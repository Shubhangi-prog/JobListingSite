const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        companyLogo: {
            type: String,
            required: true,
        },
        jobPosition: {
            type: String,
            required: true,
        },
        monthlySalary: {
            type: Number,
            required: true,
        },
        jobDuration: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            required: true,
        },
        locationType: {
            type: String,
            required: true,
        },
        jobLocation: {
            type: String,
            required: true,
        },
        jobDescription: {
            type: String,
            required: true,
        },
        aboutCompany: {
            type: String,
            required: true,
        },
        skillsRequired: {
            type: Array,
            required: true,
        },
        additionalInfo: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.ObjectId,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Job", jobSchema);