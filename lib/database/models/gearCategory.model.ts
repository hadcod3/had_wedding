import { Document, Schema, model, models } from "mongoose";

export interface IGearCategory extends Document {
  _id: string;
  name: string;
}

const GearCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const GearCategory = models.GearCategory || model('GearCategory', GearCategorySchema);

export default GearCategory;