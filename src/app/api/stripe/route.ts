import { getProduct } from '@/libs/apis';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import order from '../../../../schemas/order';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion:'2023-10-16'
});

type RequestData={
    productId :string;

}
export async function POST(req:Request,res:Response){
const {productId} :RequestData = await req.json();
if(!productId) return new NextResponse('No product was selected',{status:400})
const origin = req.headers.get('origin');
const session = await getServerSession(authOptions)
if(!session) return new NextResponse("Authentification required",{status:400})
const userId = session.user.id;
try {
    const product = await getProduct(productId);
    const totalPrice = product.price - (product.price*product.discount)/100;
    const orderDate = new Date();
    //create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
        mode:'payment',
        line_items:[
            {
                quantity:1,
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:product.name,
                        images:product.images.map(image=>image.url)
                    },
                    unit_amount:parseInt((totalPrice*100).toString())
                }
            }
        ],
        payment_method_types:['card'],
        success_url:`${origin}/users/${userId}`,
        metadata:{
            user:userId,
            product:productId,
            orderDate:orderDate.toISOString().substring(0,10),
            totalPrice:totalPrice
    }
}
)
    return NextResponse.json(stripeSession,{
        status:200,
        statusText:'Payment session created'
    })
} catch (error:any) {
    console.log('payment failed!');
    return new NextResponse(error,{status:500})
}
}