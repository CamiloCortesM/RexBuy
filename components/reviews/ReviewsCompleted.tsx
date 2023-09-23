import { FC } from 'react';
import { ReviewItem } from './ReviewItem';
import { IReview } from '@/interfaces';
import { EmptyReviewsSection } from './EmptyReviewsSection ';
import { SvgReviewsCompleted } from './SvgReviewsCompleted';

type Props = {
  reviews: IReview[];
};

export const ReviewsCompleted: FC<Props> = ({ reviews }) => {
  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review, i) => {
          return <ReviewItem review={review} key={i} />;
        })
      ) : (
        <EmptyReviewsSection
          title="Sin reseñas aún"
          description="Comparte tus opiniones sobre los productos que has probado. Visita 'Pendientes' para comenzar a compartir y ayudar a otros."
          svgImage={<SvgReviewsCompleted />}
        />
      )}
    </>
  );
};
