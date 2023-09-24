import { IFavorite } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose';

const favoriteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  },
  {
    timestamps: true,
  }
);

const Favorite: Model<IFavorite> =
  mongoose.models.Favorite || model('Favorite', favoriteSchema);

export default Favorite;
