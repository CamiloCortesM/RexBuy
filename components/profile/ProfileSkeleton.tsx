import { Avatar, Box, Grid, Skeleton, Stack, Typography } from '@mui/material';

export const ProfileSkeleton = () => {
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
          <Skeleton variant="text" sx={{ fontSize: '1.3rem' }} />
          <Skeleton
            variant="text"
            sx={{ fontSize: { md: '1rem', xs: '.8rem' } }}
            width={200}
          />
        </Grid>
        <Skeleton variant="circular" width={62} height={62} />
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
        <Box
          display="flex"
          width={{ sm: '70%', xs: '80%' }}
          justifyContent={{ md: 'space-around', xs: 'space-between' }}
          alignItems="center"
        >
          <Stack
            direction="row"
            height="65px"
            width={{ xs: '90px', md: '65px' }}
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: '50%',
              backgroundColor: '#fff',
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              src="/profile/personal-information.svg"
              alt="icon-personal-information"
              sx={{
                sm: { width: 50, height: 50 },
                xs: { width: 40, height: 40 },
              }}
            />
          </Stack>

          <Box flexDirection="column">
            <Typography
              variant="body1"
              margin="0 20px "
              fontSize={{ md: '1.2rem', xs: '.9rem' }}
              fontWeight="600"
            >
              Información Personal
            </Typography>
            <Typography
              variant="body1"
              margin="0 20px"
              fontSize={{ md: '1rem', xs: '.7rem' }}
              color="#000"
              sx={{ opacity: '.5' }}
            >
              Datos que representan a la cuenta en RexBuy
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          width="70%"
          flexDirection="column"
          justifyContent="center"
          alignItems="space-between"
          margin="20px 0 10px"
        >
          <Typography
            variant="body1"
            margin="0 10px"
            fontSize={{ md: '1.1rem', xs: '.9rem' }}
            fontWeight="600"
          >
            Ubicación
          </Typography>
          <Skeleton
            variant="text"
            sx={{ fontSize: { md: '1.3rem', xs: '.7rem' } }}
            width={300}
          />
        </Box>

        <Box
          display="flex"
          width="70%"
          flexDirection="column"
          justifyContent="center"
          alignItems="space-between"
          margin="10px 0"
        >
          <Typography
            variant="body1"
            margin="0 10px"
            fontSize={{ md: '1.1rem', xs: '.9rem' }}
            fontWeight="600"
          >
            Dirección
          </Typography>
          <Skeleton
            variant="text"
            sx={{ fontSize: { md: '1.3rem', xs: '.7rem' } }}
            width={300}
          />
        </Box>

        <Box
          display="flex"
          width="70%"
          flexDirection="column"
          justifyContent="center"
          alignItems="space-between"
          margin="10px 0"
        >
          <Typography
            variant="body1"
            margin="0 10px"
            fontSize={{ md: '1.1rem', xs: '.9rem' }}
            fontWeight="600"
          >
            Teléfono
          </Typography>
          <Skeleton
            variant="text"
            sx={{ fontSize: { md: '1.3rem', xs: '.7rem' } }}
            width={200}
          />
        </Box>
      </Grid>
    </>
  );
};
