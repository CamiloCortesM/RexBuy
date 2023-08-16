import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { PayPalButtons } from '@paypal/react-paypal-js';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import { rexbuyApi } from '@/api';

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

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const router = useRouter();

  const {
    _id,
    shippingAddress,
    orderItems,
    numberOfItems,
    subTotal,
    tax,
    total,
    isPaid,
  } = order;

  const orderSummary = { numberOfItems, subTotal, tax, total };

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      setIsCompleted(true);
      return;
    }

    setIsPaying(true);

    try {
      const { data } = await rexbuyApi.post(`/orders/pay`, {
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
    <ShopLayout
      title="Resumen de la orden"
      pageDescription={'Resumen de la orden'}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <Typography variant="h1" component="h1">
            Orden: {_id}
          </Typography>

          {isPaid ? (
            <Chip
              sx={{ my: 2 }}
              label="Orden ya fue pagada"
              variant="outlined"
              color="success"
              icon={<CreditScoreOutlined />}
            />
          ) : (
            <Chip
              sx={{ my: 2 }}
              label="Orden Pendiente"
              variant="outlined"
              color="error"
              icon={<CreditCardOffOutlined />}
            />
          )}

          <CartList products={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}{' '}
                {numberOfItems > 1 ? 'Productos' : 'Producto'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}{' '}
                {shippingAddress.address2
                  ? `, ${shippingAddress.address2}`
                  : ''}
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

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

                <Box flexDirection="column" sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}>
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
        </Grid>
      </Grid>

      <Snackbar
        open={isCompleted}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" sx={{ width: '100%' }} variant="filled">
          No hay Pago en Paypal
        </Alert>
      </Snackbar>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
