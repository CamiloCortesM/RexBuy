import { Box } from '@mui/material';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { ADS_IMAGES } from '@/constants';
import styles from './AdsSlideShow.module.css';

const responsiveSettings = [
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
];

export const AdsSlideShow = () => {
  const properties_buttons = {
    prevArrow: (
      <button className={styles.button_next_previous}>
        <svg
          viewBox="0 0 24.00 24.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          stroke-width="0.00024000000000000003"
          transform="rotate(180)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
              className={styles.arrow}
            ></path>{' '}
          </g>
        </svg>
      </button>
    ),
    nextArrow: (
      <button className={styles.button_next_previous}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
              className={styles.arrow}
            ></path>{' '}
          </g>
        </svg>
      </button>
    ),
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      sx={{
        padding: { xs: 3, sm: 5 },
      }}
    >
      <div className={styles.slider_container}>
        <Slide
          slidesToScroll={1}
          slidesToShow={2}
          indicators={false}
          responsive={responsiveSettings}
          {...properties_buttons}
        >
          {ADS_IMAGES.map((image, index) => (
            <img src={image} key={index} className={styles.image_ads} />
          ))}
        </Slide>
      </div>
    </Box>
  );
};
