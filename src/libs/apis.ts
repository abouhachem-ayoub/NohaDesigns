import { CreateOrderDto, Product } from "@/models/product";
import sanityClient from "./sanity";
import * as queries from './sanityQueries'
import digitalProduct from "../../schemas/digitalProduct";
import user from "../../schemas/user";
import axios from 'axios';
import { headers } from "next/headers";
import { Order } from "@/models/order";
import { User } from "@/models/user";
import { CreateReviewDto, Review, UpdateReviewDto } from "@/models/review";

export async function getFeatured(){
    const result = await sanityClient.fetch<Product>(queries.getFeaturedQuery,
        {},
        {cache : 'no-cache'}
        )
        return result;
}

export async function getProducts() {
    const result = await sanityClient.fetch<Product[]>(queries.getProductsQuery,{}, {cache : 'no-cache'});
    return result;
}

export async function getProduct (_id:string) {
    const result = await sanityClient.fetch<Product>(queries.getProductQuery,{_id}, {cache : 'no-cache'});
    return result;
}

export async function createOrder ({user,product,orderDate,totalPrice}: CreateOrderDto){
        const mutation = {
            mutations:[
                {create:
                    {_type:'order',
                    user:{_type:'reference',_ref:user},
                    digitalProduct:{_type:'reference',_ref:product},
                    orderDate,
                    totalPrice
                    }
                }]
        };
        const {data} = await axios.post(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        mutation,
        {headers:{Authorization:`bearer ${process.env.SANITY_STUDIO_TOKEN}`}}
        )
        return data;
}

export async function getOrder (user:string,product:string) {
    const result = await sanityClient.fetch<Order>(queries.getOrderQuery,{user,product}, {cache : 'no-cache'});
    return result;
}

export async function getUserOrders(user:string){
    const result = await sanityClient.fetch<Order[]>(queries.getUserOrdersQuery,{user},{cache : 'no-cache'});
    return result;
}

export async function getUserData(_id:string){
    const result = await sanityClient.fetch<User>(queries.getUserDataQuery,{_id},{cache : 'no-cache'});
    return result;
};

export async function checkReviewExists(productId:string,userId:string):Promise<null|{_id:string}>{
        const result = await sanityClient.fetch<User>(queries.checkReviewExistsQuery,{productId,userId},{cache : 'no-cache'});
        return result?result : null
}

export async function updateReview({reviewId,reviewText,reviewRating}:UpdateReviewDto){
    const mutation = {
        mutations:[
            {
                patch:{
                    id:reviewId,
                    set:{
                        text:reviewText,
                        userRating:reviewRating
                    }
                }
            }
        ]
    }
      const {data} = await axios.post(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        mutation,
        {headers:{Authorization:`bearer ${process.env.SANITY_STUDIO_TOKEN}`}}
        )
        return data;
}

export async function CreateReview({reviewRating,reviewText,productId,userId}:CreateReviewDto){
    const mutation = {
        mutations : [
            {
                create:{
                    _type:'review',
                    user:{
                        _type:'reference',
                        _ref:userId
                    },
                    digitalProduct:{
                        _type:'reference',
                        _ref:productId,
                    },
                    userRating:reviewRating,
                    text:reviewText
                }
            }
        ]
    }
         const {data} = await axios.post(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        mutation,
        {headers:{Authorization:`bearer ${process.env.SANITY_STUDIO_TOKEN}`}}
        )
        return data;
}

export async function getProductReviews(productId:string)
{
   const result = await sanityClient.fetch<Review[]>(queries.getProductReviewsQuery,{productId},{cache : 'no-cache'});
    return result;
}