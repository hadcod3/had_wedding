import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
    _id: string;
    title: string;
    description?: string;
    createdAt: Date;
    imageUrl: string;
    price: string;
    url?: string;
    stock: number;
}

const ProductSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    price: { type: String },
    url: { type: String },
    stock: { type: Number, required: true}
})

const Product = models.Product || model('Product', ProductSchema);

export default Product