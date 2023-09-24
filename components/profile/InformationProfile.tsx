import { FC } from 'react';

import { Grid, Typography } from '@mui/material';

import { NameEdit, PersonalInformation, UserImage } from './';
import { IUser } from '@/interfaces';

type Props = {
  user: IUser | undefined;
  updateUser: Function;
};

export const InformationProfile: FC<Props> = ({ user, updateUser }) => {
  return (
    <>
      <Grid
        item
        sx={{ borderRadius: '10px', boxShadow: '0 0 2px 1px #d7d7d7' }}
        width={{ sm: '50%', xs: '100%' }}
        height="90px"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid
          item
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {user && <NameEdit name={user.name} updateUser={updateUser} />}
          <Typography variant="body1" fontSize={{ md: '1rem', xs: '.8rem' }}>
            {user?.email}
          </Typography>
        </Grid>
        {user && <UserImage user={user} updateUser={updateUser} />}
      </Grid>

      <Grid
        item
        sx={{ borderRadius: '10px', boxShadow: '0 0 2px 1px #d7d7d7' }}
        width={{ sm: '50%', xs: '100%' }}
        padding="10px 0"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexDirection="column"
      >
        {user && <PersonalInformation user={user} updateUser={updateUser} />}
      </Grid>
    </>
  );
};
