import { Document, Schema, model, models } from "mongoose";

export interface IPacketCategory extends Document {
  _id: string;
  name: string;
}

const PacketCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const PacketCategory = models.PacketCategory || model('PacketCategory', PacketCategorySchema);

export default PacketCategory;