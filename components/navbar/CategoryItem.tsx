import { FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Button, Link } from '@mui/material';

type Props = {
  link : string;
  title: string;
};

export const CategoryItem: FC<Props> = ({ link, title }) => {
  const { asPath } = useRouter();

  return (
    <NextLink href={link} passHref legacyBehavior>
      <Link>
        <Button
          color={asPath === link ? 'primary' : 'info'}
          sx={{
            ...(asPath === link && {
              ':hover': {
                backgroundColor: '#001853',
                transition: 'all 0.3s ease-in-out',
              },
            }),
          }}
        >
          {title}
        </Button>
      </Link>
    </NextLink>
  );
};
