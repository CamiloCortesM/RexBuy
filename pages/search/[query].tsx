import { NextPage, GetServerSideProps } from 'next';

import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

interface Props {
  products: IProduct[];
}
const SearchPage: NextPage<Props> = ({ products }) => {
  return (
    <ShopLayout
      title={'RexBuy - Search'}
      pageDescription={'Encuentra los mejores productos de tecnologia aquí'}
    >
      <Typography variant="h1" component="h1" color="primary">
        Buscar Producto
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        ABC --- 123
      </Typography>
      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  console.log(query);

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  let products = await dbProducts.getPorductsByTerm(query);
  console.log(products);

  //TODO: return another products if there isn't products

  return {
    props: { products },
  };
};

export default SearchPage;
