import { useContext } from 'react';
import NextLink from 'next/link';

import { Badge, IconButton, Link } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';

import { CartContext } from '@/context';

export const CartButton = () => {
  const { numberOfItems } = useContext(CartContext);

  return (
    <NextLink href="/cart" passHref legacyBehavior>
      <Link>
        <IconButton>
          <Badge
            badgeContent={numberOfItems > 99 ? '+99' : numberOfItems}
            color="secondary"
          >
            <ShoppingCartOutlined />
          </Badge>
        </IconButton>
      </Link>
    </NextLink>
  );
};
