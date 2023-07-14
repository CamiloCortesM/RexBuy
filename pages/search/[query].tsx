import { NextPage, GetServerSideProps } from 'next';

import { Box, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}
const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={'RexBuy - Search'}
      pageDescription={'Encuentra los mejores productos de tecnologia aquí'}
    >
      <Typography variant="h1" component="h1" color="primary">
        Buscar Producto
      </Typography>

      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }}>
          Termino:{query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            No encontramos ningun producto
          </Typography>
          <Typography variant="h2" color="secondary" sx={{ ml: 1 }}>
            {query}
          </Typography>
        </Box>
      )}

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

  const foundProducts = products.length > 0;

  if (!foundProducts) {
    // products = await dbProducts.getAllProducts();
    products = await dbProducts.getPorductsByTerm('laptop');
  }
  //TODO: return another products if there isn't products

  return {
    props: { products, foundProducts, query },
  };
};

export default SearchPage;
