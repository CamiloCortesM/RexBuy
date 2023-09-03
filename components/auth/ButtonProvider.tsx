import { Button } from '@mui/material';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { FC } from 'react';

type props = {
  provider: { id: string; name: string };
};

export const ButtonProvider: FC<props> = ({ provider }) => {
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
