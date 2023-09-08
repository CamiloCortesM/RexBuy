import { GetServerSideProps, NextPage } from 'next';

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from '@mui/material';
import {
  AirplaneTicketOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import { CartList, OrderSummary } from '@/components/cart';
import { AdminLayout } from '@/components/layouts';
import { AddressInfo } from '@/components/orders';

type Props = {
  order: IOrder;
}

const AdminOrderPage: NextPage<Props> = ({ order }) => {
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

  return (
    <AdminLayout
      title="Resumen de la orden"
      subTitle={`OrdenId: ${order._id}`}
      icon={<AirplaneTicketOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
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

              <AddressInfo shippingAddress={shippingAddress} />
              <Divider sx={{ my: 1 }} />

              <OrderSummary orderSummary={orderSummary} />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Box flexDirection="column" sx={{ display: 'flex', flex: 1 }}>
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
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/admin/orders`,
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

export default AdminOrderPage;
