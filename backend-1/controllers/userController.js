import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from '../middleware/error.js';
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async(req, res, next)=>{
    
    const { name, email, password, phone, role } = req.body;
    if(!name || !phone || !password || !role || !email ){
        return next(new ErrorHandler(`Please completely fill registeration form`));
    }

    const isEmail = await User.findOne({ email });
    if(isEmail){
        return next(new ErrorHandler(`Email already in use`));       
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
    }); 
    
    sendToken(user, 200, res, `Registration successful...`);

});

export const login = catchAsyncError(async(req, res, next) =>{
    const { email, password, role } = req.body;
    if(!password || !role || !email ){
        return next(new ErrorHandler(`Please provide all details.`, 400));
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler(`Invalid username or password.`, 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler(`Invalid username or password.`, 400))
    }
    if(user.role !== role){
        return next(new ErrorHandler(`User with this is not found.`, 400))
    }
    sendToken(user, 200, res, `Login successful...`);
});

export const logout = catchAsyncError(async(req, res, next) =>{
    res.status(201).cookie(`token`,"",{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: `Logout successful...`,
    });
});

export const getUser = catchAsyncError((req, res, next) =>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });

});