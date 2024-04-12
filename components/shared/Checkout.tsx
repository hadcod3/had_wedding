// import React, { useEffect } from 'react'
// import { loadStripe } from '@stripe/stripe-js';
// import { Button } from '../ui/button';
// import { checkoutOrder } from '@/lib/actions/order.actions';
// import { IPacket } from '@/lib/database/models/packet.model';
// import { IProduct } from '@/lib/database/models/product.model';
// import { IGear } from '@/lib/database/models/gear.model';

// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const Checkout = ({ value, userId } : { value: IPacket | IProduct | IGear, userId: string }) => {
//     useEffect(() => {
//         const query = new URLSearchParams(window.location.search);
//         if (query.get('success')) {
//         console.log('Order placed! You will receive an email confirmation.');
//         }

//         if (query.get('canceled')) {
//         console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
//         }
//     }, []);

//     const onCheckout = async () => {
//         let order: any = {};

//         switch (true) {
//             case 'title' in value && '_id' in value && 'price' in value:
//                 // Assuming it's a packet
//                 order = {
//                     itemTitle: (value as IPacket).title,
//                     itemId: (value as IPacket)._id,
//                     price: (value as IPacket).price,
//                     buyerId: userId
//                 };
//                 break;
//             case 'title' in value && '_id' in value && 'price' in value:
//                 // Assuming it's a product
//                 order = {
//                     itemTitle: (value as IProduct).title,
//                     itemId: (value as IProduct)._id,
//                     price: (value as IProduct).price,
//                     buyerId: userId
//                 };
//                 break;
//             case 'title' in value && '_id' in value && 'price' in value:
//                 // Assuming it's a gear
//                 order = {
//                     itemTitle: (value as IGear).title,
//                     itemId: (value as IGear)._id,
//                     price: (value as IGear).price,
//                     buyerId: userId
//                 };
//                 break;
//             default:
//                 console.error("Invalid value type:", value);
//                 return;
//         }

//         await checkoutOrder(order);
//     }

//     return (
//         <form action={onCheckout} method="post">
//             <Button type="submit" role="link" size="lg" className="button sm:w-fit">
//                 {/* {isProduct(value) ? "Buy Now" : "Rent Now"} */}
//                 Rent Now
//             </Button>
//         </form>
//     )
// }

// export default Checkout

import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';

import { IPacket } from '@/lib/database/models/packet.model';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ packet, userId }: { packet: IPacket, userId: string }) => {
    console.log(packet)
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
        console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
        console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onCheckout = async () => {
        const order = {
            eventTitle: packet.title,
            eventId: packet._id,
            price: packet.price,
            buyerId: userId
        }

        await checkoutOrder(order);
    }

    return (
        <form action={onCheckout} method="post">
        <Button type="submit" role="link" size="lg" className="button sm:w-fit">
            {/* {event.isFree ? 'Get Ticket' : 'Buy Ticket'} */}
            buy now
        </Button>
        </form>
    )
}

export default Checkout