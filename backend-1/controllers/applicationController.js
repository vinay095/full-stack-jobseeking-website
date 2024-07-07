import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from '../middleware/error.js';
import { Application } from "../models/applicationSchema.js";
import cloudinary from 'cloudinary';
import { Job } from "../models/jobSchema.js";


export const employerGetAllApplication = catchAsyncError(async(req, res, next) =>{//for the employer
    const {role} = req.user;
    if( role === `Job Seeker`){
        return next(new ErrorHandler(`Job Seeker can't access this feature..`, 400)); 
    }

    const {_id} = req.user;
    const applications = await Application.find({"employerID.user": _id});
    res.status(200).json({
        success: true,
        applications,
    });

});

export const jobSeekerGetAllApplication = catchAsyncError(async(req, res, next) =>{//for the job seeker
    const {role} = req.user;
    if( role === `Employer`){
        return next(new ErrorHandler(`Employer can't access this feature..`, 400)); 
    }

    const {_id} = req.user;
    const applications = await Application.find({"applicantID.user": _id});
    res.status(200).json({
        success: true,
        applications,
    });

});

export const jobSeekerDeleteApplication = catchAsyncError(async(req, res, next) =>{//for the job seeker
    const {role} = req.user;
    if( role === `Employer`){
        return next(new ErrorHandler(`Employer can't access this feature..`, 400)); 
    }

    const {id} = req.params;
    const application = await Application.findById(id);
    if(!application){
        return next(new ErrorHandler(`Job not found..`, 404));
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        job,
        message: `Application deleted successfully..`,
    });

});

export const postApplication = catchAsyncError(async(req, res, next) =>{//for the job seeker
    const {role} = req.user;
    if( role === "Employer"){
        return next(new ErrorHandler(`Employer can't access this feature..`, 400)); 
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler(`Resume file is required..`));   
    }

    const { resume } = req.files;

    const allowedFormats = ['image/png', 'image/jpg', 'image/webp'];

    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler(`Invalid file type. png, jpg and webp are allowed..`));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload( resume.tempFilePath );

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary error: ", cloudinaryResponse.error || "Unknown Cloudinary error");
        return next(new ErrorHandler("Failed to upload resume..", 500));
    }
    
    const { name, email, phone, coverLetter, address, jobID } = req.body;

    const applicantID = {
        user: req.user._id,
        role: "Job Seeker",
    };
    if(!jobID){
        return next(new ErrorHandler("Job not Found", 404));
    }

    const jobDetails = await Job.findById(jobID);
    if(!jobDetails){
        return next(new ErrorHandler("Job not Found", 404));
    }
    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
    };

    if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume ){
        return next(new ErrorHandler("Please fill all fields..", 400));
    }

    const application = await Application.create({
        name, email, phone, coverLetter, address, applicantID, employerID, 
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },

    });
    res.status(200).json({
        success: true,
        message: `Application submitted successfully..`,
        application,
    })

});

