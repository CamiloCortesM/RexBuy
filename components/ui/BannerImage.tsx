import { FC } from 'react';
import Image from 'next/image';
import style from './BannerImage.module.css';


type Props = {
  src       : string;
  alt?      : string;
  direction?: string;
};

export const BannerImage: FC<Props> = ({
  src,
  alt = 'Imagen del banner',
  direction = 'left',
}) => {
  const imageClass =
    direction === 'left' ? style.left_image : style.right_image;
  return (
    <Image src={src} alt={alt} className={`${style.banner_img} ${imageClass}`} />
  );
};
