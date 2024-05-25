
const CartModel=require('../models/CartModel')


const mongoose = require("mongoose");
const ObjectId=mongoose.Types.ObjectId;



const CartListService =async (req) => {
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
    
        let data =await CartModel.aggregate([
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

const SaveCartListService =async(req)=>{

    try{
       let user_id = req.headers.user_id;
       let reqBody=req.body;
       reqBody.userID=user_id
       await CartModel.create(reqBody)
       return{status:"success", message:"Add To Cart Successfully"};
    }
    catch(err){
        return{status:"fail", data:err}.toString();}
}

const UpdateCartListService =async (req) => {
    try{
        let user_id = req.headers.user_id;
        let cartID=req.params.cartID
        let reqBody=req.body;
        await CartModel.updateOne({_id:cartID,userID:user_id},{$set:reqBody});
        return{status:"success", message:"Update Cart Successfully"};}
    catch(err){
        return{status:"fail", data:err}.toString();}
}

const RemoveCartListService =async (req) => {
    try{
        let user_id = req.headers.user_id;
       let reqBody=req.body;
       reqBody.userID=user_id
       await CartModel.deleteOne(reqBody)
       return{status:"success", message:"Remove Cart Successfully"};

    }
    catch(err){
        return{status:"fail", data:err}.toString();}


}

module.exports ={
    SaveCartListService,
    RemoveCartListService,
    UpdateCartListService,
    CartListService
   }