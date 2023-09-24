import { FC } from 'react';
import { ReviewItem } from './ReviewItem';
import { IReview } from '@/interfaces';
import { SvgReviewsPending, EmptyReviewsSection } from './';

type Props = {
  reviews: IReview[];
};

export const ReviewsPending: FC<Props> = ({ reviews }) => {
  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review, i) => {
          return <ReviewItem review={review} key={i} isCompleted={false} />;
        })
      ) : (
        <EmptyReviewsSection
          title="Estás al día. ¡Gracias por estar al tanto!"
          description="Has compartido tu opinión sobre todos tus productos. ¡Sigue
        colaborando con la comunidad añadiendo fotos y comentarios a tus
        reseñas!"
          svgImage={<SvgReviewsPending />}
        />
      )}
    </>
  );
};
