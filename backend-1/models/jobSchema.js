import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, `Provide a job title`],
        minLength: [3,`minimum 3 characters for a job title`],
        maxLength: [50,`maximum 50 characters for a job title`],
    },
    description: {
        type: String,
        required: [true, `Provide a job description`],
        minLength: [20,`minimum 20 characters for a job description`],
        maxLength: [300,`maximum 300 characters for a job description`],
    },
    category: {
        type: String,
        required: [true, `Provide a job category`],
        
    },
    location: {
        type: String,
        required: [true, `Provide the job location`],
        minLength: [30,`minimum 30 characters for a job location`],
    },
    country: {
        type: String,
        required: [true, `Provide the job country`],
        
    },
    salary: {
        type: Number,
        required: true,
        minLength: 5,
        maxLength: 9,
        
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
});

export const Job = mongoose.model(`job`, jobSchema);