const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Please Enter Your name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter you email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    age: {
        type: Number,
        min: 0,
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        maxLength: [25, "Password can not exceed 25 characters"],
        minLength: [4, "Password Should have morre then 4 characters"],
        select: false,         // anyone should cannot get password by find method
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {     // not hash already hashed password at the time of edit profile
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {   // make token from secret key and user id
        expiresIn: process.env.JWT_EXPIRE
    })
};

// compare password
userSchema.methods.comparePassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);
};

module.exports = mongoose.model("User", userSchema);