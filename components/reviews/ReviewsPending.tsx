import { FC } from 'react';
import { ReviewItem } from './ReviewItem';
import { IReview } from '@/interfaces';
import { SvgReviewsPending, EmptyReviewsSection } from './';
import { DISPLAY_EMPTY_REVIEWS } from '@/constants';

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
          title={DISPLAY_EMPTY_REVIEWS.reviewsPending.title}
          description={DISPLAY_EMPTY_REVIEWS.reviewsPending.description}
          svgImage={<SvgReviewsPending />}
        />
      )}
    </>
  );
};
