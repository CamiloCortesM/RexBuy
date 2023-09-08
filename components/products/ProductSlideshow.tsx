import { FC } from 'react';

import styles from './ProductSlideshow.module.css';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

type Props = {
  images: string[];
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        return (
          <div className={styles['each-slide']} key={image}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
