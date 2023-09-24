import { FC } from 'react';
import Image from 'next/image';
import { Favorite } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { date } from '@/utils';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  createdAt: string;
  image: string;
  price: number;
  id: string;
  slug: string;
  deleteFavoriteProduct: (arg0: string) => void;
};
export const CardFavorite: FC<Props> = ({
  title,
  createdAt,
  image,
  price,
  id,
  deleteFavoriteProduct,
  slug,
}) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/product/${slug}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          width: '100%',
          padding: 2.5,
          position: 'relative',
          backgroundColor: '#fbfcfe',
        }}
      >
        <Box
          mb={1}
          sx={{
            width: '100%',
          }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            sx={{
              width: '100%',
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '95%',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '95%',
                whiteSpace: 'nowrap',
              }}
            >
              {date.formatDate(createdAt)}
            </Typography>
          </Box>
          <IconButton onClick={() => deleteFavoriteProduct(id)}>
            <Favorite color="error" />
          </IconButton>
        </Box>
        <CardActionArea onClick={handleRedirect}>
          <Image
            width={300}
            height={200}
            src={
              image.startsWith('http')
                ? image
                : `http://localhost:3000/products/${image}`
            }
            alt={title}
            style={{
              borderRadius: '10px',
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </CardActionArea>
        <Box
          mt={1}
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography variant="caption">Precio minimo</Typography>
            <Typography>${price}</Typography>
          </div>
          <Button
            variant="outlined"
            color="primary"
            sx={{ fontWeight: 600 }}
            onClick={handleRedirect}
          >
            Explorar
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};
