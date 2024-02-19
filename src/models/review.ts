export type UpdateReviewDto={
    reviewId : string;
    reviewText:string;
    reviewRating:number;
} 

export type CreateReviewDto = {
    productId:string;
    userId:string;
    reviewText:string;
    reviewRating:number;
}

export type Review = {
     _createdAt:Date;
    _id:string;
    user:{name:string},
    text:string,
    userRating:number;
}