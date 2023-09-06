import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { OrderSummary } from '../cart';
import { FC, useContext, useState } from 'react';
import { CartContext } from '@/context';
import { useRouter } from 'next/router';

type Props = {
  setShowError: (arg0: boolean) => void;
  setErrorMessage: (arg0: string) => void;
};

export const SummaryInfo: FC<Props> = ({ setErrorMessage, setShowError }) => {
  const router = useRouter();
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext);

  const [isPosting, setIsPosting] = useState(false);

  if (!shippingAddress) {
    return <></>;
  }

  const {
    firstName,
    lastName,
    address,
    address2 = '',
    city,
    zip,
    country,
    phone,
  } = shippingAddress;

  const onCreateOrder = async () => {
    setIsPosting(true);

    const { hasError, message } = await createOrder();
    setShowError(hasError);

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

  return (
    <Grid item xs={12} sm={5}>
      <Card className="summary-card">
        <CardContent>
          <Typography variant="h2">
            Resumen ({numberOfItems}{' '}
            {numberOfItems === 1 ? 'producto' : 'productos'})
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Dirección de entrega</Typography>
            <NextLink href="/checkout/address" passHref legacyBehavior>
              <Link underline="always">Editar</Link>
            </NextLink>
          </Box>

          <Typography>
            {firstName} {lastName}
          </Typography>
          <Typography>
            {address}
            {address2 ? `,${address2}` : ''}
          </Typography>
          <Typography>
            {city}, {zip}
          </Typography>
          <Typography>{country}</Typography>
          <Typography>{phone}</Typography>

          <Divider sx={{ my: 1 }} />

          <Box display="flex" justifyContent="end">
            <NextLink href="/cart" passHref legacyBehavior>
              <Link underline="always">Editar</Link>
            </NextLink>
          </Box>

          <OrderSummary />

          <Box sx={{ mt: 3 }}>
            <Button
              color="secondary"
              className="circular-btn"
              fullWidth
              onClick={onCreateOrder}
              disabled={isPosting}
            >
              Confirmar Orden
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
