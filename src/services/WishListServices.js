const WishModel=require('../models/WishModel')


const mongoose = require("mongoose");
const ObjectId=mongoose.Types.ObjectId;

const WishListService = async (req) => {
   try{
    let user_id= new ObjectId(req.headers.user_id)
    let matchStage={$match:{userID:user_id}}

    let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
    let unwindProductStage={$unwind:"$product"}

    let JoinStageBrand={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}}

    let unwindBrandtStage={$unwind:"$brand"}

    
    let JoinStageCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}

    let unwindCategoryStage={$unwind:"$category"}


    let ProjectionStage= {$project:{'userID':0,'productID':0,'createdAt':0,'updatedAt':0,
        'product._id':0, 'product.brandID':0, 'product.categoryID':0, 'product.createdAt':0,'product.updatedAt':0, 'category._id':0, 'brand._id':0,
        'category.createdAt':0, 'category.updatedAt':0,  'brand.createdAt':0, 'brand.updatedAt':0, }}

    let data =await WishModel.aggregate([
        matchStage,
        JoinStageProduct,
        unwindProductStage,
        JoinStageBrand,
        unwindBrandtStage,
        JoinStageCategory,
        unwindCategoryStage,
        ProjectionStage
    ])

    return{status:"success", data:data};
   }
   catch(err){
    return{status:"fail", data:err}.toString();}
   
}

const SaveWishListService = async (req) => {
    try{
        let user_id=req.headers.user_id
        let reqBody=req.body
        reqBody.userID=user_id
        await WishModel.updateOne(reqBody, {$set:reqBody},{upsert:true})
        return{status:"success", message: "Wish List Update Success"};
    }
    catch(e){
        return{status:"fail"}}

   
}

const RemoveWishListService = async (req) => {
    try{
        let user_id=req.headers.user_id
        let reqBody=req.body
        reqBody.userID=user_id
        await WishModel.deleteOne(reqBody)
        return{status:"success", message: "Wish List Delete Success"};
    }
    catch(e){
        return{status:"fail", data:e}.toString();}
   
}

module.exports ={
    WishListService,
    SaveWishListService,
    RemoveWishListService}