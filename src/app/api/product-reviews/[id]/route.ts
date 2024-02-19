import { getProductReviews } from "@/libs/apis";
import { NextResponse } from "next/server";

export async function GET (req:Request,{params} :{params:{id:string}}) {
    const productId = params.id;
    try {
        const productReviews = await getProductReviews(productId);
        return NextResponse.json(productReviews,{status:200,statusText:'success'})
    } catch (error) {
        return new NextResponse("unable to fetch reviews",{status:400})
    }
}