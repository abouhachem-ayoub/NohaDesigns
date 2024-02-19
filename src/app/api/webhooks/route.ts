import { createOrder } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const checkout_session_completed= 'checkout.session.completed';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion:'2023-10-16'
});

export async function POST(req:Request , res:Response) {
    const reqBody = await req.text();
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event:Stripe.Event;
    try {
        if(!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(reqBody,sig,webhookSecret)
    } catch (error:any) {
       return new NextResponse(`webhook server error${error.message}`,{status:500});
    }
    //load our event
    switch(event.type){
        case checkout_session_completed :
            const session = event.data.object;
            //@ts-ignore
            const {metadata:{user,product,totalPrice,orderDate}} = session;
            //@ts-ignore
            const total = Number(totalPrice);
            //@ts-ignore
            await createOrder({user,product,orderDate,totalPrice:total});
            return NextResponse.json('order created successfully',{status:200, statusText:'order successful'})
        default: 
            console.log(`unhandled event type ${event.type}`);
    }
return NextResponse.json('event received',{status:200, statusText:'event received'})

}