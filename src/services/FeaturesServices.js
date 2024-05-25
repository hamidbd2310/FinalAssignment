const FeaturesModel=require('../models/FeaturesModel')


const FeaturesListService=async()=>{
    try{
        let result=await FeaturesModel.find()
        return {status:"success", data:result}
    }catch(err){
        return{status:"fail", data:err.toString()};
    }
}


module.exports={
    FeaturesListService
}