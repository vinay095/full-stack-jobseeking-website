import mongoose from 'mongoose';
import validator from 'validator';

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3,`minimum 3 characters`],
        maxLength: [30,`maximum 30 characters`],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
        validate: [validator.isEmail, `Please provide a valid email`],
    },
    phone: {
        type: Number,
        required: [true,`Please provide your mobile number.`],
    },
    coverLetter: {
        type: String,
        required: [true,`Please provide your cover letter.`],
    },
    address: {
        type: String,
        required: [true,`Please provide your address.`],
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    applicantID: {
        user: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           required: true,
        },
        role: {
            type: String,
            enum: [`Job Seeker`],
            required: true,
        }
    },
    employerID: {
        user: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           required: true,
        },
        role: {
            type: String,
            enum: [`Employer`],
            required: true,
        }
    },

});

export const Application = mongoose.model(`Application`, applicationSchema);
