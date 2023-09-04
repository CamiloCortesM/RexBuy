import { FC } from 'react';
import Image from 'next/image';

import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';

type Props = {
  provider: { id: string; name: string };
};

export const ButtonProvider: FC<Props> = ({ provider }) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      color="primary"
      sx={{ mb: 2, fontWeight: 800 }}
      onClick={() => signIn(provider.id)}
    >
      <Image
        alt={`${provider.id} logo`}
        src={`/${provider.id}.svg`}
        width={20}
        height={20}
        style={{ marginRight: 10 }}
      />
      {provider.name}
    </Button>
  );
};
