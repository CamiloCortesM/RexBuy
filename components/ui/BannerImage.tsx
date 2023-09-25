import { FC } from 'react';
import Image from 'next/image';


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
    direction === 'left' ? 'left_image' : 'right_image';
  return (
    <Image width={300} height={140} src={src} alt={alt} className={`banner_img ${imageClass}`} />
  );
};
