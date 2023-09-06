import { Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  shippingAddress: {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string | undefined;
    city     : string;
    zip      : string;
    country  : string;
    phone    : string;
  };
};
export const AddressInfo:FC<Props> = ({ shippingAddress }) => {
  return (
    <>
      <Typography>
        {shippingAddress.firstName} {shippingAddress.lastName}
      </Typography>
      <Typography>
        {shippingAddress.address}{' '}
        {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}
      </Typography>
      <Typography>
        {shippingAddress.city}, {shippingAddress.zip}
      </Typography>
      <Typography>{shippingAddress.country}</Typography>
      <Typography>{shippingAddress.phone}</Typography>
    </>
  );
};
