import { Schema, model, models, Document } from 'mongoose'

export interface IOrder extends Document {
    createdAt: Date
    stripeId: string
    totalPrice: string
    item: {
        _id: string
        title: string
    }
    buyerId: string
}
 
export type IOrderItem = {
    _id: string
    totalPrice: string
    createdAt: Date
    itemId: string
    itemTitle: string
    buyerId: string
}

const OrderSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    stripeId: {
        type: String,
        required: true,
        unique: true,
    },
    totalPrice: {
        type: String,
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Packet',
        required: true
    },
    itemTitle: {
        type: String,
        required: true
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Order = models.Order || model('Order', OrderSchema)

export default Order
