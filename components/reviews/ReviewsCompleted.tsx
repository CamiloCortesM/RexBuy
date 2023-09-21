import { ReviewItem } from './ReviewItem';

const reviewsCompleted = [
  {
    _id: '4',
    comment: 'El iPhone 12 es increíble, estoy muy contento con mi compra.',
    user: 'user123',
    images: ['review_image6.jpg'],
    product: {
      _id: 'iphone-12',
      title: 'iPhone 12',
      images: ['iphone12.webp', 'iphone12-2.webp', 'iphone12-3.webp'],
      slug: 'iphone-12',
      brand: 'Apple',
      model: 'iPhone 12',
      type: 'celulares',
    },
    rating: 5,
    reviewed: true,
  },
  {
    _id: '5',
    comment:
      'El Dell XPS 13 es justo lo que necesitaba, ¡muy feliz con mi compra!',
    user: 'user456',
    images: ['review_image7.jpg'],
    product: {
      _id: 'dell-xps-13',
      title: 'Dell XPS 13',
      images: ['xps13.webp', 'xps13-2.webp', 'xps13-3.webp'],
      slug: 'dell-xps-13',
      brand: 'Dell',
      model: 'XPS 13',
      type: 'computadores',
    },
    rating: 4,
    reviewed: true,
  },
  {
    _id: '6',
    comment: 'La Nintendo Switch es genial, especialmente en modo portátil.',
    user: 'user789',
    images: ['review_image8.jpg', 'review_image9.jpg'],
    product: {
      _id: 'nintendo-switch',
      title: 'Nintendo Switch',
      images: [
        'switch.webp',
        'switch-2.webp',
        'switch-3.webp',
        'switch-4.webp',
      ],
      slug: 'nintendo-switch',
      brand: 'Nintendo',
      model: 'Switch',
      type: 'videojuegos',
    },
    rating: 4,
    reviewed: true,
  },
];

export const ReviewsCompleted = () => {
  return (
    <>
      {reviewsCompleted.map((review, i) => {
        return <ReviewItem review={review} key={i} />;
      })}
    </>
  );
};
