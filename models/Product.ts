import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct, PriceAndStockVariations } from '../interfaces/products';

const productSchema = new Schema(
  {
    description: { type: String, required: true, default: '' },
    images: [{ type: String }],
    price: { type: Number, required: true, default: 0 },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, default: '' },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    inStock: { type: Number, required: true, default: 0 },
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
    priceAndStockVariations: [
      {
        capacity: String,
        ram: String,
        stock: Number,
        price: Number,
      },
    ],
    rating: { type: Number, required: true, default: 0 },
    numReviewers: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', tags: 'text' });

productSchema.methods.getStockForVariation = function (
  capacity: string = '',
  ram: string = ''
) {
  const variation: PriceAndStockVariations = this.priceAndStockVariations.find(
    (v: PriceAndStockVariations) => v.capacity === capacity && v.ram === ram
  );

  if (variation) {
    return variation.stock;
  } else {
    return 0;
  }
};

productSchema.methods.getPriceForVariation = function (
  capacity: string = '',
  ram: string = ''
) {
  const variation: PriceAndStockVariations = this.priceAndStockVariations.find(
    (v: PriceAndStockVariations) => v.capacity === capacity && v.ram === ram
  );

  if (variation) {
    return variation.price;
  } else {
    return 0;
  }
};

const Product: Model<IProduct> =
  mongoose.models.Product || model('Product', productSchema);

export default Product;
