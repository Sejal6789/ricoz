const User = require("../models/userModel");
const errorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const { username, email, age, password } = req.body;
        const user = await User.create({
            username, email, age, password,
        });
        sendToken(user, 201, res);
    } catch (err) {
        next(err);
    }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new errorHandler("Please Enter username and Password", 400));
    }
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
        return next(new errorHandler("Invalid username and Password", 401));
    }
    const isPasswordmatched = await user.comparePassword(password);
    if (!isPasswordmatched) {
        return next(new errorHandler("Invalid username and Password", 401));
    }
    sendToken(user, 200, res);
})

exports.getUserdetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    })
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        message: "profile update successfully",
        user,
    })
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordmatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordmatched) {
        return next(new errorHandler("Old password is not correct", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new errorHandler("Passwords dose not matched ! enter carefully", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})


exports.deleteuser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
        return next(new errorHandler(`User not Found`, 404));
    }
    const isPasswordmatched = await user.comparePassword(req.body.password);
    if (!isPasswordmatched) {
        return next(new errorHandler("password is Incorrect", 400));
    }
    await user.remove();
    res.status(200).json({
        success: true,
        message: `User ${req.user.username} deleted successfully`,
    })
});


exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        succes: true,
        message: "Log out successfully",
    })
});





