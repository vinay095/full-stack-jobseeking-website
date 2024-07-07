import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [8,`password should be minimum 8 characters long`],
        maxLength: [30,`maximum 30 characters`],
        select: false,
    },
    role: {
        type: String,
        required: [true,`Please provide your role`],
        enum: [`Job Seeker`, `Employer`],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

//to encrypt password;

async function hashPassword(user) {
    const password = user.password;
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });

    return hashedPassword;
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        this.password = await hashPassword(this);
        next();
    } catch (error) {
        next(error);
    }
});

//comparing passwords

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//generate jwt token for authorization

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model(`User`, userSchema);