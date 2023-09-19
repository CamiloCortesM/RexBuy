import { FC } from 'react';
import { Grid } from '@mui/material';
import { IProduct } from '../../interfaces';
import { ProductCard } from '.';

type Props = {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container sx={{
      backgroundColor:'#fafafa',
      border:'solid 1px #e9eaec',
      padding:{xs:0,sm:2,md:4}
    }}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};
