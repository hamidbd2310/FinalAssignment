const EmailSend=require('../utility/EmailHelper');
const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');




const {EncodeToken} = require('../utility/TokenHelper');


const UserOTPService = async (req) => {
    try{
    let email=req.params.email;
    let otp = Math.floor(100000 + Math.random() * 900000);
    let EmailText="Your OTP is "+otp
    let EmailSubject="OTP Verification"
    
    await EmailSend(email,EmailText,EmailSubject);
    await UserModel.updateOne({email:email},{$set:{otp:otp}},{upsert:true})
    return{status: "success", message: "OTP Send Successfully"}
    }
    catch(e){
        return{status: "fail", message: e.toString()}
    }
    
}

const VerifyOTPService = async (req) => {
    try{
        let email=req.params.email
        let otp =req.params.otp
        let total=await UserModel.find({email: email,otp:otp}).count("total")
        if(total===1){
            let user_id=await UserModel.find({email: email,otp:otp}).select("_id")
            let token=EncodeToken(email,user_id[0]['_id'].toString())
            await UserModel.updateOne({email:email},{$set:{otp:'0'}})
        return{status: "success", message: "OTP Verified Successfully",token:token}
        }
        else{
            return{status: "fail", message: "Invalid OTP"}
        }
    }
    catch(e){
        return{status: "fail", message: e.toString()}
    }
    
}


const SaveProfileService = async (req) => {

    try{
        let user_id = req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await ProfileModel.updateOne({userID:user_id}, {$set:reqBody},{upsert:true})
    return{status: "success", message: "Profile Save Successfully"}
        }
    catch(e){
        return{status: "fail", message: e.toString()}
        }
    
}



const ReadProfileService = async (req) => {
    try{
        let user_id = req.headers.user_id;
        let data=await ProfileModel.find({userID:user_id})
        return{status: "success", message: "Profile Read Successfully",data:data}
        }
    catch(e){
        return{status: "fail", message: e.toString()}
        }
    
}

module.exports = {
    UserOTPService,
    VerifyOTPService,
    SaveProfileService,
    ReadProfileService
}