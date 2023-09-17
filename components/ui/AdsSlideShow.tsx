import { Box } from '@mui/material';
import { Slide } from 'react-slideshow-image';

import { ADS_IMAGES } from '@/constants';
import styles from './AdsSlideShow.module.css';
import 'react-slideshow-image/dist/styles.css';

//TODO: change slider by error in animation

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
    breakpoint: 400,
    settings: {
      slidesToShow: 2,
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
          transform="rotate(180)"
        >
          <g id="SVGRepo_bgCarrier"></g>
          <g id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
              className={styles.arrow}
            ></path>
          </g>
        </svg>
      </button>
    ),
    nextArrow: (
      <button className={styles.button_next_previous}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier"></g>
          <g id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
              className={styles.arrow}
            ></path>
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
      <div className={`${styles.slider_container} ${styles.fadeInSlide}`}>
        <Slide
          slidesToScroll={1}
          slidesToShow={1}
          indicators={false}
          autoplay={false}
          responsive={responsiveSettings}
          easing="ease"
          {...properties_buttons}
        >
          {ADS_IMAGES.map((image, index) => (
            <div
              key={index}
              style={{
                height: 'auto',
                maxHeight: '160px',
              }}
            >
              <img
                src={image}
                className={`${styles.image_ads} ${styles.fadeInSlide}`}
              />
            </div>
          ))}
        </Slide>
      </div>
    </Box>
  );
};
