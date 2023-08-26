import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces/products';

const productSchema = new Schema(
  {
    description: { type: String, required: true, default: '' },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, default: '' },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    capacity: [{ type: String }],
    ram: [{ type: String }],
    type: {
      type: String,
      enum: {
        values: [
          'celulares',
          'computadores',
          'videojuegos',
          'accesorios',
          'tabletas',
          'smartwatch',
          'monitores',
        ],
        message: '{VALUE} category is not valid',
        default: 'celulares',
      },
    },
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', tags: 'text' });

const Product: Model<IProduct> =
  mongoose.models.Product || model('Product', productSchema);

export default Product;
