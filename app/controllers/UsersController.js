// User Registration
import UsersModel from "../models/UsersModel.js";
import { TokenEncode} from "../utility/TokenUtility.js";
import SendEmail from "../utility/EmailUtility.js";

export const Registration = async (req, res) => {

    try {
        const reqBody = req.body;
        await UsersModel.create(reqBody);
        return res.json({status: "success", "message": "User Registration Successful", data: reqBody});
    }catch (err) {
        return res.json({status: "fail", "message": err.toString()});
    }

}

// User Login
export const Login = async (req, res) => {

    try {
        const reqBody = req.body;
        const data = await UsersModel.findOne(reqBody);
        if(data == null){
            return res.json({status: "fail", message: "User not found"});
        }else{
            const token = await TokenEncode(data['email'], data['_id']);
            return res.json({status: "success", message: "User Login Successful", data: {token: token}});
        }
    }catch (err) {
        return res.json({status: "fail", message: err.toString()});
    }

}

// User Profile Details
export const ProfileDetails = async (req, res) => {

    try {
        const user_id = req.headers["user_id"];
        const data = await UsersModel.findOne({"_id":user_id});
        return res.json({status: "success", message: "User profile successfull" , data: data});
    }catch (err) {
        return res.json({status: "fail", message: err.toString()});
    }
}

// User Profile Update
export const ProfileUpdate = async (req, res) => {

    try {
        const user_id = req.headers["user_id"];
        const reqBody = req.body;
        const data = await UsersModel.updateOne({"_id": user_id}, reqBody);
        return res.json({status: "success", message: "User profile updated successfully", data: user_id});
    }catch (err) {
        return res.json({status: "fail", message: err.toString()});
    }

}

// User Profile Delete
export const ProfileDelete = async (req, res) => {
    return res.json({status: "success"});
}

// User Email Verify
export const EmailVerification = async (req, res) => {

    try{
        const email = req.params.email;
        const data = await UsersModel.findOne({email: email});
        if(data == null){
            return res.json({status: "fail", message: "User not found"});
        }else{
            const code = Math.floor(100000+Math.random()*900000);
            const EmailTo = data['email'];
            const EmailText = `Your OTP code is ${code}`;
            const EmailSubject = "Task management OTP code";
            await SendEmail(EmailTo,EmailText,EmailSubject);
            await UsersModel.updateOne({email: email}, {otp: code});
            return res.json({status: "success", message: "OTP sent to your email. Please verify your OTP"});
        }
    }catch (err) {
        return res.json({status: "fail", message: err.toString()});
    }
}

// User OTP Verify
export const OTPVerify = async (req, res) => {

    try {
        const reqBody = req.body;
        const data = await UsersModel.findOne(reqBody);
        if(data == null){
            return res.json({status: "fail", message: "Wrong Otp"});
        }else{
            return res.json({status: "success", message: "OTP verify successfully", data: data});
        }
    }catch (err) {
        return res.json({status: "fail", message: err.toString()});
    }

}

// User Reset Password
export const ResetPassword = async (req, res) => {

    try {
        const reqBody = req.body;
        if(reqBody['otp'] === "0"){
            return res.json({status: "fail", message: "OTP is not valid. Please enter valid OTP"});
        }else{
            const data = await UsersModel.findOne({email: reqBody['email'], otp: reqBody['otp']});
            if(data == null){
                return res.json({status: "fail", message: "Wrong Credential"});
            }else{
                await UsersModel.updateOne({email: reqBody['email']},{
                    otp: 0,
                    password: reqBody['password'],
                });
                return res.json({status: "success", message: "Password reset successfully", data: data});
            }
        }
    }catch (err) {
        return res.json({status: "fail", message: err.toString()});
    }

}