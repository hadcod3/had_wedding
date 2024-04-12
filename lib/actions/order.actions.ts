"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';

// export const checkoutOrder = async (order: CheckoutOrderParams) => {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
//     const price = Number(order.price) * 999

//     try {
//         const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//             price_data: {
//                 currency: 'idr',
//                 unit_amount: price,
//                 product_data: {
//                 name: order.itemTitle
//                 }
//             },
//             quantity: 1
//             },
//         ],
//         metadata: {
//             itemId: order.itemId,
//             buyerId: order.buyerId,
//         },
//         mode: 'payment',
//         success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
//         cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
//         });

//         redirect(session.url!)
//     } catch (error) {
//         throw error;
//     }
// }


// export const createOrder = async (order: CreateOrderParams) => {
//     try {
//         await connectToDatabase();
        
//         const newOrder = await Order.create({
//             ...order,
//             item: order.itemId,
//             buyer: order.buyerId,
//             createdAt: order.createdAt,
//             totalAmount: order.totalAmount
//         });
    
//         return JSON.parse(JSON.stringify(newOrder));
//     } catch (error) {
//         handleError(error);
//     }
// }
export const checkoutOrder = async (order: CheckoutOrderParams) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  
    const price = Number(order.price) * 100;
  
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'idr',
              unit_amount: price,
              product_data: {
                name: order.itemTitle
              }
            },
            quantity: 1
          },
        ],
        metadata: {
          eventId: order.itemId,
          buyerId: order.buyerId,
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      });
  
      redirect(session.url!)
    } catch (error) {
      throw error;
    }
}

export const createOrder = async (order: CreateOrderParams) => {
    try {
      await connectToDatabase();
      
      const newOrder = await Order.create({
        ...order,
        item: order.itemId,
        buyer: order.buyerId,
      });
   
      return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
      handleError(error);
    }
  }
  