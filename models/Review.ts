import { IReview } from '@/interfaces/reviews';
import mongoose, { Schema, model, Model } from 'mongoose';

const reviewSchema = new Schema(
  {
    comment: { type: String, default: '' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }],
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, default: 0 },
    reviewed: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Review: Model<IReview> =
  mongoose.models.Review || model('Review', reviewSchema);

export default Review;
