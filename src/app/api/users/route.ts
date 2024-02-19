import { CreateReview, checkReviewExists, getUserData, updateReview } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET (req:Request,res:Response){
    const session = await getServerSession(authOptions);
    if(!session) return new NextResponse('authentication required',{status:500});
    const userId = session.user.id;
    try {
        const data = await getUserData(userId);
        return  NextResponse.json(data,{status:200,statusText:'success'})
    }
     catch (error) {
        return new NextResponse('unable to fetch',{status:400})       
    }
}

export async function POST (req:Request,res:Response){
    const session = await getServerSession(authOptions);
    if(!session) return new NextResponse('authentication required',{status:500});
    const userId = session.user.id;
    const {productId,reviewText,ratingValue} = await req.json();
    if(!productId || !reviewText || !ratingValue) return new NextResponse('All fields are required',{status:400});

    try {
        //check if review by user already exists
        const alreadyExists = await checkReviewExists(productId,userId);
        let data;
        if(alreadyExists) {
            //update the review
            data = await updateReview({reviewId:alreadyExists._id,reviewText,reviewRating:ratingValue});
        }
        else{
            //create the review
            data = await CreateReview({reviewRating:ratingValue,reviewText,productId,userId});
        }
                return NextResponse.json(data,{status:200,statusText:"success"})

    } catch (error : any) {
        console.log('unable to update',error);
        return new NextResponse('cannot add review, something went wrong!',{status:500})
    }
}