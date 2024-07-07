import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from '../middleware/error.js';
import { Job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async(req, res, next)=>{//for the job seeker
    const jobs = await Job.find({expired: false});
    res.status(200).json({
        success: true,
        jobs,
    });
});


export const postJob = catchAsyncError(async(req, res, next) =>{//for the employer
    const { role } = req.user;
    if( role === `Job Seeker`){
        return next(new ErrorHandler(`Job Seeker can't access this feature..`, 400)); 
    }

    const { title, description, category, country, location, salary } = req.body;

    if( !title || !description || !category || !country || !location || !salary){
        return next(new ErrorHandler(`Please provide complete details..`, 400));
    }
    
    const postedBy = req.user._id;
    const job = await Job.create({
        title, description, category, country, location, salary, postedBy
    });

    res.status(200).json({
        success: true,
        message: `Job created successfully..`,
        job,
    });
});

export const getMyJobs = catchAsyncError(async(req, res, next) =>{//for the employer
    const {role} = req.user;
    if( role === `Job Seeker`){
        return next(new ErrorHandler(`Job Seeker can't access this feature..`, 400)); 
    }

    const myjobs = await Job.find({postedBy: req.user._id});
    
    
    res.status(200).json({
        success: true,
        myjobs,
    });

});

export const updateJob = catchAsyncError(async(req, res, next) =>{//for the employer
    const {role} = req.user;
    if( role === `Job Seeker`){
        return next(new ErrorHandler(`Job Seeker can't access this feature..`, 400)); 
    }

    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler(`Job not found..`, 404)); 
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        job,
        message: `Job updated successfully..`,
    });
});

export const deleteJob = catchAsyncError(async(req, res, next) =>{//for the employer
    const {role} = req.user;
    if( role === `Job Seeker`){
        return next(new ErrorHandler(`Job Seeker can't access this feature..`, 400)); 
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler(`Job not found..`, 404)); 
    }

    await job.deleteOne();
    res.status(200).json({
        success: true,
        job,
        message: `Job deleted successfully..`,
    });

});