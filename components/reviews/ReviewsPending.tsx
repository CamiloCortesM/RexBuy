import { ReviewItem } from './ReviewItem';

const reviewsPending = [
  {
    _id: '1',
    comment: 'Excelente producto, estoy esperando recibirlo pronto.',
    user: 'user123',
    images: ['review_image1.jpg', 'review_image2.jpg'],
    product: {
      _id: 'iphone-12',
      title: 'iPhone 12',
      images: ['iphone12.webp', 'iphone12-2.webp', 'iphone12-3.webp'],
      slug: 'iphone-12',
      brand: 'Apple',
      model: 'iPhone 12',
      type: 'celulares',
    },
    rating: 0,
    reviewed: false,
  },
  {
    _id: '2',
    comment:
      'Espero que llegue pronto, tengo muchas expectativas con este producto.',
    user: 'user456',
    images: ['review_image3.jpg'],
    product: {
      _id: 'dell-xps-13',
      title: 'Dell XPS 13',
      images: ['xps13.webp', 'xps13-2.webp', 'xps13-3.webp'],
      slug: 'dell-xps-13',
      brand: 'Dell',
      model: 'XPS 13',
      type: 'computadores',
    },
    rating: 0,
    reviewed: false,
  },
  {
    _id: '3',
    comment:
      'Increíble consola, la recomiendo a todos los amantes de los videojuegos.',
    user: 'user789',
    images: ['review_image4.jpg', 'review_image5.jpg'],
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
    rating: 0,
    reviewed: false,
  },
];

export const ReviewsPending = () => {
  
  return (
    <>
      {reviewsPending.map((review,i) => {
        return (
            <ReviewItem review={review} key={i}  isCompleted={false} />
        );
      })}
    </>
  );
};
