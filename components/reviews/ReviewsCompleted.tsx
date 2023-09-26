import { FC } from 'react';
import { ReviewItem } from './ReviewItem';
import { IReview } from '@/interfaces';
import { EmptyReviewsSection } from './EmptyReviewsSection ';
import { SvgReviewsCompleted } from './SvgReviewsCompleted';
import { DISPLAY_EMPTY_REVIEWS } from '@/constants';

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
          title={DISPLAY_EMPTY_REVIEWS.reviewsCompleted.title}
          description={DISPLAY_EMPTY_REVIEWS.reviewsCompleted.description}
          svgImage={<SvgReviewsCompleted />}
        />
      )}
    </>
  );
};
