import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  reviews: [reviewSchema],
  seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
});

productSchema.virtual('numReviews').get(function () { return this.reviews.length; });
productSchema.virtual('rating').get(function () {
  return this.reviews.reduce((a, c) => c.rating + a, 0)
    / this.reviews.length;
});

productSchema.plugin(mongooseLeanVirtuals);

const productModel = mongoose.model('Product', productSchema);

export default productModel;
