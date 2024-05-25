const BrandModel=require('../models/BrandModel')
const CategoryModel=require('../models/CategoryModel')
const ProductSliderModel=require('../models/ProductSliderModel')
const ProductModel=require('../models/ProductModel')
const ProductDetailModel=require('../models/ProductDetailModel')
const ReviewModel=require('../models/ReviewModel')

const mongoose = require("mongoose");
const ObjectId=mongoose.Types.ObjectId;




const BrandListService =async()=>{
    try{
        let data= await  BrandModel.find();
        return{status:"success", data:data}}
    catch(e){return{status:"fail", data:e}.toString();}}

const CategoryListService =async()=>{
    try{
        let data= await CategoryModel.find()
        return{status:"success", data:data};}
    catch(e){return{status:"fail", data:e}.toString();}}

const SliderListService =async()=>{
    try{
        let data=await  ProductSliderModel.find()
        return{status:"success", data:data};}
    catch(e){return{status:"fail", data:e}.toString();}}

const ListByBrandService =async(req)=>{
    try{
        let BrandID=new ObjectId(req.params.BrandID);
        let MatchStage= {$match:{brandID:BrandID}};
        let JoinWithBrandState= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryState= {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    //Array To Object
        let UnwindBrandState= {$unwind:"$brand"}
        let UnwindCategoriesState= {$unwind:"$category"}
    //Je gulo Bad
        let ProjectionStage= {$project:{'brandID':0,'categoryID':0,'createdAt':0,'updatedAt':0,
        'brand._id':0, 'brand.createdAt':0, 'brand.updatedAt':0, 'category._id':0,
        'category.createdAt':0, 'category.updatedAt':0,}}
   //Output
        let data= await ProductModel.aggregate([MatchStage,JoinWithBrandState,JoinWithCategoryState,
        UnwindBrandState,UnwindCategoriesState,ProjectionStage])
        return{status:"success", data:data};}
    catch(e)
        {return{status:"fail", data:e}.toString();}
    }


const ListByCategoryService =async(req)=>{
    try{
        let CategoryID=new ObjectId(req.params.CategoryID);
        let MatchStage= {$match:{categoryID:CategoryID}};
        let JoinWithBrandState= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryState= {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandState= {$unwind:"$brand"}
    let UnwindCategoriesState= {$unwind:"$category"}
    let ProjectionStage= {$project:{
        'brandID':0,'categoryID':0,'createdAt':0,'updatedAt':0,
        'brand._id':0, 'brand.createdAt':0, 'brand.updatedAt':0, 
        'category._id':0, 'category.createdAt':0, 'category.updatedAt':0,}}
    let data= await ProductModel.aggregate([
        MatchStage,JoinWithBrandState,JoinWithCategoryState,
        UnwindBrandState,UnwindCategoriesState,ProjectionStage])
        return{status:"success", data:data};}
    catch(e){
        return{status:"fail", data:e}.toString();}
    }

const ListByRemarkService =async(req)=>{
    try{
        let Remark=req.params.Remark;
        let MatchStage= {$match:{remark:Remark}};
        let JoinWithBrandState= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryState= {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandState= {$unwind:"$brand"}
        let UnwindCategoriesState= {$unwind:"$category"}
        let ProjectionStage= {$project:{'brandID':0,'categoryID':0,'createdAt':0,'updatedAt':0,
        'brand._id':0, 'brand.createdAt':0, 'brand.updatedAt':0, 
        'category._id':0, 'category.createdAt':0, 'category.updatedAt':0,}}
        let data= await ProductModel.aggregate([
            MatchStage,JoinWithBrandState,JoinWithCategoryState,
            UnwindBrandState,UnwindCategoriesState,ProjectionStage])
        return{status:"success", data:data};}
    catch(e){
        return{status:"fail", data:e}.toString();}
    }


const ListBySimilarService =async(req)=>{
    try{
        let CategoryID=new ObjectId(req.params.CategoryID);
        let MatchStage= {$match:{categoryID:CategoryID}};
        let limitStage={$limit:20}
        let JoinWithBrandState= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryState= {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandState= {$unwind:"$brand"}
        let UnwindCategoriesState= {$unwind:"$category"}
        let ProjectionStage= {$project:{'brandID':0,'categoryID':0,'createdAt':0,'updatedAt':0,
        'brand._id':0, 'brand.createdAt':0, 'brand.updatedAt':0, 
        'category._id':0, 'category.createdAt':0, 'category.updatedAt':0,}}
        let data= await ProductModel.aggregate([
            MatchStage, limitStage,JoinWithBrandState,JoinWithCategoryState,
            UnwindBrandState,UnwindCategoriesState,ProjectionStage])
        return{status:"success", data:data};}
    catch(e){
        return{status:"fail", data:e}.toString();}
    }

const ListByKeywordService =async(req)=>{
      try{
        let SearchRegex={"$regex":req.params.Keyword, "$options":"i"}
        let SearchParams=[{title:SearchRegex},{shortDes:SearchRegex}]
        let SearchQuery={$or:SearchParams}
        let MatchStage={$match:SearchQuery}
        let JoinWithBrandState= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryState= {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandState= {$unwind:"$brand"}
        let UnwindCategoriesState= {$unwind:"$category"}
        let ProjectionStage= {$project:{
        'brandID':0,'categoryID':0,'createdAt':0,'updatedAt':0,
        'brand._id':0, 'brand.createdAt':0, 'brand.updatedAt':0, 
        'category._id':0, 'category.createdAt':0, 'category.updatedAt':0,}}
    let data= await ProductModel.aggregate([
        MatchStage,JoinWithBrandState,JoinWithCategoryState,
        UnwindBrandState,UnwindCategoriesState,ProjectionStage])
    
        return{status:"success", data:data};}
    catch(e){
        return{status:"fail", data:e}.toString();}
    }

const DetailsService =async(req)=>{
    try{
        let ProductID=new ObjectId(req.params.ProductID);
        let MatchState= {$match:{_id:ProductID}};
        let JoinWithBrandState= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryState= {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let JoinWithDetailsState= {$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"details"}};
        let UnwindBrandState= {$unwind:"$brand"}
        let UnwindCategoriesState= {$unwind:"$category"}
        let UnwindDetailsState= {$unwind:"$details"}
        let ProjectionStage= {$project:{
            'brandID':0,'categoryID':0,'createdAt':0,'updatedAt':0,
            'brand._id':0, 'brand.createdAt':0, 'brand.updatedAt':0, 
            'category._id':0, 'category.createdAt':0, 'category.updatedAt':0,
            'details._id':0, 'details.createdAt':0, 'details.updatedAt':0,}}
        let data= await ProductModel.aggregate([ MatchState,JoinWithBrandState,JoinWithCategoryState,JoinWithDetailsState,
            UnwindBrandState,UnwindCategoriesState,UnwindDetailsState,ProjectionStage])
        return{status:"success", data:data};}
    catch(e){
        return{status:"fail", data:e}.toString();}
        }

const ReviewListService =async(req)=>{
    try{
        let ProductID=new ObjectId(req.params.ProductID);
        let MatchState= {$match:{productID:ProductID}};
        let JoinWithProfilesState= {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}};
        let UnwindProfileState= {$unwind:"$profile"}
        let ProjectionStage= {$project:{'des':1,'rating':1,'profile.cus_name':1,}}
        let data= await ReviewModel.aggregate([MatchState,JoinWithProfilesState,UnwindProfileState,ProjectionStage])
        return{status:"success", data:data};}
    catch(e){
        return{status:"fail", data:e}.toString();}
}

const CreateReviewService =async(req)=>{
    try{
        let user_id= req.headers.user_id;
        let reqBody=req.body;

       let data=await ReviewModel.create({
            productID:reqBody ['productID'],
            userID: user_id,
            des:reqBody['des'],
            rating:reqBody['rating'],
        })
       
        return{status:"success", data:data};}

    catch(e){
        return{status:"fail", data:e}.toString();}
}


    module.exports={
        BrandListService,
        CategoryListService,
        SliderListService,
        ListByBrandService,
        ListByCategoryService,
        ListBySimilarService,
        ListByKeywordService,
        ListByRemarkService,
        DetailsService,
        ReviewListService,
        CreateReviewService
        }