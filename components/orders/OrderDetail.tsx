import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import { CreditScoreOutlined } from '@mui/icons-material';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { rexbuyApi } from '@/api';
import { OrderSummary } from '../cart';
import { ShippingAddress } from '@/interfaces';
import { AddressInfo } from './AddressInfo';

export type OrderResponseBody = {
  id: string;
  status:
    | 'COMPLETED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'PAYER_ACTION_REQUIRED'
    | 'CREATED';
};

type Props = {
  setIsCompleted: (arg0: boolean) => void;
  _id            : string | undefined;
  shippingAddress: ShippingAddress;
  isPaid         : boolean;
  orderSummary: {
    numberOfItems: number;
    subTotal     : number;
    tax          : number;
    total        : number;
  };
};

export const OrderDetail: FC<Props> = ({
  _id,
  orderSummary,
  shippingAddress,
  isPaid,
  setIsCompleted,
}) => {

  const { total,numberOfItems} = orderSummary;
  const [isPaying, setIsPaying] = useState(false);

  const router = useRouter();
  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      setIsCompleted(true);
      return;
    }

    setIsPaying(true);

    try {
      await rexbuyApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: _id,
      });

      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
    }
  };

  return (
    <Card className="summary-card">
      <CardContent>
        <Typography variant="h2">
          Resumen ({numberOfItems}{' '}
          {numberOfItems > 1 ? 'Productos' : 'Producto'})
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Dirección de entrega</Typography>
        </Box>

        <AddressInfo shippingAddress={shippingAddress} />

        <Divider sx={{ my: 1 }} />

        <OrderSummary orderSummary={orderSummary} />

        <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
          <Box
            display="flex"
            justifyContent="center"
            className="fadeIn"
            sx={{ display: isPaying ? 'flex' : 'none' }}
          >
            <CircularProgress />
          </Box>

          <Box
            flexDirection="column"
            sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}
          >
            {isPaid ? (
              <Chip
                sx={{ my: 2 }}
                label="Orden ya fue pagada"
                variant="outlined"
                color="success"
                icon={<CreditScoreOutlined />}
              />
            ) : (
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: `${total}`,
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order!.capture().then(onOrderCompleted);
                }}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
